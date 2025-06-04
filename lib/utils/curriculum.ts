import curriculumData from "../data/caps-curriculum.json";

export interface Topic {
  name: string;
  learningObjective: string;
  concepts: string[];
  duration: string;
  description: string;
}

export interface Term {
  topics: Topic[];
}

export interface Grade {
  term1: Term;
}

export interface Curriculum {
  grade7: Grade;
  grade8: Grade;
  grade9: Grade;
}

export interface CurriculumData {
  metadata: {
    name: string;
    description: string;
    targetPhase: string;
    grades: number[];
    subject: string;
    country: string;
    version: string;
    lastUpdated: string;
  };
  curriculum: Curriculum;
}

/**
 * Loads the CAPS curriculum data
 * @returns The complete curriculum dataset
 */
export function loadCurriculumData(): CurriculumData {
  return curriculumData;
}

/**
 * Gets all topics for a specific grade and term
 * @param grade - The grade number (7, 8, or 9)
 * @param term - The term number (currently only 1 is supported)
 * @returns Array of topics for the specified grade and term
 */
export function getTopicsForGrade(grade: number, term: number = 1): Topic[] {
  if (![7, 8, 9].includes(grade)) {
    throw new Error('Invalid grade. Must be 7, 8, or 9.');
  }
  if (term !== 1) {
    throw new Error('Currently only Term 1 is supported.');
  }

  const gradeKey = `grade${grade}` as keyof Curriculum;
  return curriculumData.curriculum[gradeKey].term1.topics;
}

/**
 * Gets a specific topic by name for a grade
 * @param grade - The grade number (7, 8, or 9)
 * @param topicName - The name of the topic to find
 * @returns The topic object if found, undefined otherwise
 */
export function getTopicByName(grade: number, topicName: string): Topic | undefined {
  const topics = getTopicsForGrade(grade);
  return topics.find(topic => topic.name.toLowerCase() === topicName.toLowerCase());
}

/**
 * Gets all concepts for a specific grade
 * @param grade - The grade number (7, 8, or 9)
 * @returns Array of unique concepts for the grade
 */
export function getAllConceptsForGrade(grade: number): string[] {
  const topics = getTopicsForGrade(grade);
  const concepts = topics.flatMap(topic => topic.concepts);
  return Array.from(new Set(concepts)); // Remove duplicates
}

/**
 * Gets the total duration of all topics for a grade
 * @param grade - The grade number (7, 8, or 9)
 * @returns The total duration in weeks
 */
export function getTotalDurationForGrade(grade: number): number {
  const topics = getTopicsForGrade(grade);
  return topics.reduce((total, topic) => {
    const weeks = parseInt(topic.duration);
    return total + (isNaN(weeks) ? 0 : weeks);
  }, 0);
}

export function getCurriculumData() {
  return curriculumData;
}

export function getAvailableGrades(): number[] {
  return curriculumData.metadata.grades;
}

export function getTopicNamesForGrade(grade: number): string[] {
  return getTopicsForGrade(grade).map((topic) => topic.name);
}

export function findTopic(grade: number, topicName: string) {
  const topics = getTopicsForGrade(grade);
  return topics.find((topic) => topic.name === topicName) || null;
}

export function getAllTopics() {
  const allTopics: (Topic & { grade: number })[] = [];
  [7, 8, 9].forEach((grade) => {
    const topics = getTopicsForGrade(grade);
    topics.forEach((topic) => allTopics.push({ grade, ...topic }));
  });
  return allTopics;
}

export default {
  getCurriculumData,
  getAvailableGrades,
  getTopicsForGrade,
  getTopicNamesForGrade,
  findTopic,
  getAllTopics,
};
