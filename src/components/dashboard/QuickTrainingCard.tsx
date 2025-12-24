import { Rocket, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function QuickTrainingCard() {
  return (
    <div className="bg-gradient-to-br from-category-purple to-primary rounded-3xl p-6 text-center shadow-lg relative overflow-hidden group cursor-pointer">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPgo8L3N2Zz4=')] opacity-30" />
      
      <Rocket className="size-16 mb-2 mx-auto text-primary-foreground group-hover:scale-110 transition-transform duration-300 relative z-10" />
      
      <h3 className="text-3xl font-black mb-1 uppercase tracking-tight relative z-10 text-primary-foreground">
        Tez Mashq
      </h3>
      
      <p className="text-primary-foreground/80 text-sm mb-4 relative z-10">
        5 daqiqalik tez matematik sprint!
      </p>
      
      <Link to="/practice?mode=quick" className="block">
        <Button 
          variant="secondary"
          size="lg" 
          className="w-full font-bold py-6 uppercase tracking-tight relative z-10"
        >
          <Play className="size-5 mr-2" />
          Mashqni Boshlash
        </Button>
      </Link>
    </div>
  );
}
