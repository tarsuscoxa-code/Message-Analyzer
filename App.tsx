
import React, { useState, useEffect, useCallback } from 'react';
import type { Notification, SummarizedNotification } from './types';
import { AppView, Category, CategoryOrder } from './types';
import { MOCK_NOTIFICATIONS } from './constants';
import { summarizeAndCategorize } from './services/geminiService';
import PermissionModal from './components/PermissionModal';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import DetailsView from './components/DetailsView';
import SettingsView from './components/SettingsView';
import { LoadingSpinnerIcon, SettingsIcon, XIcon } from './components/icons/Icons';

export default function App() {
  const [view, setView] = useState<AppView>(AppView.Permissions);
  const [summaries, setSummaries] = useState<Record<Category, SummarizedNotification[]>>({
    [Category.Urgent]: [],
    [Category.MostImportant]: [],
    [Category.MostRelevant]: [],
    [Category.LeastRelevant]: [],
  });
  const [selectedSummary, setSelectedSummary] = useState<SummarizedNotification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const processNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, you'd get new notifications from a listener service.
      // Here we just use the mock data.
      const newSummaries = await summarizeAndCategorize(MOCK_NOTIFICATIONS);
      
      const categorized: Record<Category, SummarizedNotification[]> = {
        [Category.Urgent]: [],
        [Category.MostImportant]: [],
        [Category.MostRelevant]: [],
        [Category.LeastRelevant]: [],
      };

      newSummaries.forEach(summary => {
        if (categorized[summary.category]) {
          categorized[summary.category].push(summary);
        }
      });
      setSummaries(categorized);
    } catch (e) {
      setError('Failed to summarize notifications. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (view === AppView.Main) {
      processNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const handleGrantPermission = () => setView(AppView.Login);
  const handleLogin = () => setView(AppView.Main);
  const handleSelectSummary = (summary: SummarizedNotification) => {
    setSelectedSummary(summary);
    setView(AppView.Details);
  };
  const handleBack = () => {
    setSelectedSummary(null);
    setView(AppView.Main);
  };
  
  const renderView = () => {
    switch (view) {
      case AppView.Permissions:
        return <PermissionModal onGrant={handleGrantPermission} />;
      case AppView.Login:
        return <LoginScreen onLogin={handleLogin} />;
      case AppView.Main:
        return <MainScreen summaries={summaries} onSelectSummary={handleSelectSummary} />;
      case AppView.Details:
        return selectedSummary ? <DetailsView summary={selectedSummary} onBack={handleBack} /> : null;
      default:
        return <MainScreen summaries={summaries} onSelectSummary={handleSelectSummary} />;
    }
  };

  const clearData = () => {
    setSummaries({
      [Category.Urgent]: [],
      [Category.MostImportant]: [],
      [Category.MostRelevant]: [],
      [Category.LeastRelevant]: [],
    });
    // In a real app, you might clear more persistent storage.
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <div className="relative mx-auto max-w-md h-screen flex flex-col border-x border-border overflow-hidden">
        {isSettingsOpen && (
          <SettingsView
            theme={theme}
            setTheme={setTheme}
            onClose={() => setIsSettingsOpen(false)}
            onClearData={clearData}
          />
        )}
        
        {view > AppView.Login && !isSettingsOpen && (
          <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
            <h1 className="text-xl font-semibold tracking-tighter">SmartSummaries</h1>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full hover:bg-secondary active:scale-95 transition-transform"
            >
              <SettingsIcon className="w-5 h-5" />
            </button>
          </header>
        )}

        <main className="flex-grow overflow-y-auto">
          {error && (
            <div className="m-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg text-sm flex items-center">
              <span className="flex-grow">{error}</span>
              <button onClick={() => setError(null)}><XIcon className="w-4 h-4" /></button>
            </div>
          )}
          {renderView()}
        </main>

        {view === AppView.Main && (
          <div className="absolute bottom-6 right-6">
            <button
              onClick={processNotifications}
              disabled={isLoading}
              className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center disabled:bg-muted disabled:cursor-not-allowed transform active:scale-90 transition-transform"
            >
              {isLoading ? <LoadingSpinnerIcon /> : 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l5 5M20 20l-5-5" />
                </svg>
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
