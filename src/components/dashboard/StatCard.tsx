import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  colorClass: 'orange' | 'yellow' | 'purple' | 'blue';
}

const colorMap = {
  orange: {
    border: 'border-b-category-orange',
    bg: 'bg-category-orange/10',
    text: 'text-category-orange',
    hover: 'group-hover:opacity-10',
  },
  yellow: {
    border: 'border-b-category-yellow',
    bg: 'bg-category-yellow/10',
    text: 'text-category-yellow',
    hover: 'group-hover:opacity-10',
  },
  purple: {
    border: 'border-b-category-purple',
    bg: 'bg-category-purple/10',
    text: 'text-category-purple',
    hover: 'group-hover:opacity-10',
  },
  blue: {
    border: 'border-b-category-blue',
    bg: 'bg-category-blue/10',
    text: 'text-category-blue',
    hover: 'group-hover:opacity-10',
  },
};

export function StatCard({ icon: Icon, value, label, colorClass }: StatCardProps) {
  const colors = colorMap[colorClass];

  return (
    <div 
      className={cn(
        "bg-card p-5 rounded-2xl shadow-sm border-b-4 flex flex-col items-center justify-center gap-1",
        "group hover:-translate-y-1 transition-transform relative overflow-hidden cursor-pointer",
        colors.border
      )}
    >
      <div className={cn("absolute inset-0 opacity-0 transition-opacity", colors.bg, colors.hover)} />
      
      <div className={cn("p-3 rounded-full mb-2 relative z-10", colors.bg)}>
        <Icon className={cn("size-7", colors.text)} />
      </div>
      
      <p className="text-4xl font-black text-foreground relative z-10">
        {value}
      </p>
      
      <p className="text-xs font-bold text-text-sub uppercase tracking-wide relative z-10">
        {label}
      </p>
    </div>
  );
}
