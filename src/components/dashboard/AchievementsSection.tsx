import { Star, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AchievementBadge } from './AchievementBadge';
import { ACHIEVEMENTS } from '@/lib/constants';

export function AchievementsSection() {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-xl flex flex-col abstract-bg-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-category-purple/5 via-transparent to-category-purple/5 opacity-30 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="font-black text-2xl uppercase tracking-tighter flex items-center gap-2">
          <Star className="size-7 text-category-purple" />
          Mening Yutuqlarim
        </h3>
        <Link 
          to="/achievements" 
          className="text-xs font-bold text-primary uppercase hover:underline flex items-center gap-1"
        >
          Barchasi <LinkIcon className="size-3" />
        </Link>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 relative z-10">
        {ACHIEVEMENTS.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
