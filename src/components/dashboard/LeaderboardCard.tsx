import { Trophy, RefreshCw, TrendingUp, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LeaderboardEntry } from '@/lib/types';
import { MOCK_USER } from '@/lib/constants';

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  onRefresh?: () => void;
}

const rankStyles = {
  1: {
    bg: 'bg-gradient-to-r from-rank-gold/20 to-transparent',
    border: 'border-rank-gold/40',
    text: 'text-rank-gold',
    avatarBorder: 'border-rank-gold',
  },
  2: {
    bg: 'bg-gradient-to-r from-rank-silver/20 to-transparent',
    border: 'border-rank-silver/40',
    text: 'text-rank-silver',
    avatarBorder: 'border-rank-silver',
  },
  3: {
    bg: 'bg-gradient-to-r from-rank-bronze/20 to-transparent',
    border: 'border-rank-bronze/40',
    text: 'text-rank-bronze',
    avatarBorder: 'border-rank-bronze',
  },
};

export function LeaderboardCard({ entries, onRefresh }: LeaderboardCardProps) {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-xl flex flex-col abstract-bg-grid relative overflow-hidden h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-30 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="font-black text-2xl uppercase tracking-tighter flex items-center gap-2">
          <Trophy className="size-7 text-primary" />
          Jonli Reyting
        </h3>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onRefresh}
          className="text-primary hover:bg-primary/10"
        >
          <RefreshCw className="size-5" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-4 relative z-10">
        {entries.map((entry) => {
          const style = rankStyles[entry.rank as keyof typeof rankStyles];
          return (
            <div 
              key={entry.rank}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl border hover:brightness-105 transition-all cursor-pointer",
                style?.bg,
                style?.border
              )}
            >
              <div className={cn("font-black w-6 text-xl text-center", style?.text)}>
                {entry.rank}
              </div>
              
              <div 
                className={cn(
                  "size-12 rounded-full bg-cover bg-center border-2",
                  style?.avatarBorder
                )}
                style={{ backgroundImage: `url('${entry.user.avatarUrl}')` }}
              />
              
              <div className="flex-1">
                <p className="text-lg font-bold uppercase tracking-tight">{entry.user.name}</p>
                <p className="text-sm text-text-sub font-medium">{entry.elo} ELO</p>
              </div>
              
              <div className="flex items-center gap-1">
                <Medal className={cn("size-6", style?.text)} />
                <span className={cn("text-lg font-bold", style?.text)}>+{entry.change}</span>
              </div>
            </div>
          );
        })}
        
        {/* Current User */}
        <div className="mt-2 pt-4 border-t border-dashed border-border flex items-center gap-4 p-3 rounded-xl bg-primary/10">
          <div className="font-black text-primary w-6 text-xl text-center">4</div>
          
          <div 
            className="size-12 rounded-full bg-cover bg-center border-2 border-primary"
            style={{ backgroundImage: `url('${MOCK_USER.avatarUrl}')` }}
          />
          
          <div className="flex-1">
            <p className="text-lg font-bold uppercase tracking-tight">
              Siz ({MOCK_USER.firstName})
            </p>
            <p className="text-sm text-text-sub font-medium">1095 ELO</p>
          </div>
          
          <div className="flex items-center gap-1">
            <TrendingUp className="size-6 text-primary" />
            <span className="text-lg font-bold text-primary">+3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
