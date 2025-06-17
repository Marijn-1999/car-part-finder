
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Loader2, MessageCircle, Search, Settings2 } from 'lucide-react';
import { AdvancedSearchModal } from './AdvancedSearchModal';

interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  message: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  activeTab: 'chat' | 'search';
  onTabChange: (tab: 'chat' | 'search') => void;
}

export const ChatInterface = ({ onSearch, isSearching, activeTab, onTabChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'assistant',
      message: 'Hallo! Ik ben je persoonlijke assistent voor klassieke auto-onderdelen. Vertel me gewoon wat je zoekt, bijvoorbeeld: "Ik zoek een carburateur voor een Ford Mustang 1967" of "Remschijven voor een Porsche 911 uit de jaren 70".',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      message: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    onSearch(currentMessage);

    // Add assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: messages.length + 2,
        type: 'assistant',
        message: `Ik zoek voor je naar "${currentMessage}". Ik ga verschillende platforms doorzoeken voor de beste resultaten...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);

    setCurrentMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickSearch = (query: string) => {
    setCurrentMessage(query);
    onSearch(query);
  };

  const handleTabClick = (tab: 'chat' | 'search') => {
    onTabChange(tab);
    console.log(`Switched to ${tab} mode`);
  };

  const handleAdvancedSearch = (searchData: any) => {
    const query = `${searchData.part} voor ${searchData.brand} ${searchData.model} ${searchData.year}`;
    setCurrentMessage(query);
    onSearch(query);
    setShowAdvancedSearch(false);
  };

  return (
    <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="bg-green-600 text-white p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🤖 AutoParts Assistent
        </h2>
        <p className="text-green-100 text-sm">Beschrijf wat je zoekt in gewone taal</p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                message.type === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className={`text-xs mb-1 ${
                message.type === 'user' ? 'text-green-100' : 'text-green-600'
              }`}>
                {message.type === 'user' ? 'Jij' : 'AutoParts Assistent'}
              </div>
              <p className="text-sm">{message.message}</p>
              <div className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-green-200' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString('nl-NL', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isSearching && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-xl max-w-[80%]">
              <div className="text-xs mb-1 text-green-600">AutoParts Assistent</div>
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Geweldig! Ik heb 3 resultaten gevonden. Hieronder zie je de beste opties, gesorteerd op prijs en relevantie. Wil je dat ik meer details geef over een specifiek onderdeel?</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2 mb-3">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Bijv: Ik zoek een carburateur voor een Ford Mustang 1967..."
            className="flex-1 border-green-300 focus:border-green-500"
            disabled={isSearching}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isSearching || !currentMessage.trim()}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => setShowAdvancedSearch(true)}
            variant="outline"
            className="text-green-600 border-green-300"
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick search suggestions */}
        <div className="mb-3 text-xs text-gray-600">
          <span className="font-medium">Snel zoeken:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs h-6"
              onClick={() => handleQuickSearch("Ford Mustang remmen")}
            >
              Ford Mustang remmen
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs h-6"
              onClick={() => handleQuickSearch("Porsche 911 onderdelen")}
            >
              Porsche 911 onderdelen
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs h-6"
              onClick={() => handleQuickSearch("VW Kever bumper")}
            >
              VW Kever bumper
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button 
            variant={activeTab === 'chat' ? 'default' : 'outline'} 
            size="sm" 
            className={activeTab === 'chat' ? 'bg-green-600 text-white' : 'text-green-600 border-green-300'}
            onClick={() => handleTabClick('chat')}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Chat
          </Button>
          <Button 
            variant={activeTab === 'search' ? 'default' : 'outline'} 
            size="sm" 
            className={activeTab === 'search' ? 'bg-green-600 text-white' : 'text-green-600 border-green-300'}
            onClick={() => handleTabClick('search')}
          >
            <Search className="h-4 w-4 mr-1" />
            Zoeken
          </Button>
        </div>
      </div>

      <AdvancedSearchModal
        isOpen={showAdvancedSearch}
        onClose={() => setShowAdvancedSearch(false)}
        onSearch={handleAdvancedSearch}
      />
    </Card>
  );
};
