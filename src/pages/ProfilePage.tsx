import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { MOCK_USER, ACHIEVEMENTS } from '@/lib/constants';
import { User, Calendar, Award, Target, Flame, Zap, Clock, Hash } from 'lucide-react';

export default function ProfilePage() {
  const accuracy = Math.round((MOCK_USER.correctAnswers / MOCK_USER.totalQuestions) * 100);
  const birthDate = new Date(MOCK_USER.birthDate);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8">
          Mening Profilim
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1 p-6 text-center">
            <div 
              className="size-32 rounded-full bg-cover bg-center border-4 border-primary mx-auto mb-4"
              style={{ backgroundImage: `url('${MOCK_USER.avatarUrl}')` }}
            />
            <h2 className="text-2xl font-black">{MOCK_USER.firstName} {MOCK_USER.lastName}</h2>
            <p className="text-text-sub mb-4">{age} yosh</p>
            
            <div className="bg-primary/10 rounded-xl p-4">
              <p className="text-sm text-text-sub uppercase font-bold">Unikal ID</p>
              <p className="text-lg font-black text-primary">{MOCK_USER.uniqueId}</p>
            </div>
          </Card>

          {/* Stats Card */}
          <Card className="md:col-span-2 p-6">
            <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
              <Award className="size-6 text-primary" />
              Statistika
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-muted rounded-xl p-4 text-center">
                <Hash className="size-6 text-category-blue mx-auto mb-2" />
                <p className="text-2xl font-black">{MOCK_USER.level}</p>
                <p className="text-xs text-text-sub uppercase font-bold">Daraja</p>
              </div>
              <div className="bg-muted rounded-xl p-4 text-center">
                <Zap className="size-6 text-category-yellow mx-auto mb-2" />
                <p className="text-2xl font-black">{MOCK_USER.xp}</p>
                <p className="text-xs text-text-sub uppercase font-bold">Jami Ball</p>
              </div>
              <div className="bg-muted rounded-xl p-4 text-center">
                <Flame className="size-6 text-category-orange mx-auto mb-2" />
                <p className="text-2xl font-black">{MOCK_USER.longestCombo}</p>
                <p className="text-xs text-text-sub uppercase font-bold">Eng Uzun Seriya</p>
              </div>
              <div className="bg-muted rounded-xl p-4 text-center">
                <Target className="size-6 text-category-purple mx-auto mb-2" />
                <p className="text-2xl font-black">{accuracy}%</p>
                <p className="text-xs text-text-sub uppercase font-bold">Aniqlik</p>
              </div>
              <div className="bg-muted rounded-xl p-4 text-center">
                <User className="size-6 text-category-green mx-auto mb-2" />
                <p className="text-2xl font-black">{MOCK_USER.totalQuestions}</p>
                <p className="text-xs text-text-sub uppercase font-bold">Jami Misollar</p>
              </div>
              <div className="bg-muted rounded-xl p-4 text-center">
                <Calendar className="size-6 text-category-red mx-auto mb-2" />
                <p className="text-2xl font-black">{MOCK_USER.correctAnswers}</p>
                <p className="text-xs text-text-sub uppercase font-bold">To'g'ri Javoblar</p>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="md:col-span-3 p-6">
            <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
              <Award className="size-6 text-category-purple" />
              Yutuqlar
            </h3>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {ACHIEVEMENTS.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`bg-muted rounded-xl p-4 text-center ${!achievement.unlocked && 'opacity-50'}`}
                >
                  <div className={`size-12 rounded-full ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted-foreground/20'} flex items-center justify-center mx-auto mb-2`}>
                    <span className={`text-2xl ${achievement.color}`}>🏆</span>
                  </div>
                  <p className="text-xs font-bold uppercase">{achievement.name}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
