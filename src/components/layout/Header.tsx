import { Trophy, LayoutDashboard, Star, Medal, Menu, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MOCK_USER } from '@/lib/constants';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { path: '/', label: 'Boshqaruv', icon: LayoutDashboard },
  { path: '/achievements', label: 'Yutuqlar', icon: Star },
  { path: '/rankings', label: 'Reyting', icon: Medal },
  { path: '/search', label: 'Qidirish', icon: Search },
];

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-card/90 backdrop-blur-md border-b border-border">
      <div className="px-4 md:px-8 xl:px-40 flex justify-center py-3">
        <div className="flex items-center justify-between w-full max-w-[1400px]">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-foreground group cursor-pointer"
          >
            <div className="flex items-center justify-center size-10 bg-primary/20 rounded-xl group-hover:bg-primary transition-colors">
              <Trophy className="size-5 text-primary group-hover:text-primary-foreground" />
            </div>
            <h2 className="text-xl font-black tracking-tighter uppercase hidden sm:block">
              Mental Arifmetika
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-6 bg-background px-6 py-2 rounded-full border border-border">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-bold hover:text-primary transition-colors flex items-center gap-2 uppercase",
                    location.pathname === item.path && "text-primary"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden lg:block">
                <p className="text-xs font-bold uppercase">
                  {MOCK_USER.firstName} {MOCK_USER.lastName}
                </p>
                <p className="text-[10px] text-text-sub uppercase tracking-wider font-bold">
                  Daraja: {MOCK_USER.level}
                </p>
              </div>
              <Link to="/profile">
                <div 
                  className="size-10 rounded-full bg-cover bg-center border-2 border-primary cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundImage: `url('${MOCK_USER.avatarUrl}')` }}
                />
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                {/* User Info */}
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div 
                    className="size-12 rounded-full bg-cover bg-center border-2 border-primary"
                    style={{ backgroundImage: `url('${MOCK_USER.avatarUrl}')` }}
                  />
                  <div>
                    <p className="font-bold">{MOCK_USER.firstName} {MOCK_USER.lastName}</p>
                    <p className="text-sm text-text-sub">Daraja: {MOCK_USER.level}</p>
                  </div>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors",
                        location.pathname === item.path 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-accent"
                      )}
                    >
                      <item.icon className="size-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
