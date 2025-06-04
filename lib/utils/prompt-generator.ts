import { Topic } from './curriculum';

export type LearningObjectType = 
  | 'Lesson Plan'
  | 'Quiz'
  | 'Worksheet'
  | 'Project'
  | 'Assessment';

export type ScaffoldingLevel = 
  | 'High Support'
  | 'Moderate Guidance'
  | 'Independent Application';

export type BloomsLevel = 
  | 'Remember'
  | 'Understand'
  | 'Apply'
  | 'Analyze'
  | 'Evaluate'
  | 'Create';

export interface PromptGenerationParams {
  grade: number;
  topic: Topic;
  learningObjectType: LearningObjectType;
  scaffoldingLevel: ScaffoldingLevel;
  bloomsLevel: BloomsLevel;
  includeSouthAfricanContext: boolean;
}

// Base template structure for different learning object types
const TEMPLATES = {
  'Lesson Plan': `
Create a detailed lesson plan for Grade [Grade] EMS on the topic of [Topic].

Learning Objective:
[LearningObjective]

Key Concepts:
[Concepts]

Duration: [Duration]

Scaffolding Level: [ScaffoldingLevel]
- Provide appropriate support and guidance based on the selected level
- Include clear instructions and examples
- Break down complex tasks into manageable steps

Bloom's Taxonomy Level: [BloomsLevel]
- Design activities that align with the selected cognitive level
- Include appropriate assessment methods
- Ensure progression in cognitive complexity

[SouthAfricanContext]

Lesson Structure:
1. Introduction (10 minutes)
   - Hook and engagement activity
   - Learning objectives overview
   - Prior knowledge activation

2. Main Content (30 minutes)
   - Core concept explanation
   - Interactive activities
   - Real-world examples

3. Practice and Application (20 minutes)
   - Guided practice
   - Group activities
   - Individual exercises

4. Assessment and Feedback (15 minutes)
   - Formative assessment
   - Student reflection
   - Teacher feedback

5. Conclusion and Extension (5 minutes)
   - Summary of key points
   - Homework or extension activities
   - Preview of next lesson

Resources Required:
- List of materials and resources
- Digital tools and platforms
- Assessment materials

Differentiation Strategies:
- Support for struggling learners
- Extension activities for advanced learners
- Accommodations for diverse learning needs
`,

  'Quiz': `
Create a comprehensive quiz for Grade [Grade] EMS on the topic of [Topic].

Learning Objective:
[LearningObjective]

Key Concepts:
[Concepts]

Scaffolding Level: [ScaffoldingLevel]
- Adjust question complexity and support based on level
- Include appropriate hints and guidance
- Structure questions for optimal understanding

Bloom's Taxonomy Level: [BloomsLevel]
- Design questions that match the cognitive level
- Include a mix of question types
- Ensure appropriate challenge level

[SouthAfricanContext]

Quiz Structure:
1. Multiple Choice Questions (40%)
   - Cover key concepts
   - Include distractors
   - Test understanding

2. Short Answer Questions (30%)
   - Focus on application
   - Require explanation
   - Test analysis skills

3. Case Study/Scenario Questions (30%)
   - Real-world application
   - Problem-solving
   - Critical thinking

Answer Key:
- Detailed solutions
- Marking guidelines
- Common misconceptions

Time Allocation: 45 minutes
Total Marks: 50
`,

  'Worksheet': `
Create an engaging worksheet for Grade [Grade] EMS on the topic of [Topic].

Learning Objective:
[LearningObjective]

Key Concepts:
[Concepts]

Scaffolding Level: [ScaffoldingLevel]
- Provide appropriate support structures
- Include clear instructions
- Break down complex tasks

Bloom's Taxonomy Level: [BloomsLevel]
- Design activities matching cognitive level
- Include varied task types
- Ensure appropriate challenge

[SouthAfricanContext]

Worksheet Structure:
1. Concept Review (20%)
   - Key terms matching
   - Concept definitions
   - Basic understanding check

2. Application Activities (40%)
   - Problem-solving tasks
   - Real-world scenarios
   - Practical exercises

3. Critical Thinking (40%)
   - Analysis questions
   - Evaluation tasks
   - Creative application

Time Allocation: 60 minutes
Total Marks: 40
`,

  'Project': `
Create a comprehensive project brief for Grade [Grade] EMS on the topic of [Topic].

Learning Objective:
[LearningObjective]

Key Concepts:
[Concepts]

Scaffolding Level: [ScaffoldingLevel]
- Provide appropriate project structure
- Include clear milestones
- Offer necessary support

Bloom's Taxonomy Level: [BloomsLevel]
- Design project tasks matching cognitive level
- Include varied activities
- Ensure appropriate challenge

[SouthAfricanContext]

Project Structure:
1. Project Overview
   - Objectives
   - Timeline
   - Deliverables

2. Research Phase
   - Information gathering
   - Data collection
   - Analysis

3. Development Phase
   - Content creation
   - Material development
   - Progress tracking

4. Presentation Phase
   - Final product
   - Presentation guidelines
   - Assessment criteria

Assessment Criteria:
- Content understanding
- Application of concepts
- Presentation quality
- Teamwork (if applicable)

Time Allocation: 2 weeks
Total Marks: 100
`,

  'Assessment': `
Create a comprehensive assessment for Grade [Grade] EMS on the topic of [Topic].

Learning Objective:
[LearningObjective]

Key Concepts:
[Concepts]

Scaffolding Level: [ScaffoldingLevel]
- Adjust assessment complexity
- Include appropriate support
- Structure for optimal understanding

Bloom's Taxonomy Level: [BloomsLevel]
- Design assessment items matching cognitive level
- Include varied question types
- Ensure appropriate challenge

[SouthAfricanContext]

Assessment Structure:
1. Section A: Multiple Choice (30 marks)
   - Cover key concepts
   - Include distractors
   - Test understanding

2. Section B: Short Answer (30 marks)
   - Focus on application
   - Require explanation
   - Test analysis skills

3. Section C: Extended Response (40 marks)
   - Case studies
   - Problem-solving
   - Critical thinking

Answer Key:
- Detailed solutions
- Marking guidelines
- Common misconceptions

Time Allocation: 90 minutes
Total Marks: 100
`
};

