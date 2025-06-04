import { NextApiRequest, NextApiResponse } from 'next';
import { generatePrompt } from '../../lib/utils/prompt-generator';
import { Topic, LearningObjectType, ScaffoldingLevel, BloomsLevel } from '../../lib/types';

interface GeneratePromptRequest {
  grade: number;
  topic: Topic;
  learningObjectType: LearningObjectType;
  scaffoldingLevel: ScaffoldingLevel;
  bloomsLevel: BloomsLevel;
  includeSouthAfricanContext: boolean;
}

interface OpenAIError {
  message: string;
  status?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      grade,
      topic,
      learningObjectType,
      scaffoldingLevel,
      bloomsLevel,
      includeSouthAfricanContext
    } = req.body as GeneratePromptRequest;

    // Use the local generatePrompt function instead of OpenAI
    const generatedPrompt = generatePrompt({
      grade,
      topic,
      learningObjectType,
      scaffoldingLevel,
      bloomsLevel,
      includeSouthAfricanContext
    });

    return res.status(200).json({ prompt: generatedPrompt });
  } catch (error) {
    const openAIError = error as OpenAIError;
    console.error('Error in prompt generation:', openAIError);
    return res.status(500).json({ 
      error: 'Error processing request',
      details: openAIError.message || 'Unknown error occurred'
    });
  }
} 