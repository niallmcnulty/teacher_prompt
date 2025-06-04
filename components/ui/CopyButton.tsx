import React, { useState } from 'react';
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

interface CopyButtonProps {
  text: string;
  className?: string;
  onCopy?: () => void;
  onError?: (error: Error) => void;
}

export default function CopyButton({ text, className = '', onCopy, onError }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy text');
      if (onError && err instanceof Error) onError(err);
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
        ${copied
          ? 'bg-success-100 text-success-700 hover:bg-success-200 focus:ring-2 focus:ring-success-500 focus:ring-offset-2'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
        }
        ${error ? 'bg-error-100 text-error-700 hover:bg-error-200 focus:ring-error-500' : ''}
        ${className}
      `}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <>
          <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2 transition-transform duration-200 ease-in-out group-hover:scale-110" />
          <span className="transition-opacity duration-200 ease-in-out">Copied!</span>
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="h-5 w-5 mr-2 transition-transform duration-200 ease-in-out group-hover:scale-110" />
          <span className="transition-opacity duration-200 ease-in-out">Copy</span>
        </>
      )}
      {error && (
        <span className="ml-2 text-sm transition-all duration-200 ease-in-out">
          {error}
        </span>
      )}
    </button>
  );
} 