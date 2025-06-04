// Form Data Types
export interface FormData {
  grade: string;
  topic: string;
  learningObjectType: string;
  scaffoldingLevel: string;
  bloomLevel: string;
}

// Curriculum Types
export interface Topic {
  id: string;
  name: string;
  objectives: string[];
  concepts: string[];
  duration: number;
}

export interface Grade {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Curriculum {
  grades: Grade[];
}

// Learning Object Types
export type LearningObjectType = 'Lesson Plan' | 'Quiz' | 'Worksheet' | 'Activity' | 'Assessment';
export type ScaffoldingLevel = 'High Support' | 'Moderate Guidance' | 'Independent Application';
export type BloomLevel = 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate' | 'Create';

// Quality Score Types
export interface QualityScore {
  total: number;
  capsAlignment: number;
  bloomLevel: number;
  scaffolding: number;
  saContext: number;
  feedback: string;
}