// Grade-specific learning objective templates
const GRADE_OBJECTIVES = {
  7: [
    "Understand basic economic concepts and their application in daily life",
    "Develop foundational knowledge of economic systems and participants",
    "Apply basic economic principles to real-world situations",
    "Analyze simple economic scenarios and make informed decisions"
  ],
  8: [
    "Apply economic concepts to analyze business and market structures",
    "Evaluate different forms of business ownership and their implications",
    "Understand the role of labor in economic production",
    "Analyze market dynamics and their impact on business decisions"
  ],
  9: [
    "Evaluate different economic systems and their impact on society",
    "Create and analyze business plans for entrepreneurial ventures",
    "Apply financial literacy concepts to personal and business contexts",
    "Develop critical thinking skills for economic decision-making"
  ]
};

// Scaffolding level descriptions
const SCAFFOLDING_DESCRIPTIONS = {
  'High Support': {
    description: "Maximum support and guidance for learners who need significant assistance",
    strategies: [
      "Provide step-by-step instructions with clear examples",
      "Include visual aids and diagrams to support understanding",
      "Break down complex tasks into smaller, manageable parts",
      "Offer frequent checkpoints and immediate feedback",
      "Use guided practice with teacher modeling",
      "Include vocabulary support and concept definitions",
      "Provide templates and graphic organizers",
      "Allow for collaborative learning opportunities"
    ]
  },
  'Moderate Guidance': {
    description: "Balanced support that gradually builds independence",
    strategies: [
      "Provide general guidelines and frameworks",
      "Include some examples and models",
      "Allow for some independent problem-solving",
      "Offer periodic check-ins and feedback",
      "Encourage peer collaboration and discussion",
      "Include some open-ended questions",
      "Provide basic templates or outlines",
      "Allow for some choice in approach"
    ]
  },
  'Independent Application': {
    description: "Minimal support for learners ready to work independently",
    strategies: [
      "Provide open-ended tasks and challenges",
      "Encourage creative problem-solving",
      "Allow for self-directed learning",
      "Include opportunities for extension and enrichment",
      "Promote critical thinking and analysis",
      "Encourage peer teaching and leadership",
      "Allow for choice in presentation and approach",
      "Include opportunities for real-world application"
    ]
  }
};

