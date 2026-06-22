'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { Quiz } from '@/lib/quiz-types'

export function QuizState({
  quiz,
  currentIndex,
  onSubmitAnswer,
}: {
  quiz: Quiz
  currentIndex: number
  onSubmitAnswer: (selectedIndex: number) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const question = quiz.questions[currentIndex]
  const total = quiz.questions.length
  const progress = (currentIndex / total) * 100

  function handleSubmit() {
    if (selected === null) return
    onSubmitAnswer(selected)
    setSelected(null)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span className="truncate pr-2 text-foreground">{quiz.topic}</span>
          <span className="shrink-0">
            Question {currentIndex + 1} of {total}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="text-balance text-xl font-semibold leading-snug text-foreground">
          {question.question}
        </h2>

        <fieldset className="mt-6 flex flex-col gap-3">
          <legend className="sr-only">Choose one answer</legend>
          {question.options.map((option, i) => {
            const isSelected = selected === i
            return (
              <button
                key={i}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(i)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-medium transition-all',
                  isSelected
                    ? 'border-primary bg-primary/5 text-foreground ring-1 ring-primary'
                    : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary',
                )}
              >
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-secondary text-muted-foreground',
                  )}
                >
                  {isSelected ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="text-pretty">{option}</span>
              </button>
            )
          })}
        </fieldset>

        <Button
          onClick={handleSubmit}
          disabled={selected === null}
          size="lg"
          className="mt-6 h-12 w-full text-base"
        >
          {currentIndex + 1 === total ? 'Submit & See Results' : 'Submit Answer'}
        </Button>
      </div>
    </div>
  )
}
