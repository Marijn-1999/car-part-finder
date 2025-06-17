
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Heart, Star } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  price: string;
  platform: string;
  location: string;
  condition: string;
  image: string;
  seller: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-green-800">Zoekresultaten:</h3>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {results.length} resultaten gevonden
        </Badge>
      </div>

      <div className="grid gap-4">
        {results.map((result, index) => (
          <Card key={result.id} className={`p-6 hover:shadow-lg transition-shadow ${
            index === 0 ? 'ring-2 ring-green-500 ring-opacity-50' : ''
          }`}>
            <div className="flex gap-4">
              <img 
                src={result.image} 
                alt={result.title}
                className="w-24 h-24 object-cover rounded-lg bg-gray-100"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-lg leading-tight">
                    {result.title}
                  </h4>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-2xl font-bold text-green-600">{result.price}</span>
                  <Badge variant="outline" className="text-xs">
                    {result.platform}
                  </Badge>
                  {index === 0 && (
                    <Badge className="bg-green-600 text-white text-xs">
                      Beste match
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div>
                    <span className="font-medium">Locatie:</span> {result.location}
                  </div>
                  <div>
                    <span className="font-medium">Conditie:</span> {result.condition}
                  </div>
                  <div>
                    <span className="font-medium">Verkoper:</span> {result.seller}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <Star className="h-3 w-3 text-gray-300" />
                    <span className="text-xs ml-1">4.2</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Bekijk op {result.platform}
                  </Button>
                  <Button variant="outline" className="text-green-600 border-green-300">
                    Meer details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <Button variant="outline" className="text-green-600 border-green-300">
          Meer resultaten laden
        </Button>
      </div>
    </div>
  );
};
