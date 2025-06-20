import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Loader2, Settings2 } from 'lucide-react';
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
}

async function fetchAssistantReply(messages: ChatMessage[]): Promise<string> {
  const modelUrl = 'https://api.awanllm.com/v1/chat/completions';

  const apiMessages = messages.map((msg) => ({
    role: msg.type === 'user' ? 'user' : 'assistant',
    content: msg.message,
  }));

  try {
    const res = await fetch(modelUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer c96134c7-c3c8-44f7-a56c-1a38eade2b87`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Meta-Llama-3-8B-Instruct',
        messages: [
          {
            role: 'system',
            content: `Je bent een expert in klassieke auto-onderdelen. 
Als iemand een bericht stuurt zoals:
"Ik zoek een carburateur voor een Ford Mustang uit 1967", interpreteer het dan als een zoekopdracht.
Geef een korte, duidelijke reactie en stel eventueel een vervolgvraag voor meer details.
Vat het verzoek samen in de vorm: Zoek: [onderdeel] voor [merk] [model] ([jaar])`,
          },
          ...apiMessages,
        ],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return `API error: ${errorText}`;
    }

    const data = await res.json();
    return data.choices[0]?.message.content || 'Geen antwoord ontvangen van het model.';
  } catch (error) {
    console.error('Fetch error:', error);
    return 'Fout bij het ophalen van het antwoord van het model.';
  }
}

export const ChatInterface = ({ onSearch, isSearching }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'assistant',
      message:
        'Hallo! Ik ben je persoonlijke assistent voor klassieke auto-onderdelen. Vertel me gewoon wat je zoekt, bijvoorbeeld: "Ik zoek een carburateur voor een Ford Mustang 1967" of "Remschijven voor een Porsche 911 uit de jaren 70".',
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      message: currentMessage,
      timestamp: new Date(),
    };

    // Voeg de gebruikersboodschap toe aan de chat
    setMessages((prev) => [...prev, userMessage]);
    onSearch(currentMessage);

    // Vraag het antwoord op met volledige chatgeschiedenis (inclusief net toegevoegde)
    const assistantReply = await fetchAssistantReply([...messages, userMessage]);

    const assistantMessage: ChatMessage = {
      id: messages.length + 2,
      type: 'assistant',
      message: assistantReply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
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
        <p className="text-green-100 text-sm">
          Beschrijf wat je zoekt in gewone taal
        </p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                message.type === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div
                className={`text-xs mb-1 ${
                  message.type === 'user' ? 'text-green-100' : 'text-green-600'
                }`}
              >
                {message.type === 'user' ? 'Jij' : 'AutoParts Assistent'}
              </div>
              <p className="text-sm">{message.message}</p>
              <div
                className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-green-200' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString('nl-NL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}

        {isSearching && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-xl max-w-[80%]">
              <div className="text-xs mb-1 text-green-600">
                AutoParts Assistent
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">
                  Geweldig! Ik heb 3 resultaten gevonden. Hieronder zie je de
                  beste opties, gesorteerd op prijs en relevantie. Wil je dat
                  ik meer details geef over een specifiek onderdeel?
                </span>
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
        <div className="text-xs text-gray-600">
          <span className="font-medium">Snel zoeken:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-6"
              onClick={() => handleQuickSearch('Ford Mustang remmen')}
            >
              Ford Mustang remmen
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-6"
              onClick={() => handleQuickSearch('Porsche 911 onderdelen')}
            >
              Porsche 911 onderdelen
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-6"
              onClick={() => handleQuickSearch('VW Kever bumper')}
            >
              VW Kever bumper
            </Button>
          </div>
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
