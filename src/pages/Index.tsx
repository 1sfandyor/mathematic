import { MainLayout } from '@/components/layout/MainLayout';
import { ChallengeCard } from '@/components/dashboard/ChallengeCard';
import { LeaderboardCard } from '@/components/dashboard/LeaderboardCard';
import { StatCard } from '@/components/dashboard/StatCard';
import { TrainingZoneCard } from '@/components/dashboard/TrainingZoneCard';
import { AchievementsSection } from '@/components/dashboard/AchievementsSection';
import { QuickTrainingCard } from '@/components/dashboard/QuickTrainingCard';
import { Flame, Star, Target, Medal, TrendingUp, Sun, Sunset, Moon } from 'lucide-react';
import { MOCK_USER, MOCK_LEADERBOARD, TRAINING_ZONES } from '@/lib/constants';
import { Link, useNavigate } from 'react-router-dom';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { text: 'Xayrli tong', icon: Sun, color: 'text-yellow-400' };
  } else if (hour >= 12 && hour < 18) {
    return { text: 'Xayrli kun', icon: Sun, color: 'text-yellow-400' };
  } else if (hour >= 18 && hour < 21) {
    return { text: 'Xayrli kech', icon: Sunset, color: 'text-orange-400' };
  } else {
    return { text: 'Xayrli tun', icon: Moon, color: 'text-indigo-400' };
  }
};

const Index = () => {
  const navigate = useNavigate();
  const accuracy = Math.round(MOCK_USER.correctAnswers / MOCK_USER.totalQuestions * 100);
  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;
  return <MainLayout>
      <div className="flex flex-col gap-8">
        {/* Greeting Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <GreetingIcon className={`size-8 ${greeting.color}`} />
              <span className="text-text-sub font-bold uppercase tracking-wider text-sm">{greeting.text}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
              Matematikaga tayyor, <span className="text-primary underline decoration-4 underline-offset-4 decoration-foreground/10">{MOCK_USER.firstName}?</span>
            </h1>
            <p className="text-text-sub text-lg font-medium mt-1">
              Bugun rekordingizni yangilash uchun <span className="text-yellow-500 font-bold">5 ta yulduz</span> yig'ishingiz kerak!
            </p>
          </div>
          <button 
            onClick={() => navigate('/practice?mode=blitz')}
            className="bg-card border-2 border-primary text-foreground font-bold py-3 px-6 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 shadow-sm"
          >
            <Flame className="size-5" />
            Kunlik Blitz
          </button>
        </div>

        {/* Hero Section - Challenge + Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="md:col-span-3 lg:col-span-2">
            <ChallengeCard title="Apex Musobaqa: Tezkor Tenglamalar" description="Chaqmoq tezligi va mukammal aniqlik bilan reytingda yetakchilik qiling. Har 24 soatda yangi musobaqa." timeRemaining="04:32:18" />
          </div>
          
          <div className="md:col-span-3 lg:col-span-2">
            <LeaderboardCard entries={MOCK_LEADERBOARD} />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Flame} value={MOCK_USER.longestCombo} label="Eng Uzun Seriya" colorClass="orange" />
          <StatCard icon={Star} value={MOCK_USER.xp} label="Jami Ball" colorClass="yellow" />
          <StatCard icon={Target} value={`${accuracy}%`} label="O'rtacha Aniqlik" colorClass="purple" />
          <StatCard icon={Medal} value={`${MOCK_USER.level}-daraja`} label="Daraja" colorClass="blue" />
        </div>

        {/* Training Zones */}
        <div>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <TrendingUp className="size-7 text-primary" />
              Mashq Zonalari
            </h2>
            <Link to="/zones" className="text-sm font-bold text-text-sub hover:text-primary transition-colors uppercase">
              Barcha Zonalar
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINING_ZONES.map(zone => <TrainingZoneCard key={zone.id} zone={zone} />)}
          </div>
        </div>

        {/* Achievements + Quick Training */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <AchievementsSection />
          </div>
          <div className="lg:col-span-2">
            <QuickTrainingCard />
          </div>
        </div>
      </div>
    </MainLayout>;
};
export default Index;