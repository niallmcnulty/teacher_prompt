'use client';

import React from 'react';
import CopyButton from './ui/CopyButton';

interface PromptPreviewProps {
  prompt: string;
  isLoading?: boolean;
  error?: string;
  onCopy?: () => void;
  onCopyError?: (error: Error) => void;
}

export default function PromptPreview({ prompt, isLoading = false, error, onCopy, onCopyError }: PromptPreviewProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 animate-pulse">
        <div className="h-8 bg-gray-100 rounded w-3/4 mb-6" />
        <div className="h-48 sm:h-64 md:h-80 bg-gray-100 rounded" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-6 sm:p-8">
        <p className="text-error-700 font-medium">{error}</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold">Generated Prompt</h2>
        <CopyButton
          text={prompt}
          onCopy={onCopy}
          onError={onCopyError}
          className="w-full sm:w-auto"
        />
      </div>
      <div className="relative">
        <textarea
          readOnly
          value={prompt}
          className="w-full h-48 sm:h-64 md:h-80 p-4 sm:p-6 border rounded-lg bg-gray-50 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sa-green focus:border-transparent"
          placeholder="Your generated prompt will appear here..."
        />
      </div>
    </div>
  );
} 