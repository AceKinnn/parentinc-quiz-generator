'use client'

import { Check, X, RotateCcw, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Quiz, AnswerRecord } from '@/lib/quiz-types'

export function ResultsState({
  quiz,
  answers,
  onRestart,
}: {
  quiz: Quiz
  answers: AnswerRecord[]
  onRestart: () => void
}) {
  const correctCount = answers.filter((a) => a.isCorrect).length
  const total = quiz.questions.length
  const percent = Math.round((correctCount / total) * 100)

  const message =
    percent >= 80
      ? 'Excellent work, you really know your stuff!'
      : percent >= 50
        ? 'Nice effort, a quick review will get you there.'
        : 'Worth another look, review the topics below.'

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Trophy className="size-7" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Quiz Complete
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{quiz.topic}</p>

        <div className="mt-6 flex items-end justify-center gap-1">
          <span className="text-5xl font-bold text-primary">
            {correctCount}
          </span>
          <span className="pb-1 text-xl font-medium text-muted-foreground">
            / {total}
          </span>
        </div>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          {message} You scored{' '}
          <span className="font-semibold text-foreground">{percent}%</span>.
        </p>

        <Button
          onClick={onRestart}
          size="lg"
          className="mt-6 h-12 w-full text-base"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Take Another Quiz
        </Button>
      </div>

      <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Answer Breakdown
      </h3>
      <ul className="flex flex-col gap-3">
        {quiz.questions.map((q, i) => {
          const answer = answers[i]
          const isCorrect = answer?.isCorrect
          return (
            <li
              key={i}
              className="rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
                    isCorrect
                      ? 'bg-primary/10 text-primary'
                      : 'bg-destructive/10 text-destructive',
                  )}
                >
                  {isCorrect ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <X className="size-4" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-pretty text-sm font-medium text-foreground">
                    {q.question}
                  </p>

                  {!isCorrect && answer ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="font-medium text-destructive">
                        Your answer:
                      </span>{' '}
                      {q.options[answer.selectedIndex]}
                    </p>
                  ) : null}

                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-medium text-primary">
                      Correct answer:
                    </span>{' '}
                    {q.options[q.correctIndex]}
                  </p>

                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {q.explanation}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
