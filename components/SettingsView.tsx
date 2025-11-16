
import React from 'react';
import { XIcon } from './icons/Icons';

interface SettingsViewProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onClose: () => void;
  onClearData: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ theme, setTheme, onClose, onClearData }) => {
  return (
    <div className="absolute inset-0 bg-background z-50 flex flex-col">
      <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        <h2 className="text-xl font-semibold tracking-tighter">Settings</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-secondary active:scale-95 transition-transform"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </header>
      <div className="flex-grow p-4 space-y-6">
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="font-semibold mb-3">Permissions</h3>
          <div className="flex items-center justify-between">
            <p>Notification Access</p>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" checked readOnly/>
              <div className="relative w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="font-semibold mb-3">Account</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Logged in as user@example.com</p>
            <button className="text-sm font-medium text-red-500 hover:underline">Log Out</button>
          </div>
        </div>

        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="font-semibold mb-3">Theme</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setTheme('light')}
              className={`flex-1 p-2 rounded-md border ${theme === 'light' ? 'border-primary' : 'border-transparent'}`}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`flex-1 p-2 rounded-md border ${theme === 'dark' ? 'border-primary' : 'border-transparent'}`}
            >
              Dark
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-card rounded-lg border border-border">
          <h3 className="font-semibold mb-3">Data</h3>
          <button 
            onClick={onClearData}
            className="w-full bg-red-500/10 text-red-600 dark:text-red-400 font-semibold py-2 px-4 rounded-lg hover:bg-red-500/20 active:scale-95 transition"
          >
            Clear Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
