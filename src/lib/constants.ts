export const AVATARS = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Max',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Mia',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Leo',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Sophie',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Oscar',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma',
];

export const SPEED_CONFIG = {
  sekin: { label: "🐢 Sekin", duration: 1500 },
  ortacha: { label: "🚶 O'rtacha", duration: 1000 },
  tez: { label: "🏃 Tez", duration: 500 },
} as const;

export const LEVEL_TERMS = {
  1: { min: 3, max: 4 },
  2: { min: 3, max: 4 },
  3: { min: 4, max: 5 },
  4: { min: 4, max: 5 },
  5: { min: 5, max: 6 },
  6: { min: 5, max: 6 },
  7: { min: 6, max: 7 },
  8: { min: 6, max: 7 },
  9: { min: 6, max: 7 },
  10: { min: 6, max: 7 },
} as const;

export const QUESTIONS_PER_SESSION = 10;
export const LEVEL_UP_THRESHOLD = 0.7; // 70% accuracy needed

export const MOCK_USER = {
  id: '1',
  uniqueId: 'APEX-12345',
  firstName: 'Ali',
  lastName: 'Karimov',
  birthDate: '2015-05-15',
  avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Leo',
  level: 4,
  xp: 875,
  longestCombo: 21,
  totalQuestions: 342,
  correctAnswers: 315,
  createdAt: '2024-01-15',
  lastActive: new Date().toISOString(),
};

export const MOCK_LEADERBOARD = [
  { rank: 1, user: { name: "Sarvinoz S.", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah" }, elo: 1245, change: 12 },
  { rank: 2, user: { name: "Mirzo M.", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mike" }, elo: 1180, change: 8 },
  { rank: 3, user: { name: "Nodira N.", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma" }, elo: 1120, change: 5 },
];

export const TRAINING_ZONES = [
  {
    id: 'addition',
    title: "Aniq Qo'shish",
    description: "1000 gacha bo'lgan sonlarni tez qo'shishni o'rganing.",
    icon: 'Plus',
    color: 'green' as const,
    progress: 100,
    status: 'mastered' as const,
  },
  {
    id: 'subtraction',
    title: "Tez Ayirish",
    description: "Tez hisoblash bilan sonlarni ayirishni mashq qiling.",
    icon: 'Minus',
    color: 'blue' as const,
    progress: 60,
    status: 'in-progress' as const,
  },
  {
    id: 'multiplication',
    title: "Ko'paytirish Matritsasi",
    description: "Murakkab ko'paytirish usullarini o'zlashtiring.",
    icon: 'X',
    color: 'red' as const,
    progress: 0,
    status: 'next-up' as const,
  },
  {
    id: 'division',
    title: "Bo'lish Dinamikasi",
    description: "Murakkab bo'lish strategiyalarini o'rganing.",
    icon: 'Divide',
    color: 'gray' as const,
    progress: 0,
    status: 'locked' as const,
  },
];

export const ACHIEVEMENTS = [
  { id: '1', name: "Tezlik Ustasi", icon: 'Medal', color: 'text-rank-gold', unlocked: true },
  { id: '2', name: "Mukammal 10", icon: 'Award', color: 'text-category-blue', unlocked: true },
  { id: '3', name: "Aqlli Bola", icon: 'Brain', color: 'text-category-purple', unlocked: true },
  { id: '4', name: "Elektron Tez", icon: 'Zap', color: 'text-category-red', unlocked: true },
  { id: '5', name: "Yulduz", icon: 'Star', color: 'text-rank-gold', unlocked: false },
  { id: '6', name: "Champion", icon: 'Trophy', color: 'text-primary', unlocked: false },
];
