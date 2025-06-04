'use client';

import React, { useRef, useEffect } from 'react';
import { usePromptStore } from '../lib/store/prompt-store';
import { Topic, LearningObjectType, ScaffoldingLevel, BloomsLevel } from '../lib/types';
import Dropdown, { DropdownOption } from './ui/Dropdown';

interface FormData {
  grade: number;
  topic: Topic;
  learningObjectType: LearningObjectType;
  scaffoldingLevel: ScaffoldingLevel;
  bloomsLevel: BloomsLevel;
  includeSouthAfricanContext: boolean;
}

interface InputPanelProps {
  onGenerate: (formData: FormData) => Promise<void>;
}

export default function InputPanel({ onGenerate }: InputPanelProps) {
  const { formState, setFormState, validateForm } = usePromptStore();
  const formRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation between form controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = formRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGradeChange = (value: string | number) => {
    setFormState({ grade: Number(value) });
    validateForm();
  };

  const handleTopicChange = (value: string | number) => {
    setFormState({ topic: value as Topic });
    validateForm();
  };

  const handleLearningObjectTypeChange = (value: string | number) => {
    setFormState({ learningObjectType: value as LearningObjectType });
    validateForm();
  };

  const handleScaffoldingLevelChange = (value: string | number) => {
    setFormState({ scaffoldingLevel: value as ScaffoldingLevel });
    validateForm();
  };

  const handleBloomsLevelChange = (value: string | number) => {
    setFormState({ bloomsLevel: value as BloomsLevel });
    validateForm();
  };

  const handleSouthAfricanContextChange = (include: boolean) => {
    setFormState({ includeSouthAfricanContext: include });
  };

  // Get topics based on selected grade
  const getTopicsForGrade = (grade: number): Topic[] => {
    switch (grade) {
      case 7:
        return ['The Economy', 'Needs and Wants', 'Circular Flow', 'Markets'];
      case 8:
        return ['Production', 'Forms of Ownership', 'Labour', 'Markets'];
      case 9:
        return ['Economic Systems', 'Business Planning', 'Financial Literacy', 'Entrepreneurship'];
      default:
        return [];
    }
  };

  // Format options for dropdowns
  const gradeOptions: DropdownOption[] = [7, 8, 9].map(grade => ({
    id: grade,
    label: `Grade ${grade}`,
    value: grade
  }));

  const topicOptions: DropdownOption[] = getTopicsForGrade(formState.grade).map(topic => ({
    id: topic,
    label: topic,
    value: topic
  }));

  const learningObjectTypeOptions: DropdownOption[] = [
    'Lesson Plan',
    'Quiz',
    'Worksheet',
    'Project',
    'Assessment'
  ].map(type => ({
    id: type,
    label: type,
    value: type
  }));

  const scaffoldingLevelOptions: DropdownOption[] = [
    'High Support',
    'Moderate Guidance',
    'Independent Application'
  ].map(level => ({
    id: level,
    label: level,
    value: level
  }));

  const bloomsLevelOptions: DropdownOption[] = [
    'Remember',
    'Understand',
    'Apply',
    'Analyze',
    'Evaluate',
    'Create'
  ].map(level => ({
    id: level,
    label: level,
    value: level
  }));

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await onGenerate(formState);
      } catch (error) {
        console.error('Error generating prompt:', error);
      }
    }
  };

  return (
    <div 
      ref={formRef} 
      className="bg-white rounded-lg shadow-lg p-6 sm:p-8" 
      role="form" 
      aria-label="EMS Learning Material Generator"
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Generate EMS Learning Material</h2>
      
      <div className="space-y-6 sm:space-y-8">
        {/* Grade Selection */}
        <div>
          <Dropdown
            label="Grade"
            options={gradeOptions}
            value={formState.grade}
            onChange={handleGradeChange}
            className="w-full"
            error={formState.errors.grade}
            required
          />
        </div>

        {/* Topic Selection */}
        <div>
          <Dropdown
            label="Topic"
            options={topicOptions}
            value={formState.topic}
            onChange={handleTopicChange}
            className="w-full"
            error={formState.errors.topic}
            required
          />
        </div>

        {/* Learning Object Type */}
        <div>
          <Dropdown
            label="Learning Object Type"
            options={learningObjectTypeOptions}
            value={formState.learningObjectType}
            onChange={handleLearningObjectTypeChange}
            className="w-full"
            error={formState.errors.learningObjectType}
            required
          />
        </div>

        {/* Scaffolding Level */}
        <div>
          <Dropdown
            label="Scaffolding Level"
            options={scaffoldingLevelOptions}
            value={formState.scaffoldingLevel}
            onChange={handleScaffoldingLevelChange}
            className="w-full"
            error={formState.errors.scaffoldingLevel}
            required
          />
        </div>

        {/* Bloom's Taxonomy Level */}
        <div>
          <Dropdown
            label="Bloom's Taxonomy Level"
            options={bloomsLevelOptions}
            value={formState.bloomsLevel}
            onChange={handleBloomsLevelChange}
            className="w-full"
            error={formState.errors.bloomsLevel}
            required
          />
        </div>

        {/* South African Context Toggle */}
        <div className="flex items-center pt-2">
          <input
            type="checkbox"
            id="saContext"
            checked={formState.includeSouthAfricanContext}
            onChange={(e) => handleSouthAfricanContextChange(e.target.checked)}
            className="h-4 w-4 text-sa-green focus:ring-sa-green border-gray-300 rounded"
            aria-label="Include South African Context"
          />
          <label htmlFor="saContext" className="ml-3 block text-sm text-gray-700">
            Include South African Context
          </label>
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-sa-green-500 text-white font-medium px-6 py-3 rounded-md hover:bg-sa-green-600 focus:outline-none focus:ring-2 focus:ring-sa-green-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
        >
          Generate Prompt
        </button>
      </div>
    </div>
  );
} 