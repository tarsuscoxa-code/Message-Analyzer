
import React, { useState } from 'react';
import type { SummarizedNotification } from '../types';
import { Category } from '../types';
import NotificationItem from './NotificationItem';
import { ChevronDownIcon } from './icons/Icons';

interface CategorySectionProps {
  category: Category;
  summaries: SummarizedNotification[];
  onSelectSummary: (summary: SummarizedNotification) => void;
}

const categoryColors: Record<Category, string> = {
  [Category.Urgent]: 'border-red-500/50 dark:border-red-400/50',
  [Category.MostImportant]: 'border-blue-500/50 dark:border-blue-400/50',
  [Category.MostRelevant]: 'border-green-500/50 dark:border-green-400/50',
  [Category.LeastRelevant]: 'border-gray-400/50 dark:border-gray-600/50',
};

const CategorySection: React.FC<CategorySectionProps> = ({ category, summaries, onSelectSummary }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (summaries.length === 0) {
    return null;
  }

  return (
    <div className={`bg-card rounded-xl border ${categoryColors[category]} overflow-hidden`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center">
          <h3 className="font-semibold text-lg tracking-tight">{category}</h3>
          <span className="ml-3 text-sm font-medium bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5">
            {summaries.length}
          </span>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="divide-y divide-border">
          {summaries.map((summary) => (
            <NotificationItem
              key={summary.id}
              summary={summary}
              onSelect={onSelectSummary}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