// Bloom's taxonomy level descriptions and pedagogical guidance
const BLOOMS_GUIDANCE = {
  'Remember': {
    description: "Recall facts and basic concepts",
    verbs: ["define", "list", "name", "recall", "identify", "match", "select"],
    activities: [
      "Create flashcards for key terms",
      "Develop matching exercises",
      "Write definitions in own words",
      "Complete fill-in-the-blank exercises",
      "List key concepts and facts"
    ],
    assessment: [
      "Multiple choice questions",
      "True/false statements",
      "Matching exercises",
      "Short answer recall questions"
    ]
  },
  'Understand': {
    description: "Explain ideas or concepts",
    verbs: ["explain", "summarize", "interpret", "describe", "compare", "contrast", "classify"],
    activities: [
      "Write summaries of key concepts",
      "Create concept maps",
      "Explain processes in own words",
      "Compare and contrast ideas",
      "Paraphrase main points"
    ],
    assessment: [
      "Short answer explanations",
      "Concept mapping",
      "Summarization tasks",
      "Compare/contrast exercises"
    ]
  },
  'Apply': {
    description: "Use information in new situations",
    verbs: ["solve", "use", "demonstrate", "calculate", "complete", "illustrate", "show"],
    activities: [
      "Solve real-world problems",
      "Apply concepts to new scenarios",
      "Create examples",
      "Demonstrate processes",
      "Complete practice exercises"
    ],
    assessment: [
      "Problem-solving tasks",
      "Case studies",
      "Application exercises",
      "Demonstration of skills"
    ]
  },
  'Analyze': {
    description: "Draw connections among ideas",
    verbs: ["analyze", "organize", "compare", "examine", "investigate", "categorize", "differentiate"],
    activities: [
      "Analyze case studies",
      "Investigate relationships",
      "Compare different approaches",
      "Examine cause and effect",
      "Break down complex problems"
    ],
    assessment: [
      "Analysis of case studies",
      "Critical thinking questions",
      "Problem decomposition",
      "Relationship mapping"
    ]
  },
  'Evaluate': {
    description: "Justify a stand or decision",
    verbs: ["evaluate", "assess", "judge", "critique", "recommend", "argue", "defend"],
    activities: [
      "Evaluate different solutions",
      "Assess effectiveness of approaches",
      "Make recommendations",
      "Defend positions",
      "Critique arguments"
    ],
    assessment: [
      "Evaluation of solutions",
      "Critical reviews",
      "Recommendation reports",
      "Defense of positions"
    ]
  },
  'Create': {
    description: "Produce new or original work",
    verbs: ["create", "design", "develop", "construct", "produce", "compose", "formulate"],
    activities: [
      "Design new solutions",
      "Create original work",
      "Develop new approaches",
      "Construct models",
      "Compose original content"
    ],
    assessment: [
      "Original project creation",
      "Design of new solutions",
      "Development of new approaches",
      "Creative presentations"
    ]
  }
};

// South African context templates for different learning object types
const SOUTH_AFRICAN_CONTEXT = {
  'Lesson Plan': {
    examples: [
      "Use local South African businesses as case studies",
      "Reference current economic policies and their impact",
      "Include examples from different provinces",
      "Discuss local market structures and competition",
      "Reference South African labor laws and regulations"
    ],
    resources: [
      "South African Reserve Bank publications",
      "Statistics South Africa data",
      "Local business news articles",
      "South African curriculum documents",
      "Provincial economic reports"
    ],
    terminology: [
      "Use appropriate South African business terms",
      "Include local economic indicators",
      "Reference South African currency and financial terms",
      "Use relevant local market terminology"
    ]
  },
  'Quiz': {
    examples: [
      "Include questions about local economic policies",
      "Reference South African business case studies",
      "Use local market examples",
      "Include questions about provincial economies",
      "Reference South African labor market"
    ],
    context: [
      "Use South African currency in calculations",
      "Reference local business structures",
      "Include questions about BEE policies",
      "Use local economic indicators"
    ]
  },
  'Worksheet': {
    examples: [
      "Use local business scenarios",
      "Include South African market data",
      "Reference local economic policies",
      "Use provincial economic examples",
      "Include local business structures"
    ],
    activities: [
      "Analyze local business case studies",
      "Research South African economic data",
      "Compare provincial economies",
      "Study local market structures"
    ]
  },
  'Project': {
    examples: [
      "Research local business opportunities",
      "Analyze South African market trends",
      "Study provincial economic development",
      "Investigate local business structures",
      "Examine South African economic policies"
    ],
    context: [
      "Consider local market conditions",
      "Reference South African business regulations",
      "Include BEE requirements",
      "Use local economic data"
    ]
  },
  'Assessment': {
    examples: [
      "Use South African business case studies",
      "Reference local economic policies",
      "Include provincial economic data",
      "Use local market examples",
      "Reference South African labor laws"
    ],
    context: [
      "Use South African currency",
      "Reference local business structures",
      "Include BEE considerations",
      "Use local economic indicators"
    ]
  }
};

/**
 * Generates enhanced learning objectives by combining grade-specific and topic-specific objectives
 * @param grade The grade level
 * @param topic The topic object containing the base learning objective
 * @returns Enhanced learning objectives string
 */
