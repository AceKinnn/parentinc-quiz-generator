import { createOpenAI } from '@ai-sdk/openai'
import { generateText, Output } from 'ai'
import { z } from 'zod'

export const maxDuration = 30

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || 'MY_API_KEY', 
})

const quizSchema = z.object({
  topic: z.string().describe('A cleaned-up, well-formatted version of the topic'),
  questions: z
    .array(
      z.object({
        question: z.string().describe('The question text'),
        options: z
          .array(z.string())
          .length(4)
          .describe('Exactly four answer choices'),
        correctIndex: z
          .number()
          .int()
          .min(0)
          .max(3)
          .describe('The index (0-3) of the correct option'),
        explanation: z
          .string()
          .describe('A short explanation of why the answer is correct'),
      }),
    )
    .length(5),
})

export async function POST(req: Request) {
  try {
    const { topic } = await req.json()

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return Response.json({ error: 'A topic is required.' }, { status: 400 })
    }

    const { experimental_output } = await generateText({
      model: openrouter('openai/gpt-oss-120b:free'), 
      system:
        'You are an expert curriculum designer for a parenting technology company. ' +
        'You write accurate, practical, employee-training quizzes. ' +
        'Generate exactly 5 multiple-choice questions with exactly 4 options each. ' +
        'Questions should be clear, factual, and relevant to parenting professionals. ' +
        'Vary the position of the correct answer across questions. Keep options concise.',
      prompt: `Create a 5-question multiple-choice quiz about the parenting topic: "${topic}".`,
      experimental_output: Output.object({ schema: quizSchema }),
    })

    return Response.json(experimental_output)
  } catch (error) {
    console.log('[v0] generate-quiz error:', error)
    return Response.json(
      { error: 'Failed to generate the quiz. Please try again.' },
      { status: 500 },
    )
  }
}