import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-8xl font-black text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Sahifa Topilmadi</h2>
        <p className="text-text-sub mb-8">
          Kechirasiz, siz qidirayotgan sahifa mavjud emas.
        </p>
        <Link to="/">
          <Button size="lg" className="font-bold uppercase">
            <Home className="size-5 mr-2" />
            Bosh Sahifa
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
