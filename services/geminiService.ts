
import { GoogleGenAI, Type } from "@google/genai";
import type { Notification, SummarizedNotification } from '../types';
import { Category } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, this should be handled more gracefully.
  // For this context, we assume the API_KEY is provided.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.STRING,
        description: 'The original ID of the notification.',
      },
      summary: {
        type: Type.STRING,
        description: 'A very short, concise summary of the notification content (max 10 words).',
      },
      category: {
        type: Type.STRING,
        enum: Object.values(Category),
        description: 'The classification of the notification.',
      },
    },
    required: ['id', 'summary', 'category'],
  },
};

export const summarizeAndCategorize = async (notifications: Notification[]): Promise<SummarizedNotification[]> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  
  const notificationsText = notifications.map(n => `ID: ${n.id}\nSender: ${n.sender}\nContent: ${n.text}`).join('\n---\n');

  const prompt = `Analyze the following notifications and return a JSON array with a summary and category for each.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
          { parts: [{ text: prompt }] },
          { parts: [{ text: notificationsText }] }
      ],
      config: {
        systemInstruction: `You are an intelligent notification assistant. Your goal is to summarize and categorize notifications to help users focus.
        
        Categories:
        - ${Category.Urgent}: Time-sensitive alerts, financial transactions, health warnings, emergencies, critical reminders.
        - ${Category.MostImportant}: Direct messages from important contacts (e.g., family, boss), work-related deadlines, major service updates.
        - ${Category.MostRelevant}: Ongoing conversations, social media updates from close friends, helpful information like package deliveries.
        - ${Category.LeastRelevant}: Promotions, marketing, general news, spam-like alerts, low-priority content.

        For each notification, provide its original ID, a concise summary (max 10 words), and one of the specified categories.`,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text;
    const parsedResponse = JSON.parse(jsonText);

    if (!Array.isArray(parsedResponse)) {
      throw new Error("Invalid response format from Gemini API.");
    }
    
    return parsedResponse.map((item: any) => {
      const originalNotification = notifications.find(n => n.id === item.id);
      if (!originalNotification) return null;
      
      return {
        id: item.id,
        sender: originalNotification.sender,
        originalText: originalNotification.text,
        summary: item.summary,
        category: item.category as Category,
      };
    }).filter((item): item is SummarizedNotification => item !== null);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to process notifications with Gemini API.");
  }
};
