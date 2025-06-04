import { NextApiRequest, NextApiResponse } from 'next';
import { openai, callOpenAI } from '../../lib/utils/openai-client';

interface GeneratePromptRequest {
  grade: number;
  topic: string;
  learningObjectType: string;
  scaffoldingLevel: string;
  bloomsLevel: string;
}

interface OpenAIError {
  message: string;
  status?: number;
  code?: string;
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
      scaffoldingLevel,
      bloomsLevel,
    } = req.body as GeneratePromptRequest;

    // Create the prompt for OpenAI
    const systemPrompt = `You are an expert in writing effective prompts for teachers to use in AI chatbots (like ChatGPT) to generate high-quality, pedagogically sound lesson plans. You always incorporate evidence-based learning science principles and best teaching practices in your prompts, such as active learning, scaffolding, formative assessment, differentiation, and retrieval practice.`;

    const userPrompt = `Write a detailed, plain English prompt that a teacher can copy and paste into a chatbot to generate a comprehensive, CAPS-aligned lesson plan for Grade ${grade} EMS on the topic '${topic}'.\n\nThe prompt should instruct the chatbot to:\n- Use learning science principles (such as active learning, scaffolding, formative assessment, differentiation, and retrieval practice)\n- Include clear learning objectives\n- Provide engaging content and activities\n- Suggest assessment methods\n- List required resources\n- Specify time allocation\n- Offer differentiation strategies\n- Incorporate relevant South African context and examples\n- Align with the CAPS curriculum\n- Target the ${bloomsLevel} cognitive level\n- Be suitable for ${scaffoldingLevel} learners\n\nMake the prompt as clear, specific, and pedagogically sound as possible so the teacher gets a high-quality, locally relevant lesson plan that reflects best practices in teaching and learning science.\n\nReturn only the copy-paste-ready prompt, with no introductory text, explanation, or formatting—just the prompt itself.`;

    try {
      const completion = await callOpenAI(() =>
        openai.chat.completions.create({
          model: "gpt-4.1",
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
          max_tokens: 2000
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
      return res.status(500).json({ 
        error: 'Error generating prompt with OpenAI',
        details: openAIError.message || 'Unknown error occurred'
      });
    }
  } catch (error) {
    const openAIError = error as OpenAIError;
    return res.status(500).json({ 
      error: 'Error processing request',
      details: openAIError.message || 'Unknown error occurred'
    });
  }
} 