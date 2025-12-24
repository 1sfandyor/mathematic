import { Plus, Minus, X, Divide, CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TrainingZone } from '@/lib/types';
import { Link } from 'react-router-dom';

interface TrainingZoneCardProps {
  zone: TrainingZone;
  showLevelInfo?: boolean;
}

const iconMap = {
  Plus,
  Minus,
  X,
  Divide,
};

const colorMap = {
  green: {
    bar: 'bg-category-green',
    iconBg: 'bg-category-green/10',
    iconText: 'text-category-green',
    progressText: 'text-category-green',
  },
  blue: {
    bar: 'bg-category-blue',
    iconBg: 'bg-category-blue/10',
    iconText: 'text-category-blue',
    progressText: 'text-category-blue',
  },
  red: {
    bar: 'bg-category-red',
    iconBg: 'bg-category-red/10',
    iconText: 'text-category-red',
    progressText: 'text-category-red',
  },
  gray: {
    bar: 'bg-muted-foreground/30',
    iconBg: 'bg-muted',
    iconText: 'text-muted-foreground',
    progressText: 'text-muted-foreground',
  },
};

const statusLabels = {
  mastered: { text: "O'zlashtirildi!", icon: CheckCircle },
  'in-progress': { text: "Davom etmoqda", badge: true, badgeColor: 'bg-category-blue/10 text-category-blue' },
  'next-up': { text: "Keyingi", badge: true, badgeColor: 'bg-category-red/10 text-category-red' },
  locked: { text: "Qulflangan", icon: Lock },
};

export function TrainingZoneCard({ zone, showLevelInfo = false }: TrainingZoneCardProps) {
  const Icon = iconMap[zone.icon as keyof typeof iconMap] || Plus;
  const colors = colorMap[zone.color];
  const status = statusLabels[zone.status];
  const isLocked = zone.status === 'locked';
  const requiredLevel = zone.requiredLevel;

  const content = (
    <div 
      className={cn(
        "bg-card p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/50 transition-all relative overflow-hidden group h-full flex flex-col",
        isLocked && "opacity-90",
        !isLocked && "cursor-pointer"
      )}
    >
      <div className={cn("absolute top-0 left-0 w-full h-1", colors.bar)} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "size-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
          colors.iconBg
        )}>
          <Icon className={cn("size-7", colors.iconText)} />
        </div>
        
        {'icon' in status && status.icon ? (
          <status.icon className={cn("size-5", colors.iconText)} />
        ) : 'badge' in status && status.badge ? (
          <span className={cn("px-2 py-1 text-[10px] font-bold uppercase rounded", status.badgeColor)}>
            {status.text}
          </span>
        ) : null}
      </div>
      
      <h3 className={cn(
        "text-lg font-black mb-1 uppercase tracking-tight",
        isLocked && "text-muted-foreground"
      )}>
        {zone.title}
      </h3>
      
      <p className="text-text-sub text-sm mb-4 flex-1">{zone.description}</p>
      
      {showLevelInfo && (
        <p className={cn(
          "text-xs font-bold mb-3 uppercase",
          isLocked ? "text-muted-foreground" : "text-primary"
        )}>
          {isLocked ? `${requiredLevel}-daraja kerak` : `${requiredLevel}-daraja`}
        </p>
      )}
      
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={cn("h-2 rounded-full transition-all", colors.bar)}
          style={{ width: `${zone.progress}%` }}
        />
      </div>
      
      <p className={cn("text-right text-xs font-bold mt-1 uppercase", colors.progressText)}>
        {zone.status === 'mastered' ? "O'zlashtirildi!" : 
         zone.status === 'locked' ? "Qulflangan" : 
         `${zone.progress}% tugallandi`}
      </p>
    </div>
  );

  if (isLocked) {
    return content;
  }

  return (
    <Link to={`/practice?zone=${zone.id}`}>
      {content}
    </Link>
  );
}
