
import React from 'react';
import { BellIcon } from './icons/Icons';

interface PermissionModalProps {
  onGrant: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ onGrant }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-background">
      <div className="p-4 bg-secondary rounded-full mb-6">
        <BellIcon className="w-8 h-8 text-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-3">Welcome to SmartSummaries</h2>
      <p className="text-muted-foreground mb-8">
        SmartSummaries needs notification access to automatically read, analyze, and summarize your incoming messages in real time.
      </p>
      <button
        onClick={onGrant}
        className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 active:scale-95 transition"
      >
        Grant Access
      </button>
    </div>
  );
};

export default PermissionModal;
