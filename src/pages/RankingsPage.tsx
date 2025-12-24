import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Medal, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_LEADERBOARD, MOCK_USER } from '@/lib/constants';

const extendedLeaderboard = [
  ...MOCK_LEADERBOARD,
  { rank: 4, user: { name: `${MOCK_USER.firstName} ${MOCK_USER.lastName.charAt(0)}.`, avatarUrl: MOCK_USER.avatarUrl }, elo: 1095, change: 3 },
  { rank: 5, user: { name: "Javlon J.", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=John" }, elo: 1050, change: -2 },
  { rank: 6, user: { name: "Dilnoza D.", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Diana" }, elo: 1020, change: 0 },
  { rank: 7, user: { name: "Bobur B.", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bob" }, elo: 990, change: 1 },
  { rank: 8, user: { name: "Malika M.", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mary" }, elo: 965, change: -1 },
  { rank: 9, user: { name: "Sardor S.", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sam" }, elo: 940, change: 2 },
  { rank: 10, user: { name: "Gulnora G.", avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Gina" }, elo: 915, change: 0 },
];

const getRankStyle = (rank: number) => {
  if (rank === 1) return { bg: 'bg-rank-gold/20', border: 'border-rank-gold', text: 'text-rank-gold' };
  if (rank === 2) return { bg: 'bg-rank-silver/20', border: 'border-rank-silver', text: 'text-rank-silver' };
  if (rank === 3) return { bg: 'bg-rank-bronze/20', border: 'border-rank-bronze', text: 'text-rank-bronze' };
  return { bg: 'bg-muted', border: 'border-border', text: 'text-foreground' };
};

export default function RankingsPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Medal className="size-8 text-primary" />
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Reyting Jadvali
          </h1>
        </div>

        <div className="space-y-3">
          {extendedLeaderboard.map((entry) => {
            const style = getRankStyle(entry.rank);
            const isCurrentUser = entry.rank === 4;

            return (
              <Card 
                key={entry.rank}
                className={cn(
                  "p-4 flex items-center gap-4 transition-all hover:shadow-md",
                  isCurrentUser && "ring-2 ring-primary"
                )}
              >
                <div className={cn(
                  "size-10 rounded-full flex items-center justify-center font-black text-lg",
                  style.bg, style.text
                )}>
                  {entry.rank}
                </div>

                <div 
                  className={cn(
                    "size-12 rounded-full bg-cover bg-center border-2",
                    style.border
                  )}
                  style={{ backgroundImage: `url('${entry.user.avatarUrl}')` }}
                />

                <div className="flex-1">
                  <p className="font-bold text-lg">
                    {entry.user.name}
                    {isCurrentUser && <span className="text-primary ml-2">(Siz)</span>}
                  </p>
                  <p className="text-sm text-text-sub">{entry.elo} ELO</p>
                </div>

                <div className={cn(
                  "flex items-center gap-1 font-bold",
                  entry.change > 0 && "text-category-green",
                  entry.change < 0 && "text-destructive",
                  entry.change === 0 && "text-text-sub"
                )}>
                  {entry.change > 0 && <TrendingUp className="size-4" />}
                  {entry.change < 0 && <TrendingDown className="size-4" />}
                  {entry.change === 0 && <Minus className="size-4" />}
                  <span>{entry.change > 0 ? `+${entry.change}` : entry.change}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
