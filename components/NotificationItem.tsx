
import React from 'react';
import type { SummarizedNotification } from '../types';

interface NotificationItemProps {
  summary: SummarizedNotification;
  onSelect: (summary: SummarizedNotification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ summary, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(summary)}
      className="w-full text-left p-4 hover:bg-secondary transition-colors duration-150"
    >
      <p className="font-semibold text-sm mb-1">{summary.sender}</p>
      <p className="text-foreground text-base leading-snug">{summary.summary}</p>
    </button>
  );
};

export default NotificationItem;
