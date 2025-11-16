
import React from 'react';
import type { SummarizedNotification } from '../types';
import { Category, CategoryOrder } from '../types';
import CategorySection from './CategorySection';

interface MainScreenProps {
  summaries: Record<Category, SummarizedNotification[]>;
  onSelectSummary: (summary: SummarizedNotification) => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ summaries, onSelectSummary }) => {
  return (
    <div className="p-2 md:p-4 space-y-2">
      {CategoryOrder.map((category) => (
        <CategorySection
          key={category}
          category={category}
          summaries={summaries[category]}
          onSelectSummary={onSelectSummary}
        />
      ))}
    </div>
  );
};

export default MainScreen;
