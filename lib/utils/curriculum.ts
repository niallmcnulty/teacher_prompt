import curriculumData from "../data/caps-curriculum.json";
export interface CurriculumTopic {
  name: string;
  learningObjective: string;
  concepts: string[];
  duration: string;
  description: string;
}
export function getCurriculumData() {
  return curriculumData;
}
export function getAvailableGrades(): number[] {
  return curriculumData.metadata.grades;
}
export function getTopicsForGrade(grade: number) {
  const gradeKey = `grade${grade}` as keyof typeof curriculumData.curriculum;
  return curriculumData.curriculum[gradeKey]?.term1?.topics || [];
}
export function getTopicNamesForGrade(grade: number): string[] {
  return getTopicsForGrade(grade).map((topic) => topic.name);
}
export function findTopic(grade: number, topicName: string) {
  const topics = getTopicsForGrade(grade);
  return topics.find((topic) => topic.name === topicName) || null;
}
export function getAllTopics() {
  const allTopics: any[] = [];
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
