export type QuestionType = 'judge' | 'single' | 'multiple' | 'essay';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Category {
  id: string;
  name: string;
  sort: number;
  description: string;
  createdAt: number;
}

export interface QuestionOption {
  key: string;
  text: string;
}

export interface Question {
  id: string;
  title: string;
  categoryId: string;
  type: QuestionType;
  difficulty: Difficulty;
  options: QuestionOption[];
  answer: string;
  analysis: string;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

export const TYPE_LABELS: Record<QuestionType, string> = {
  judge: '判断',
  single: '单选',
  multiple: '多选',
  essay: '简答'
};

export const TYPE_ORDER: QuestionType[] = ['judge', 'single', 'multiple', 'essay'];

export const DIFF_LABELS: Record<Difficulty, string> = {
  easy: '基础',
  medium: '进阶',
  hard: '难点'
};

export interface PaperConfig {
  categoryId: string;
  difficulty: Difficulty | '';
  count: number;
  timeLimitMin: number;
  source: 'compose' | 'wrong';
}

export interface ExamAnswer {
  questionId: string;
  keys: string[];
  text: string;
}

export interface ExamQuestionSnap {
  id: string;
  title: string;
  categoryId: string;
  type: QuestionType;
  difficulty: Difficulty;
  options: QuestionOption[];
  answer: string;
  analysis: string;
}

export interface ExamSession {
  id: string;
  userId: string;
  config: PaperConfig;
  questions: ExamQuestionSnap[];
  answers: Record<string, ExamAnswer>;
  startedAt: number;
  deadlineAt: number | null;
  index: number;
}

export interface ExamItemResult {
  questionId: string;
  title: string;
  type: QuestionType;
  userAnswer: string;
  correctAnswer: string;
  analysis: string;
  correct: boolean;
  scored: boolean;
}

export interface ExamRecord {
  id: string;
  userId: string;
  config: PaperConfig;
  startedAt: number;
  finishedAt: number;
  items: ExamItemResult[];
  correctCount: number;
  scoredCount: number;
  score: number;
}

export interface WrongItem {
  questionId: string;
  wrongCount: number;
  lastWrongAt: number;
  lastAnswer: string;
}

export interface BankBundle {
  version: 1;
  exportedAt: number;
  categories: Category[];
  questions: Question[];
}