function generateEnhancedLearningObjectives(grade: number, topic: Topic): string {
  const gradeObjectives = GRADE_OBJECTIVES[grade as keyof typeof GRADE_OBJECTIVES] || [];
  
  // Create a basic learning objective based on the topic
  const baseObjective = `Students will understand and apply key concepts related to ${topic} in the context of EMS.`;
  
  // Combine base objective with grade-appropriate objectives
  const enhancedObjectives = [
    baseObjective,
    ...gradeObjectives.slice(0, 2) // Include up to 2 grade-specific objectives
  ];

  return enhancedObjectives.join('\n\n');
}

/**
 * Generates scaffolding level description and strategies
 * @param level The scaffolding level
 * @returns Formatted string with description and strategies
 */
function generateScaffoldingDescription(level: ScaffoldingLevel): string {
  const scaffolding = SCAFFOLDING_DESCRIPTIONS[level];
  return `${scaffolding.description}\n\nStrategies:\n${scaffolding.strategies.map(strategy => `- ${strategy}`).join('\n')}`;
}

/**
 * Generates Bloom's taxonomy level description and guidance
 * @param level The Bloom's taxonomy level
 * @returns Formatted string with description, verbs, activities, and assessment methods
 */
function generateBloomsGuidance(level: BloomsLevel): string {
  const blooms = BLOOMS_GUIDANCE[level];
  return `${blooms.description}\n\nKey Verbs:\n${blooms.verbs.map(verb => `- ${verb}`).join('\n')}\n\nSuggested Activities:\n${blooms.activities.map(activity => `- ${activity}`).join('\n')}\n\nAssessment Methods:\n${blooms.assessment.map(method => `- ${method}`).join('\n')}`;
}

/**
 * Generates South African context based on learning object type
 * @param learningObjectType The type of learning object
 * @returns Formatted string with South African context
 */
function generateSouthAfricanContext(learningObjectType: LearningObjectType): string {
  const context = SOUTH_AFRICAN_CONTEXT[learningObjectType];
  let contextString = 'South African Context:\n\n';

  // Add examples
  contextString += 'Examples and Case Studies:\n';
  context.examples.forEach(example => {
    contextString += `- ${example}\n`;
  });

  // Add resources if available
  if ('resources' in context) {
    contextString += '\nRecommended Resources:\n';
    context.resources.forEach(resource => {
      contextString += `- ${resource}\n`;
    });
  }

  // Add terminology if available
  if ('terminology' in context) {
    contextString += '\nLocal Terminology:\n';
    context.terminology.forEach(term => {
      contextString += `- ${term}\n`;
    });
  }

  // Add activities if available
  if ('activities' in context) {
    contextString += '\nSuggested Activities:\n';
    context.activities.forEach(activity => {
      contextString += `- ${activity}\n`;
    });
  }

  // Add context
  if ('context' in context) {
    contextString += '\nContextual Considerations:\n';
    context.context.forEach(consideration => {
      contextString += `- ${consideration}\n`;
    });
  }

  return contextString;
}

/**
 * Generates a prompt based on the provided parameters
 * @param params The parameters for prompt generation
 * @returns The generated prompt string
 */
export function generatePrompt(params: PromptGenerationParams): string {
  const {
    grade,
    topic,
    learningObjectType,
    scaffoldingLevel,
    bloomsLevel,
    includeSouthAfricanContext
  } = params;

  // Get the base template for the learning object type
  let prompt = TEMPLATES[learningObjectType];

  // Generate enhanced learning objectives
  const enhancedObjectives = generateEnhancedLearningObjectives(grade, topic);

  // Generate scaffolding description
  const scaffoldingDescription = generateScaffoldingDescription(scaffoldingLevel);

  // Generate Bloom's taxonomy guidance
  const bloomsGuidance = generateBloomsGuidance(bloomsLevel);

  // Replace placeholders with actual values
  prompt = prompt
    .replace('[Grade]', grade.toString())
    .replace('[Topic]', topic.toString())
    .replace('[LearningObjective]', enhancedObjectives)
    .replace('[Concepts]', 'Key concepts will be generated based on the topic')
    .replace('[Duration]', '45 minutes')
    .replace('[ScaffoldingLevel]', scaffoldingDescription)
    .replace('[BloomsLevel]', bloomsGuidance);

  // Add South African context if requested
  if (includeSouthAfricanContext) {
    prompt = prompt.replace(
      '[SouthAfricanContext]',
      generateSouthAfricanContext(learningObjectType)
    );
  } else {
    prompt = prompt.replace('[SouthAfricanContext]', '');
  }

  return prompt.trim();
}

const promptGenerator = {
  generatePrompt,
  generateEnhancedLearningObjectives,
  generateScaffoldingDescription,
  generateBloomsGuidance,
  generateSouthAfricanContext
};

export default promptGenerator; 