import { MainLayout } from '@/components/layout/MainLayout';
import { TrainingZoneCard } from '@/components/dashboard/TrainingZoneCard';
import { TRAINING_ZONES, MOCK_USER } from '@/lib/constants';
import { TrendingUp, Lock, CheckCircle, Play, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const categoryLabels = {
  addition: { name: "Qo'shish", icon: '+' },
  subtraction: { name: 'Ayirish', icon: '−' },
  multiplication: { name: "Ko'paytirish", icon: '×' },
  division: { name: "Bo'lish", icon: '÷' },
};

const ZonesPage = () => {
  const userLevel = MOCK_USER.level;

  const getZonesByCategory = (category: string) => {
    return TRAINING_ZONES.filter(z => z.category === category);
  };

  const getCategoryProgress = (category: string) => {
    const zones = getZonesByCategory(category);
    const totalProgress = zones.reduce((sum, z) => sum + z.progress, 0);
    return Math.round(totalProgress / zones.length);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight flex items-center gap-3">
              <TrendingUp className="size-8 text-primary" />
              Mashq Zonalari
            </h1>
            <p className="text-text-sub mt-1">
              Sizning darajangiz: <span className="font-bold text-primary">{userLevel}-daraja</span>
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1">
            <TabsTrigger value="all" className="font-bold uppercase py-3">
              Barchasi
            </TabsTrigger>
            {Object.entries(categoryLabels).map(([key, { name, icon }]) => (
              <TabsTrigger key={key} value={key} className="font-bold uppercase py-3">
                <span className="mr-1">{icon}</span> {name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All Zones */}
          <TabsContent value="all" className="mt-6">
            <div className="space-y-8">
              {Object.entries(categoryLabels).map(([category, { name, icon }]) => (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black">{icon}</span>
                    <h2 className="text-xl font-black uppercase tracking-tight">{name}</h2>
                    <Badge variant="secondary" className="ml-2">
                      {getCategoryProgress(category)}% tugallandi
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getZonesByCategory(category).map((zone) => (
                      <TrainingZoneCard key={zone.id} zone={zone} showLevelInfo />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Category-specific tabs */}
          {Object.entries(categoryLabels).map(([category, { name }]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getZonesByCategory(category).map((zone) => (
                  <TrainingZoneCard key={zone.id} zone={zone} showLevelInfo />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Level Progress Info */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-bold uppercase mb-4">Daraja Talablari</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <div 
                key={level}
                className={`flex items-center gap-2 p-3 rounded-xl ${
                  level <= userLevel 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {level <= userLevel ? (
                  <CheckCircle className="size-4" />
                ) : (
                  <Lock className="size-4" />
                )}
                <span className="font-bold">{level}-daraja</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ZonesPage;
