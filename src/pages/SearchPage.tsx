import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, User, Target, Flame, Star, Calendar, TrendingUp, Trophy, ArrowLeft } from 'lucide-react';
import { MOCK_USER, MOCK_STUDENTS } from '@/lib/constants';
import type { User as UserType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<UserType | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setHasSearched(true);
    const query = searchQuery.toLowerCase().trim();
    
    const results = MOCK_STUDENTS.filter(student => 
      student.firstName.toLowerCase().includes(query) ||
      student.lastName.toLowerCase().includes(query) ||
      student.uniqueId.toLowerCase().includes(query) ||
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    setSelectedStudent(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
            O'quvchi Qidirish
          </h1>
          <p className="text-text-sub">
            Ota-ona yoki o'qituvchilar uchun. O'quvchining ismini yoki ID raqamini kiriting.
          </p>
        </div>

        {/* Search Box */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  placeholder="Ism yoki ID raqam (masalan: APEX-12345)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="h-12 px-6 font-bold uppercase"
              >
                Qidirish
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSearched && !selectedStudent && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-text-sub uppercase">
              Natijalar ({searchResults.length})
            </h2>
            
            {searchResults.length === 0 ? (
              <Card className="py-12 text-center">
                <p className="text-muted-foreground">
                  Hech qanday o'quvchi topilmadi. Iltimos, boshqa so'z bilan qidirib ko'ring.
                </p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {searchResults.map((student) => (
                  <Card 
                    key={student.id}
                    className="cursor-pointer hover:border-primary/50 transition-all"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div 
                        className="size-14 rounded-full bg-cover bg-center border-2 border-primary"
                        style={{ backgroundImage: `url('${student.avatarUrl}')` }}
                      />
                      <div className="flex-1">
                        <p className="font-bold text-lg">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-sm text-text-sub">
                          ID: {student.uniqueId} • {calculateAge(student.birthDate)} yosh
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{student.level}-daraja</p>
                        <p className="text-sm text-text-sub">{student.xp} XP</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Student Detail View */}
        {selectedStudent && (
          <div className="space-y-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedStudent(null)}
              className="font-bold uppercase"
            >
              <ArrowLeft className="size-4 mr-2" />
              Ortga
            </Button>

            {/* Student Profile Card */}
            <Card className="shadow-lg overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div 
                    className="size-24 rounded-full bg-cover bg-center border-4 border-primary"
                    style={{ backgroundImage: `url('${selectedStudent.avatarUrl}')` }}
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-black uppercase">
                      {selectedStudent.firstName} {selectedStudent.lastName}
                    </h2>
                    <p className="text-text-sub mb-2">
                      ID: {selectedStudent.uniqueId}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-4 text-category-blue" />
                        {calculateAge(selectedStudent.birthDate)} yosh
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="size-4 text-rank-gold" />
                        {selectedStudent.level}-daraja
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-b-4 border-category-orange">
                <CardContent className="pt-6 text-center">
                  <Flame className="size-8 text-category-orange mx-auto mb-2" />
                  <p className="text-3xl font-black">{selectedStudent.longestCombo}</p>
                  <p className="text-xs font-bold text-text-sub uppercase">Eng Uzun Seriya</p>
                </CardContent>
              </Card>

              <Card className="border-b-4 border-rank-gold">
                <CardContent className="pt-6 text-center">
                  <Star className="size-8 text-rank-gold mx-auto mb-2" />
                  <p className="text-3xl font-black">{selectedStudent.xp}</p>
                  <p className="text-xs font-bold text-text-sub uppercase">Jami Ball</p>
                </CardContent>
              </Card>

              <Card className="border-b-4 border-category-purple">
                <CardContent className="pt-6 text-center">
                  <Target className="size-8 text-category-purple mx-auto mb-2" />
                  <p className="text-3xl font-black">
                    {Math.round((selectedStudent.correctAnswers / selectedStudent.totalQuestions) * 100)}%
                  </p>
                  <p className="text-xs font-bold text-text-sub uppercase">Aniqlik</p>
                </CardContent>
              </Card>

              <Card className="border-b-4 border-category-blue">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="size-8 text-category-blue mx-auto mb-2" />
                  <p className="text-3xl font-black">{selectedStudent.totalQuestions}</p>
                  <p className="text-xs font-bold text-text-sub uppercase">Jami Savollar</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="uppercase tracking-tight">O'quv Xulosasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-sub">To'g'ri javoblar</span>
                  <span className="font-bold">{selectedStudent.correctAnswers} / {selectedStudent.totalQuestions}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-primary transition-all"
                    style={{ width: `${(selectedStudent.correctAnswers / selectedStudent.totalQuestions) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-text-sub">
                  <span>Ro'yxatga olingan: {new Date(selectedStudent.createdAt).toLocaleDateString('uz-UZ')}</span>
                  <span>Oxirgi faollik: {new Date(selectedStudent.lastActive).toLocaleDateString('uz-UZ')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SearchPage;
