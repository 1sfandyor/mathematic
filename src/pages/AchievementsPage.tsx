import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { ACHIEVEMENTS } from '@/lib/constants';
import { Star, Medal, Award, Brain, Zap, Trophy, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  Medal,
  Award,
  Brain,
  Zap,
  Star,
  Trophy,
};

export default function AchievementsPage() {
  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Yutuqlar
          </h1>
          <div className="bg-primary/10 px-4 py-2 rounded-full">
            <span className="font-bold text-primary">{unlockedCount} / {ACHIEVEMENTS.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement) => {
            const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Star;
            
            return (
              <Card 
                key={achievement.id}
                className={cn(
                  "p-6 text-center transition-all",
                  achievement.unlocked 
                    ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" 
                    : "opacity-60"
                )}
              >
                <div className={cn(
                  "size-20 rounded-full flex items-center justify-center mx-auto mb-4",
                  achievement.unlocked ? "bg-primary/10" : "bg-muted"
                )}>
                  {achievement.unlocked ? (
                    <Icon className={cn("size-10", achievement.color)} />
                  ) : (
                    <Lock className="size-10 text-muted-foreground" />
                  )}
                </div>
                
                <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                  {achievement.name}
                </h3>
                
                <p className="text-sm text-text-sub">
                  {achievement.unlocked ? "Ochildi! 🎉" : "Hali ochilmagan"}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
