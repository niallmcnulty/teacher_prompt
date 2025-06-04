'use client';

import React, { useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import InputPanel from '../components/InputPanel';
import PromptPreview from '../components/PromptPreview';
import ErrorBoundary from '../components/ErrorBoundary';
import { generatePrompt } from '../lib/utils/prompt-generator';

// Dynamically import heavy components
const DynamicQualityScore = dynamic(() => import('../components/QualityScore'), {
  loading: () => <div className="animate-pulse h-32 bg-gray-100 rounded-lg" />,
  ssr: false,
});

// Loading fallback component
const LoadingFallback = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-gray-100 rounded w-3/4" />
    <div className="h-32 bg-gray-100 rounded" />
  </div>
);

export default function Home() {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleGeneratePrompt = useCallback(async (formData: any) => {
    try {
      setIsLoading(true);
      setError(undefined);

      // Call the quality-score API endpoint (now just generates prompt)
      const response = await fetch('/api/quality-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate prompt');
      }

      const data = await response.json();
      setPrompt(data.prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex-1">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            EMS Prompt Generator
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600">
            Generate high-quality prompts for Economic and Management Sciences (EMS) lessons
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <ErrorBoundary>
              <Suspense fallback={<div className="animate-pulse space-y-4"><div className="h-8 bg-gray-100 rounded w-3/4" /><div className="h-32 bg-gray-100 rounded" /></div>}>
                <InputPanel onGenerate={handleGeneratePrompt} />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            <ErrorBoundary>
              <Suspense fallback={<div className="animate-pulse space-y-4"><div className="h-8 bg-gray-100 rounded w-3/4" /><div className="h-32 bg-gray-100 rounded" /></div>}>
                <PromptPreview prompt={prompt} isLoading={isLoading} error={error} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  );
}
