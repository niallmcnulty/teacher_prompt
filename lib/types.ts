// Topic types for each grade
export type Grade7Topic = 'The Economy' | 'Needs and Wants' | 'Circular Flow' | 'Markets';
export type Grade8Topic = 'Production' | 'Forms of Ownership' | 'Labour' | 'Markets';
export type Grade9Topic = 'Economic Systems' | 'Business Planning' | 'Financial Literacy' | 'Entrepreneurship';

// Combined topic type
export type Topic = Grade7Topic | Grade8Topic | Grade9Topic;

// Learning object types
export type LearningObjectType = 'Lesson Plan' | 'Quiz' | 'Worksheet' | 'Project' | 'Assessment';

// Scaffolding levels
export type ScaffoldingLevel = 'High Support' | 'Moderate Guidance' | 'Independent Application';

// Bloom's taxonomy levels
export type BloomsLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';

// Prompt generation parameters
export interface PromptGenerationParams {
  grade: number;
  topic: Topic;
  learningObjectType: LearningObjectType;
  scaffoldingLevel: ScaffoldingLevel;
  bloomsLevel: BloomsLevel;
  includeSouthAfricanContext: boolean;
}

// Quality score types
export interface CriterionScore {
  score: number;
  maxScore: number;
  feedback: string;
}

export interface QualityScore {
  totalScore: number;
  maxScore: number;
  criteriaScores: {
    capsAlignment: CriterionScore;
    bloomsAlignment: CriterionScore;
    scaffolding: CriterionScore;
    saContext: CriterionScore;
  };
  feedback: string[];
  suggestions: string[];
} 