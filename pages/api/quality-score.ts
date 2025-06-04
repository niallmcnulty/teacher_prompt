import { NextApiRequest, NextApiResponse } from 'next';
import { openai, callOpenAI } from '../../lib/utils/openai-client';
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

    // Create the prompt for OpenAI with specific learning object type
    const systemPrompt = `You are an expert EMS (Economic and Management Sciences) teacher in South Africa. 
Your task is to generate high-quality learning materials that align with the CAPS curriculum.
Focus on creating engaging, practical, and locally relevant content.

You must generate content specifically for the learning object type requested. Different types have different structures:
- Lesson Plan: Full lesson structure with timing, activities, and assessment
- Quiz: Questions with answer key and marking guidelines  
- Worksheet: Student activities with exercises and tasks
- Project: Comprehensive project brief with phases and deliverables
- Assessment: Formal test with multiple sections and marking criteria`;

    const userPrompt = `Generate a ${learningObjectType} for Grade ${grade} EMS on the topic of "${topic}".

IMPORTANT: This must be formatted as a ${learningObjectType}, not any other type of learning material.

Key Requirements:
- Grade Level: ${grade}
- Topic: ${topic}
- Learning Object Type: ${learningObjectType}
- Scaffolding Level: ${scaffoldingLevel}
- Bloom's Taxonomy Level: ${bloomsLevel}
${includeSouthAfricanContext ? '- Include South African context and examples' : ''}

Please provide a detailed, well-structured ${learningObjectType} that includes:
1. Clear learning objectives aligned with CAPS curriculum
2. Content and activities appropriate for ${learningObjectType}
3. Assessment methods suitable for ${learningObjectType}
4. Required resources and materials
5. Time allocation appropriate for ${learningObjectType}
6. Differentiation strategies for ${scaffoldingLevel} support level
7. Activities targeting ${bloomsLevel} cognitive level
${includeSouthAfricanContext ? '8. South African context, examples, and case studies' : ''}

Format this specifically as a ${learningObjectType} with the appropriate structure and sections.`;

    try {
      console.log('Calling OpenAI for prompt generation...', {
        learningObjectType,
        grade,
        topic
      });

      const completion = await callOpenAI(() =>
        openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2500
        }),
        0, // retryCount
        60000 // 60 second timeout
      );

      const generatedPrompt = completion.choices[0].message.content;
      if (!generatedPrompt) {
        throw new Error('No content received from OpenAI API');
      }

      return res.status(200).json({ prompt: generatedPrompt });
    } catch (error) {
      const openAIError = error as OpenAIError;
      console.error('OpenAI API error:', openAIError);
      return res.status(500).json({ 
        error: 'Error generating prompt with OpenAI',
        details: openAIError.message || 'Unknown error occurred'
      });
    }
  } catch (error) {
    const openAIError = error as OpenAIError;
    console.error('Error in prompt generation:', openAIError);
    return res.status(500).json({ 
      error: 'Error processing request',
      details: openAIError.message || 'Unknown error occurred'
    });
  }
} 