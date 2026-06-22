'use client'

import type React from 'react'
import { useState } from 'react'
import { Sparkles, GraduationCap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const SUGGESTIONS = [
  'Infant sleep training',
  'Toddler nutrition',
  'Screen time guidelines',
  'Positive discipline',
]

export function LandingState({
  onGenerate,
  error,
}: {
  onGenerate: (topic: string) => void
  error?: string | null
}) {
  const [topic, setTopic] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (topic.trim()) onGenerate(topic.trim())
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
      <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <GraduationCap className="size-7" aria-hidden="true" />
      </div>

      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Employee Quiz Builder
      </h1>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
        Generate a tailored training quiz on any parenting topic to keep your
        team sharp, confident, and ready to support families.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full rounded-2xl border border-border bg-card p-6 text-left shadow-sm"
      >
        <Label htmlFor="topic" className="text-sm font-medium text-foreground">
          Parenting Topic
        </Label>
        <Input
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Infant sleep training"
          className="mt-2 h-12 text-base"
          autoFocus
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setTopic(s)}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {s}
            </button>
          ))}
        </div>

        {error ? (
          <p className="mt-4 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={!topic.trim()}
          className="mt-6 h-12 w-full text-base"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          Generate Quiz
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </form>
    </div>
  )
}
