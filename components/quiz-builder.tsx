'use client'

import { useState } from 'react'
import { LandingState } from '@/components/landing-state'
import { LoadingState } from '@/components/loading-state'
import { QuizState } from '@/components/quiz-state'
import { ResultsState } from '@/components/results-state'
import type { Quiz, AnswerRecord } from '@/lib/quiz-types'

type Phase = 'landing' | 'loading' | 'quiz' | 'results'

export function QuizBuilder() {
  const [phase, setPhase] = useState<Phase>('landing')
  const [topic, setTopic] = useState('')
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate(nextTopic: string) {
    setTopic(nextTopic)
    setError(null)
    setPhase('loading')

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: nextTopic }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? 'Failed to generate the quiz.')
      }

      const data: Quiz = await res.json()
      if (!data.questions?.length) {
        throw new Error('No questions were generated. Please try again.')
      }

      setQuiz(data)
      setCurrentIndex(0)
      setAnswers([])
      setPhase('quiz')
    } catch (err) {
      console.log('[v0] handleGenerate error:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
      setPhase('landing')
    }
  }

  function handleSubmitAnswer(selectedIndex: number) {
    if (!quiz) return
    const question = quiz.questions[currentIndex]
    const record: AnswerRecord = {
      selectedIndex,
      isCorrect: selectedIndex === question.correctIndex,
    }
    const nextAnswers = [...answers, record]
    setAnswers(nextAnswers)

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((i) => i + 1)
    } else {
      setPhase('results')
    }
  }

  function handleRestart() {
    setPhase('landing')
    setTopic('')
    setQuiz(null)
    setCurrentIndex(0)
    setAnswers([])
    setError(null)
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-12">
      {phase === 'landing' && (
        <LandingState onGenerate={handleGenerate} error={error} />
      )}
      {phase === 'loading' && <LoadingState topic={topic} />}
      {phase === 'quiz' && quiz && (
        <QuizState
          quiz={quiz}
          currentIndex={currentIndex}
          onSubmitAnswer={handleSubmitAnswer}
        />
      )}
      {phase === 'results' && quiz && (
        <ResultsState quiz={quiz} answers={answers} onRestart={handleRestart} />
      )}
    </main>
  )
}
