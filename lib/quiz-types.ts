export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  topic: string
  questions: QuizQuestion[]
}

export interface AnswerRecord {
  selectedIndex: number
  isCorrect: boolean
}
