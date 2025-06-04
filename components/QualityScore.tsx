import React from 'react';
import { QualityScore as QualityScoreType, getScoreColor, generateScoreSummary, meetsMinimumRequirements } from '../lib/utils/quality-scorer';
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon, LightBulbIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface QualityScoreProps {
  score: QualityScoreType & { isFallback?: boolean } | null;
  isLoading?: boolean;
  error?: string;
}

export default function QualityScore({ score, isLoading = false, error }: QualityScoreProps) {
  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow transition-all duration-300 ease-in-out">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-error-50 border border-error-200 rounded-lg transition-all duration-300 ease-in-out hover:shadow-md">
        <div className="flex items-center text-error-700">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 transition-transform duration-200 ease-in-out group-hover:scale-110" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!score) {
    return null;
  }

  const scoreColor = getScoreColor(score.totalScore);
  const scoreSummary = generateScoreSummary(score);
  const isCompliant = meetsMinimumRequirements(score);

  const getScoreColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-success-500 text-white hover:bg-success-600 focus:ring-2 focus:ring-success-500 focus:ring-offset-2';
      case 'yellow':
        return 'bg-warning-500 text-white hover:bg-warning-600 focus:ring-2 focus:ring-warning-500 focus:ring-offset-2';
      case 'red':
        return 'bg-error-500 text-white hover:bg-error-600 focus:ring-2 focus:ring-error-500 focus:ring-offset-2';
      default:
        return 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2';
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow transition-all duration-300 ease-in-out hover:shadow-lg">
      {/* Fallback Notice */}
      {score.isFallback && (
        <div className="mb-4 p-3 bg-warning-50 border border-warning-200 rounded-lg transition-all duration-300 ease-in-out hover:shadow-sm">
          <div className="flex items-start group">
            <ExclamationCircleIcon className="h-5 w-5 text-warning-600 mr-2 mt-0.5 transition-transform duration-200 ease-in-out group-hover:scale-110" />
            <p className="text-warning-800 text-sm">
              Note: This is an automated fallback score based on keyword detection. For more accurate scoring, please try again when the API is available.
            </p>
          </div>
        </div>
      )}

      {/* Total Score and CAPS Compliance */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 ease-in-out">Quality Score</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">CAPS Compliant:</span>
            {isCompliant ? (
              <CheckCircleIcon className="h-5 w-5 text-success-600 transition-transform duration-200 ease-in-out hover:scale-110" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-error-600 transition-transform duration-200 ease-in-out hover:scale-110" />
            )}
          </div>
        </div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full ${getScoreColorClasses(scoreColor)} transition-all duration-200 ease-in-out`}>
          <span className="mr-1.5">{scoreSummary}</span>
          {scoreColor === 'green' && <CheckCircleIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:scale-110" />}
          {scoreColor === 'yellow' && <ExclamationCircleIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:scale-110" />}
          {scoreColor === 'red' && <XCircleIcon className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:scale-110" />}
        </div>
      </div>

      {/* Individual Criteria Scores */}
      <div className="space-y-4">
        {score.criteriaScores && Object.entries(score.criteriaScores).map(([criterion, criterionScore]) => (
          <div key={criterion} className="border-b border-gray-200 pb-3 last:border-b-0 transition-all duration-200 ease-in-out hover:bg-gray-50 rounded-md px-2 -mx-2">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium text-gray-900 capitalize transition-colors duration-200 ease-in-out">
                {criterion.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {criterionScore.score}/{criterionScore.maxScore}
                </span>
                {criterion === 'capsAlignment' && (
                  criterionScore.score >= 1 ? (
                    <CheckCircleIcon className="h-5 w-5 text-success-600 transition-transform duration-200 ease-in-out hover:scale-110" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-error-600 transition-transform duration-200 ease-in-out hover:scale-110" />
                  )
                )}
              </div>
            </div>
            {criterionScore.feedback && (
              <p className="text-sm text-gray-700 transition-colors duration-200 ease-in-out">{criterionScore.feedback}</p>
            )}
          </div>
        ))}
      </div>

      {/* Feedback and Suggestions */}
      {((score.feedback && score.feedback.length > 0) || (score.suggestions && score.suggestions.length > 0)) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {score.feedback && score.feedback.length > 0 && (
            <div className="mb-4 transition-all duration-200 ease-in-out hover:bg-gray-50 rounded-md px-2 -mx-2">
              <div className="flex items-center mb-2 group">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-600 mr-2 transition-transform duration-200 ease-in-out group-hover:scale-110" />
                <h4 className="font-medium text-gray-900 transition-colors duration-200 ease-in-out">Feedback</h4>
              </div>
              <ul className="list-none text-sm text-gray-700 space-y-2">
                {score.feedback.map((item, index) => (
                  <li key={index} className="flex items-start transition-all duration-200 ease-in-out hover:translate-x-1">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {score.suggestions && score.suggestions.length > 0 && (
            <div className="transition-all duration-200 ease-in-out hover:bg-gray-50 rounded-md px-2 -mx-2">
              <div className="flex items-center mb-2 group">
                <LightBulbIcon className="h-5 w-5 text-warning-600 mr-2 transition-transform duration-200 ease-in-out group-hover:scale-110" />
                <h4 className="font-medium text-gray-900 transition-colors duration-200 ease-in-out">Suggestions for Improvement</h4>
              </div>
              <ul className="list-none text-sm text-gray-700 space-y-2">
                {score.suggestions.map((item, index) => (
                  <li key={index} className="flex items-start transition-all duration-200 ease-in-out hover:translate-x-1">
                    <span className="text-warning-600 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 