import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function MainLayout({ children, hideFooter = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full px-4 md:px-8 xl:px-40 py-8 flex justify-center">
        <div className="max-w-[1400px] w-full">
          {children}
        </div>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
