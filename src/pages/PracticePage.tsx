import { useState, useEffect, useCallback } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { generateProblem, generateSequentialProblem, calculateXP } from '@/lib/mathUtils';
import { MOCK_USER, QUESTIONS_PER_SESSION, SPEED_CONFIG, BLITZ_DIFFICULTIES } from '@/lib/constants';
import { Check, X, ArrowRight, Home, RotateCcw, Zap, Trophy, Target, Flame, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { playCorrectSound, playIncorrectSound, triggerHaptic } from '@/lib/sounds';

type GameState = 'ready' | 'playing' | 'showing-term' | 'waiting-answer' | 'feedback' | 'results';
type QuestionType = 'oddiy' | 'ketma-ket';
type Speed = 'sekin' | 'ortacha' | 'tez';
type BlitzDifficulty = 'oson' | 'ortacha' | 'qiyin';

interface SessionStats {
  correct: number;
  incorrect: number;
  combo: number;
  longestCombo: number;
  xp: number;
}

export default function PracticePage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const isBlitzMode = mode === 'blitz';
  
  const [gameState, setGameState] = useState<GameState>('ready');
  const [questionType, setQuestionType] = useState<QuestionType>('oddiy');
  const [speed, setSpeed] = useState<Speed>('tez');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [problem, setProblem] = useState<ReturnType<typeof generateProblem> | null>(null);
  const [sequentialProblem, setSequentialProblem] = useState<ReturnType<typeof generateSequentialProblem> | null>(null);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [stats, setStats] = useState<SessionStats>({
    correct: 0,
    incorrect: 0,
    combo: 0,
    longestCombo: 0,
    xp: 0,
  });
  const [hasAutoStarted, setHasAutoStarted] = useState(false);
  const [blitzDifficulty, setBlitzDifficulty] = useState<BlitzDifficulty>('ortacha');
  const [timeRemaining, setTimeRemaining] = useState<number>(BLITZ_DIFFICULTIES['ortacha'].time);

  const generateNewProblem = useCallback(() => {
    if (questionType === 'oddiy') {
      setProblem(generateProblem(MOCK_USER.level));
      setSequentialProblem(null);
    } else {
      setSequentialProblem(generateSequentialProblem(MOCK_USER.level));
      setProblem(null);
      setCurrentTermIndex(0);
    }
    setUserAnswer('');
    setIsCorrect(null);
  }, [questionType]);

  const startGame = useCallback(() => {
    setCurrentQuestion(0);
    setStats({ correct: 0, incorrect: 0, combo: 0, longestCombo: 0, xp: 0 });
    setTimeRemaining(BLITZ_DIFFICULTIES[blitzDifficulty].time);
    generateNewProblem();
    
    if (questionType === 'ketma-ket') {
      setGameState('showing-term');
    } else {
      setGameState('playing');
    }
  }, [questionType, generateNewProblem, blitzDifficulty]);

  // Blitz mode timer
  useEffect(() => {
    if (!isBlitzMode) return;
    if (gameState !== 'playing' && gameState !== 'feedback' && gameState !== 'waiting-answer') return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('results');
          toast.error("Vaqt tugadi! ⏰");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBlitzMode, gameState]);

  // Note: Removed auto-start to allow user to select blitz difficulty

  // Handle sequential term display
  useEffect(() => {
    if (gameState !== 'showing-term' || !sequentialProblem) return;

    const duration = SPEED_CONFIG[speed].duration;
    
    const timer = setTimeout(() => {
      if (currentTermIndex < sequentialProblem.terms.length - 1) {
        setCurrentTermIndex(prev => prev + 1);
      } else {
        setGameState('waiting-answer');
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [gameState, currentTermIndex, sequentialProblem, speed]);

  const submitAnswer = () => {
    const answer = parseInt(userAnswer);
    const correctAnswer = questionType === 'oddiy' 
      ? problem?.answer 
      : sequentialProblem?.answer;
    
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    
    const newCombo = correct ? stats.combo + 1 : 0;
    const xpEarned = calculateXP(correct, stats.combo);
    
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
      combo: newCombo,
      longestCombo: Math.max(prev.longestCombo, newCombo),
      xp: prev.xp + xpEarned,
    }));

    if (correct) {
      playCorrectSound();
      triggerHaptic('success');
      toast.success("To'g'ri! 🎉", { duration: 1000 });
    } else {
      playIncorrectSound();
      triggerHaptic('error');
    }

    setGameState('feedback');
  };

  const nextQuestion = () => {
    if (currentQuestion >= QUESTIONS_PER_SESSION - 1) {
      setGameState('results');
      return;
    }

    setCurrentQuestion(prev => prev + 1);
    generateNewProblem();
    
    if (questionType === 'ketma-ket') {
      setGameState('showing-term');
    } else {
      setGameState('playing');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (gameState === 'playing' || gameState === 'waiting-answer') {
        submitAnswer();
      } else if (gameState === 'feedback') {
        nextQuestion();
      }
    }
  };

  const progress = ((currentQuestion + 1) / QUESTIONS_PER_SESSION) * 100;
  const accuracy = stats.correct + stats.incorrect > 0 
    ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) 
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <MainLayout hideFooter>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        {/* Ready State */}
        {gameState === 'ready' && (
          <Card className="max-w-lg w-full p-8 text-center animate-scale-in">
            <Zap className="size-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
              {isBlitzMode ? 'Kunlik Blitz' : 'Mashqni Boshlash'}
            </h1>
            <p className="text-text-sub mb-6">
              {QUESTIONS_PER_SESSION} ta misol yechib, ko'nikmalaringizni sinang!
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-bold uppercase tracking-wide text-text-sub block mb-2">
                  Mashq Turi
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={questionType === 'oddiy' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setQuestionType('oddiy')}
                  >
                    Oddiy Misol
                  </Button>
                  <Button
                    variant={questionType === 'ketma-ket' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setQuestionType('ketma-ket')}
                  >
                    Ketma-ket
                  </Button>
                </div>
              </div>

              {questionType === 'ketma-ket' && (
                <div>
                  <label className="text-sm font-bold uppercase tracking-wide text-text-sub block mb-2">
                    Tezlik
                  </label>
                  <div className="flex gap-2">
                    {(Object.keys(SPEED_CONFIG) as Speed[]).map((s) => (
                      <Button
                        key={s}
                        variant={speed === s ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setSpeed(s)}
                      >
                        {SPEED_CONFIG[s].label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {isBlitzMode && (
                <div>
                  <label className="text-sm font-bold uppercase tracking-wide text-text-sub block mb-2">
                    Qiyinlik Darajasi
                  </label>
                  <div className="flex gap-2">
                    {(Object.keys(BLITZ_DIFFICULTIES) as BlitzDifficulty[]).map((d) => (
                      <Button
                        key={d}
                        variant={blitzDifficulty === d ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setBlitzDifficulty(d)}
                      >
                        {BLITZ_DIFFICULTIES[d].label}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-text-sub mt-2">
                    Vaqt: {BLITZ_DIFFICULTIES[blitzDifficulty].time} soniya
                  </p>
                </div>
              )}
            </div>

            <Button 
              size="lg" 
              className="w-full font-black text-lg uppercase"
              onClick={startGame}
            >
              <Zap className="size-5 mr-2" />
              Boshlash
            </Button>
          </Card>
        )}

        {/* Playing State - Normal Questions */}
        {(gameState === 'playing' || gameState === 'feedback') && problem && (
          <Card className="max-w-2xl w-full p-8 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-text-sub uppercase">
                Misol {currentQuestion + 1} / {QUESTIONS_PER_SESSION}
              </span>
              <div className="flex items-center gap-4">
                {isBlitzMode && (
                  <div className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full font-bold text-sm",
                    timeRemaining <= 10 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-primary/20 text-primary"
                  )}>
                    <Clock className="size-4" />
                    {formatTime(timeRemaining)}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Flame className={cn(
                    "size-5",
                    stats.combo > 0 ? "text-category-orange" : "text-muted-foreground"
                  )} />
                  <span className="font-bold">{stats.combo}x</span>
                </div>
              </div>
            </div>

            <Progress value={progress} className="mb-8 h-2" />

            <div className="text-center mb-8">
              <p className="text-5xl md:text-6xl font-black tracking-tight mb-8">
                {problem.expression}
              </p>

              <div className="relative">
                <Input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={gameState === 'feedback'}
                  placeholder="Javobni kiriting"
                  className={cn(
                    "text-center text-3xl font-bold py-6 h-auto",
                    gameState === 'feedback' && isCorrect && "border-category-green bg-category-green/10",
                    gameState === 'feedback' && !isCorrect && "border-destructive bg-destructive/10"
                  )}
                  autoFocus
                />

                {gameState === 'feedback' && (
                  <div className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full flex items-center justify-center",
                    isCorrect ? "bg-category-green text-primary-foreground" : "bg-destructive text-destructive-foreground"
                  )}>
                    {isCorrect ? <Check className="size-6" /> : <X className="size-6" />}
                  </div>
                )}
              </div>

              {gameState === 'feedback' && !isCorrect && (
                <p className="mt-4 text-lg">
                  To'g'ri javob: <span className="font-black text-primary">{problem.answer}</span>
                </p>
              )}
            </div>

            <div className="flex gap-4">
              {gameState === 'playing' ? (
                <Button 
                  size="lg" 
                  className="flex-1 font-bold uppercase"
                  onClick={submitAnswer}
                  disabled={!userAnswer}
                >
                  Tekshirish
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="flex-1 font-bold uppercase"
                  onClick={nextQuestion}
                >
                  Keyingi <ArrowRight className="size-5 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Sequential Question - Showing Terms */}
        {gameState === 'showing-term' && sequentialProblem && (
          <Card className="max-w-2xl w-full p-8 text-center animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-text-sub uppercase">
                Misol {currentQuestion + 1} / {QUESTIONS_PER_SESSION}
              </span>
              <span className="text-sm font-bold text-primary uppercase">
                {currentTermIndex + 1} / {sequentialProblem.terms.length}
              </span>
            </div>

            <Progress value={progress} className="mb-8 h-2" />

            <div className="py-16">
              <p className="text-7xl md:text-8xl font-black animate-scale-in" key={currentTermIndex}>
                {sequentialProblem.terms[currentTermIndex].operator === '+' ? '+' : '−'}
                {sequentialProblem.terms[currentTermIndex].value}
              </p>
            </div>
          </Card>
        )}

        {/* Sequential Question - Waiting for Answer */}
        {gameState === 'waiting-answer' && sequentialProblem && (
          <Card className="max-w-2xl w-full p-8 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-text-sub uppercase">
                Misol {currentQuestion + 1} / {QUESTIONS_PER_SESSION}
              </span>
              <div className="flex items-center gap-4">
                {isBlitzMode && (
                  <div className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full font-bold text-sm",
                    timeRemaining <= 10 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-primary/20 text-primary"
                  )}>
                    <Clock className="size-4" />
                    {formatTime(timeRemaining)}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Flame className={cn(
                    "size-5",
                    stats.combo > 0 ? "text-category-orange" : "text-muted-foreground"
                  )} />
                  <span className="font-bold">{stats.combo}x</span>
                </div>
              </div>
            </div>

            <Progress value={progress} className="mb-8 h-2" />

            <div className="text-center mb-8">
              <p className="text-3xl font-black uppercase tracking-tight mb-8">
                Natija nechchi?
              </p>

              <Input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Javobni kiriting"
                className="text-center text-3xl font-bold py-6 h-auto"
                autoFocus
              />
            </div>

            <Button 
              size="lg" 
              className="w-full font-bold uppercase"
              onClick={submitAnswer}
              disabled={!userAnswer}
            >
              Tekshirish
            </Button>
          </Card>
        )}

        {/* Results State */}
        {gameState === 'results' && (
          <Card className="max-w-lg w-full p-8 text-center animate-scale-in">
            <Trophy className="size-20 text-rank-gold mx-auto mb-4" />
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
              Mashq Tugadi!
            </h1>
            <p className="text-text-sub mb-8">
              Ajoyib natija ko'rsatdingiz!
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-category-green/10 rounded-2xl p-4">
                <Check className="size-8 text-category-green mx-auto mb-2" />
                <p className="text-3xl font-black text-category-green">{stats.correct}</p>
                <p className="text-sm text-text-sub uppercase font-bold">To'g'ri</p>
              </div>
              <div className="bg-destructive/10 rounded-2xl p-4">
                <X className="size-8 text-destructive mx-auto mb-2" />
                <p className="text-3xl font-black text-destructive">{stats.incorrect}</p>
                <p className="text-sm text-text-sub uppercase font-bold">Noto'g'ri</p>
              </div>
              <div className="bg-category-orange/10 rounded-2xl p-4">
                <Flame className="size-8 text-category-orange mx-auto mb-2" />
                <p className="text-3xl font-black text-category-orange">{stats.longestCombo}</p>
                <p className="text-sm text-text-sub uppercase font-bold">Eng Uzun Seriya</p>
              </div>
              <div className="bg-category-yellow/10 rounded-2xl p-4">
                <Target className="size-8 text-category-yellow mx-auto mb-2" />
                <p className="text-3xl font-black text-category-yellow">{accuracy}%</p>
                <p className="text-sm text-text-sub uppercase font-bold">Aniqlik</p>
              </div>
            </div>

            <div className="bg-primary/10 rounded-2xl p-4 mb-8">
              <p className="text-sm text-text-sub uppercase font-bold mb-1">Olingan Ball</p>
              <p className="text-4xl font-black text-primary">+{stats.xp} XP</p>
            </div>

            <div className="flex gap-4">
              <Link to="/" className="flex-1">
                <Button variant="outline" size="lg" className="w-full font-bold uppercase">
                  <Home className="size-5 mr-2" />
                  Bosh Sahifa
                </Button>
              </Link>
              <Button 
                size="lg" 
                className="flex-1 font-bold uppercase"
                onClick={() => setGameState('ready')}
              >
                <RotateCcw className="size-5 mr-2" />
                Yana
              </Button>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
