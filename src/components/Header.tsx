
import { Button } from '@/components/ui/button';
import { Bell, Settings, User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚗</span>
          <div>
            <h1 className="text-xl font-bold">ClassicParts Finder</h1>
            <p className="text-green-100 text-sm">Vind jouw klassieke onderdelen</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
