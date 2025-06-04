// API Constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Learning Object Types
export const LEARNING_OBJECT_TYPES = [
  'Lesson Plan',
  'Quiz',
  'Worksheet',
  'Activity',
  'Assessment',
] as const;

// Scaffolding Levels
export const SCAFFOLDING_LEVELS = [
  'High Support',
  'Moderate Guidance',
  'Independent Application',
] as const;

// Bloom's Taxonomy Levels
export const BLOOM_LEVELS = [
  'Remember',
  'Understand',
  'Apply',
  'Analyze',
  'Evaluate',
  'Create',
] as const;

// Quality Score Weights
export const QUALITY_SCORE_WEIGHTS = {
  capsAlignment: 2,
  bloomLevel: 1,
  scaffolding: 1,
  saContext: 1,
} as const;

// Maximum Quality Score
export const MAX_QUALITY_SCORE = Object.values(QUALITY_SCORE_WEIGHTS).reduce((a, b) => a + b, 0);

