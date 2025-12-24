import { Rocket, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export function QuickTrainingCard() {
  return (
    <Card className="p-6 text-center border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group">
      <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Rocket className="size-8 text-primary" />
      </div>
      
      <h3 className="text-2xl font-black mb-1 uppercase tracking-tight">
        Tez Mashq
      </h3>
      
      <p className="text-text-sub text-sm mb-4">
        5 daqiqalik tez matematik sprint!
      </p>
      
      <Link to="/practice?mode=quick" className="block">
        <Button 
          size="lg" 
          className="w-full font-bold py-6 uppercase tracking-tight"
        >
          <Play className="size-5 mr-2" />
          Mashqni Boshlash
        </Button>
      </Link>
    </Card>
  );
}
