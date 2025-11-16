
export enum Category {
  Urgent = 'Urgent',
  MostImportant = 'Most Important',
  MostRelevant = 'Most Relevant',
  LeastRelevant = 'Least Relevant',
}

export const CategoryOrder: Category[] = [
  Category.Urgent,
  Category.MostImportant,
  Category.MostRelevant,
  Category.LeastRelevant,
];

export interface Notification {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}

export interface SummarizedNotification {
  id: string;
  sender: string;
  originalText: string;
  summary: string;
  category: Category;
}

export enum AppView {
  Permissions,
  Login,
  Main,
  Details,
  Settings,
}
