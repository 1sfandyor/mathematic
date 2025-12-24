import { Star, Medal, Award, Brain, Zap, Trophy, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Achievement } from '@/lib/types';

interface AchievementBadgeProps {
  achievement: Achievement;
}

const iconMap = {
  Medal,
  Award,
  Brain,
  Zap,
  Star,
  Trophy,
};

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Star;

  return (
    <div 
      className={cn(
        "aspect-square bg-background rounded-xl flex flex-col items-center justify-center p-2 gap-1 transition-colors group cursor-pointer border border-transparent",
        achievement.unlocked 
          ? "hover:bg-primary/5 hover:border-primary/30" 
          : "opacity-50"
      )}
    >
      {achievement.unlocked ? (
        <>
          <Icon className={cn("size-7 group-hover:scale-110 transition-transform", achievement.color)} />
          <span className="text-[10px] text-center font-bold leading-tight uppercase">
            {achievement.name}
          </span>
        </>
      ) : (
        <Lock className="size-7 text-muted-foreground" />
      )}
    </div>
  );
}
