// Scoring criteria weights
export const SCORING_CRITERIA = {
  CAPS_ALIGNMENT: 2, // 2 points
  BLOOMS_ALIGNMENT: 1, // 1 point
  SCAFFOLDING: 1, // 1 point
  SA_CONTEXT: 1, // 1 point
} as const;

// Maximum possible score
export const MAX_SCORE = Object.values(SCORING_CRITERIA).reduce((sum, weight) => sum + weight, 0);

// Score ranges for color coding
export const SCORE_RANGES = {
  LOW: { min: 1, max: 2, color: 'red' },
  MEDIUM: { min: 3, max: 3, color: 'yellow' },
  HIGH: { min: 4, max: 5, color: 'green' },
} as const;

// Interface for individual criterion scores
export interface CriterionScore {
  score: number;
  maxScore: number;
  feedback: string;
}

// Interface for complete quality score
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

// Function to get score color based on total score
export function getScoreColor(score: number): string {
  if (score >= 4) return 'green';
  if (score >= 3) return 'yellow';
  return 'red';
}

// Function to validate individual criterion scores
export function validateCriterionScore(score: number, criterion: keyof typeof SCORING_CRITERIA): boolean {
  return score >= 0 && score <= SCORING_CRITERIA[criterion];
}

// Function to validate total score
export function validateTotalScore(scores: Record<string, number>): boolean {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  return total >= 0 && total <= MAX_SCORE;
}

// Function to generate score summary
export function generateScoreSummary(score: QualityScore): string {
  return `${score.totalScore}/${score.maxScore} points`;
}

// Function to check if a score meets minimum requirements
export function meetsMinimumRequirements(score: QualityScore): boolean {
  return score?.criteriaScores?.capsAlignment?.score >= 1;
}

// Function to generate improvement suggestions based on scores
export function generateImprovementSuggestions(score: QualityScore): string[] {
  const suggestions: string[] = [];

  if (score.criteriaScores.capsAlignment.score < SCORING_CRITERIA.CAPS_ALIGNMENT) {
    suggestions.push('Ensure the content aligns with CAPS curriculum requirements');
  }

  if (score.criteriaScores.bloomsAlignment.score < SCORING_CRITERIA.BLOOMS_ALIGNMENT) {
    suggestions.push('Adjust activities to better match the intended cognitive level');
  }

  if (score.criteriaScores.scaffolding.score < SCORING_CRITERIA.SCAFFOLDING) {
    suggestions.push('Provide more appropriate support and guidance for the selected scaffolding level');
  }

  if (score.criteriaScores.saContext.score < SCORING_CRITERIA.SA_CONTEXT) {
    suggestions.push('Include more South African examples and context');
  }

  return suggestions;
}

// Fallback scoring mechanism for when OpenAI API is unavailable
export function generateFallbackScore(prompt: string): QualityScore {
  // Basic heuristics for fallback scoring
  const hasCapsKeywords = /curriculum|caps|grade|learning objective/i.test(prompt);
  const hasBloomsKeywords = /remember|understand|apply|analyze|evaluate|create/i.test(prompt);
  const hasScaffoldingKeywords = /support|guidance|independent|scaffold/i.test(prompt);
  const hasSAContext = /south africa|local|province|city|town/i.test(prompt);

  const criteriaScores = {
    capsAlignment: {
      score: hasCapsKeywords ? 1 : 0,
      maxScore: SCORING_CRITERIA.CAPS_ALIGNMENT,
      feedback: hasCapsKeywords ? 'Basic CAPS alignment detected' : 'No clear CAPS alignment found'
    },
    bloomsAlignment: {
      score: hasBloomsKeywords ? 1 : 0,
      maxScore: SCORING_CRITERIA.BLOOMS_ALIGNMENT,
      feedback: hasBloomsKeywords ? 'Bloom\'s taxonomy level detected' : 'No clear cognitive level specified'
    },
    scaffolding: {
      score: hasScaffoldingKeywords ? 1 : 0,
      maxScore: SCORING_CRITERIA.SCAFFOLDING,
      feedback: hasScaffoldingKeywords ? 'Scaffolding level indicated' : 'No clear scaffolding approach found'
    },
    saContext: {
      score: hasSAContext ? 1 : 0,
      maxScore: SCORING_CRITERIA.SA_CONTEXT,
      feedback: hasSAContext ? 'South African context detected' : 'Limited South African context found'
    }
  };

  const totalScore = Object.values(criteriaScores).reduce(
    (sum, criterion) => sum + criterion.score,
    0
  );

  return {
    totalScore,
    maxScore: MAX_SCORE,
    criteriaScores,
    feedback: [
      'Note: This is an automated fallback score based on keyword detection.',
      'For more accurate scoring, please try again when the API is available.'
    ],
    suggestions: generateImprovementSuggestions({
      totalScore,
      maxScore: MAX_SCORE,
      criteriaScores,
      feedback: [],
      suggestions: []
    })
  };
} 