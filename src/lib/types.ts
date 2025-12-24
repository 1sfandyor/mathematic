export interface User {
  id: string;
  uniqueId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  avatarUrl: string;
  level: number;
  xp: number;
  longestCombo: number;
  totalQuestions: number;
  correctAnswers: number;
  createdAt: string;
  lastActive: string;
}

export interface Session {
  id: string;
  userId: string;
  level: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  longestCombo: number;
  xpEarned: number;
  startedAt: string;
  completedAt?: string;
}

export interface Question {
  id: string;
  sessionId: string;
  questionType: 'oddiy' | 'ketma-ket';
  questionData: {
    expression: string;
    terms: number[];
    operators: string[];
  };
  userAnswer?: number;
  correctAnswer: number;
  isCorrect?: boolean;
  answeredAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatarUrl: string;
  };
  elo: number;
  change: number;
}

export interface TrainingZone {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'green' | 'blue' | 'red' | 'gray';
  progress: number;
  status: 'mastered' | 'in-progress' | 'next-up' | 'locked';
  category: 'addition' | 'subtraction' | 'multiplication' | 'division';
  requiredLevel: number;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

export type PracticeSpeed = 'sekin' | 'ortacha' | 'tez';

export interface PracticeSettings {
  speed: PracticeSpeed;
  questionType: 'oddiy' | 'ketma-ket';
}
