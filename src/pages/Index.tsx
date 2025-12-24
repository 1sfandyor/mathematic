import { MainLayout } from '@/components/layout/MainLayout';
import { ChallengeCard } from '@/components/dashboard/ChallengeCard';
import { LeaderboardCard } from '@/components/dashboard/LeaderboardCard';
import { StatCard } from '@/components/dashboard/StatCard';
import { TrainingZoneCard } from '@/components/dashboard/TrainingZoneCard';
import { AchievementsSection } from '@/components/dashboard/AchievementsSection';
import { QuickTrainingCard } from '@/components/dashboard/QuickTrainingCard';
import { Flame, Star, Target, Medal, TrendingUp } from 'lucide-react';
import { MOCK_USER, MOCK_LEADERBOARD, TRAINING_ZONES } from '@/lib/constants';
import { Link } from 'react-router-dom';
const Index = () => {
  const accuracy = Math.round(MOCK_USER.correctAnswers / MOCK_USER.totalQuestions * 100);
  return <MainLayout>
      <div className="flex flex-col gap-8">
        {/* Hero Section - Challenge + Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="md:col-span-3 lg:col-span-2 my-[157px]">
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