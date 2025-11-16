
import React from 'react';
import type { SummarizedNotification } from '../types';
import { ArrowLeftIcon } from './icons/Icons';

interface DetailsViewProps {
  summary: SummarizedNotification;
  onBack: () => void;
}

const DetailsView: React.FC<DetailsViewProps> = ({ summary, onBack }) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex-shrink-0 mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Summaries
        </button>
      </div>

      <div className="flex-grow">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1">From</p>
          <p className="text-lg font-semibold">{summary.sender}</p>
        </div>

        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">AI Summary</p>
          <p className="text-xl leading-relaxed bg-secondary p-4 rounded-lg">{summary.summary}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Original Notification</p>
          <p className="text-base text-muted-foreground leading-relaxed border border-border p-4 rounded-lg">{summary.originalText}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
