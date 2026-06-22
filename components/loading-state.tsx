'use client'

import { Loader2 } from 'lucide-react'

export function LoadingState({ topic }: { topic: string }) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
        <Loader2
          className="size-8 animate-spin text-primary"
          aria-hidden="true"
        />
      </div>
      <h2 className="mt-6 text-xl font-semibold text-foreground">
        Building your quiz
      </h2>
      <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
        Crafting thoughtful questions about{' '}
        <span className="font-medium text-foreground">{topic}</span>. This takes
        just a moment.
      </p>
      <span className="sr-only" role="status">
        Generating quiz, please wait.
      </span>
    </div>
  )
}
