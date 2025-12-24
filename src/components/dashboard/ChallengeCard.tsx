import { Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ChallengeCardProps {
  title: string;
  description: string;
  timeRemaining: string;
}

export function ChallengeCard({ title, description, timeRemaining }: ChallengeCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-card shadow-xl group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-50 blur-xl" />
      
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full">
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-destructive/10 text-destructive rounded-full w-fit mb-3 uppercase font-bold text-xs">
            <Timer className="size-4" />
            <span className="tracking-wide">{timeRemaining} qoldi</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight uppercase tracking-tighter">
            {title}
          </h1>
          
          <p className="text-text-sub text-lg font-medium mt-1">
            {description}
          </p>
        </div>
        
        <Link to="/practice">
          <Button 
            size="lg" 
            className="w-full md:w-auto bg-primary text-primary-foreground font-black text-lg py-6 px-8 rounded-xl hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all uppercase tracking-tight"
          >
            <Zap className="size-5 mr-2" />
            Mashqni Boshlash
          </Button>
        </Link>
      </div>
    </div>
  );
}
