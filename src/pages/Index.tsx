import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { SearchResults } from '@/components/SearchResults';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UserPreferences } from '@/components/UserPreferences';
import { NotificationsPanel } from '@/components/NotificationsPanel';
import { PartDetailsModal } from '@/components/PartDetailsModal';
import { Settings, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: "Originele Carburateur Ford Mustang 1967 - Holley 4150",
          price: "€485",
          platform: "Marktplaats",
          location: "Amsterdam, Noord-Holland",
          condition: "Gebruikt - Goede staat",
          image: "/placeholder.svg",
          seller: "ClassicCarParts_NL"
        },
        {
          id: 2,
          title: "Ford Mustang 67 Carburateur - Gerestaureerd",
          price: "€650",
          platform: "eBay",
          location: "Duitsland",
          condition: "Gerestaureerd",
          image: "/placeholder.svg",
          seller: "VintageAutoTeile"
        },
        {
          id: 3,
          title: "Mustang 1967 Carburetor - OEM Replacement",
          price: "€390",
          platform: "AutoScout24",
          location: "België",
          condition: "Nieuw - Aftermarket",
          image: "/placeholder.svg",
          seller: "EuroClassicParts"
        }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleExternalLink = (platform: string) => {
    const platformUrls = {
      'Marktplaats': 'https://www.marktplaats.nl',
      'eBay': 'https://www.ebay.com',
      'AutoScout24': 'https://www.autoscout24.com',
      'Classic & Sports Car': 'https://www.classicdriver.com',
      'Oldtimerteile': 'https://www.oldtimerteile.de'
    };
    
    const url = platformUrls[platform as keyof typeof platformUrls] || 'https://www.google.com';
    window.open(url, '_blank');
  };

  const handleShowDetails = (partId: number) => {
    setSelectedPartId(partId);
  };

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleSettings = () => {
    setShowPreferences(!showPreferences);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header 
        onNotifications={handleNotifications}
        onProfile={handleProfile}
        onSettings={handleSettings}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4 flex items-center justify-center gap-3">
            🚗 ClassicParts Finder 🔧
          </h1>
          <p className="text-lg text-green-700 mb-2">
            Je persoonlijke AI-assistent voor klassieke auto-onderdelen
          </p>
          <p className="text-green-600 flex items-center justify-center gap-2">
            🔍 Slim • Snel • Betrouwbaar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with preferences */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-green-800">Snelle toegang</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSettings}
                  className="text-green-600 hover:text-green-800"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm"
                  onClick={handleNotifications}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Meldingen
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm"
                  onClick={() => setShowPreferences(!showPreferences)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Mijn voorkeuren
                </Button>
              </div>
            </div>
            
            {showPreferences && (
              <UserPreferences onClose={() => setShowPreferences(false)} />
            )}
            
            {showNotifications && (
              <NotificationsPanel onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <ChatInterface 
              onSearch={handleSearch} 
              isSearching={isSearching}
            />
            
            {searchResults.length > 0 && (
              <div className="mt-8">
                <SearchResults 
                  results={searchResults}
                  onExternalLink={handleExternalLink}
                  onShowDetails={handleShowDetails}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedPartId && (
        <PartDetailsModal
          partId={selectedPartId}
          onClose={() => setSelectedPartId(null)}
          onExternalLink={handleExternalLink}
        />
      )}

      <Footer />
    </div>
  );
};

export default Index;
