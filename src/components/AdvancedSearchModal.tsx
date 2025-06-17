
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Settings2, Search } from 'lucide-react';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchData: any) => void;
}

export const AdvancedSearchModal = ({ isOpen, onClose, onSearch }: AdvancedSearchModalProps) => {
  const [searchData, setSearchData] = useState({
    part: '',
    brand: '',
    model: '',
    year: '',
    condition: '',
    maxPrice: '',
    location: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    onSearch(searchData);
    // Reset form
    setSearchData({
      part: '',
      brand: '',
      model: '',
      year: '',
      condition: '',
      maxPrice: '',
      location: '',
      description: ''
    });
  };

  const popularBrands = ['Ford', 'Porsche', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Jaguar', 'Ferrari', 'Aston Martin'];
  const partCategories = ['Motor', 'Transmissie', 'Remmen', 'Carburateur', 'Uitlaat', 'Interieur', 'Exterieur', 'Elektrisch'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-800">
            <Settings2 className="h-5 w-5" />
            Geadvanceerd Zoeken
          </DialogTitle>
          <DialogDescription>
            Specificeer je zoekopdracht voor betere resultaten
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Auto Details */}
          <Card className="p-4">
            <h3 className="font-semibold text-green-800 mb-3">Auto Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Merk</Label>
                <Input
                  id="brand"
                  value={searchData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Bijv. Ford, Porsche..."
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {popularBrands.slice(0, 4).map(brand => (
                    <Button
                      key={brand}
                      size="sm"
                      variant="outline"
                      className="text-xs h-6"
                      onClick={() => handleInputChange('brand', brand)}
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={searchData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="Bijv. Mustang, 911..."
                />
              </div>
              <div>
                <Label htmlFor="year">Bouwjaar</Label>
                <Input
                  id="year"
                  value={searchData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  placeholder="Bijv. 1967, 1970-1975..."
                />
              </div>
            </div>
          </Card>

          {/* Onderdeel Details */}
          <Card className="p-4">
            <h3 className="font-semibold text-green-800 mb-3">Onderdeel Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="part">Onderdeel</Label>
                <Input
                  id="part"
                  value={searchData.part}
                  onChange={(e) => handleInputChange('part', e.target.value)}
                  placeholder="Bijv. carburateur, remschijven..."
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {partCategories.slice(0, 4).map(part => (
                    <Button
                      key={part}
                      size="sm"
                      variant="outline"
                      className="text-xs h-6"
                      onClick={() => handleInputChange('part', part)}
                    >
                      {part}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="condition">Conditie</Label>
                <div className="flex gap-2 mt-1">
                  {['Nieuw', 'Gebruikt', 'Gerestaureerd'].map(condition => (
                    <Button
                      key={condition}
                      size="sm"
                      variant={searchData.condition === condition ? 'default' : 'outline'}
                      className={searchData.condition === condition ? 'bg-green-600 text-white' : 'text-green-600 border-green-300'}
                      onClick={() => handleInputChange('condition', condition)}
                    >
                      {condition}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Aanvullende beschrijving</Label>
                <Textarea
                  id="description"
                  value={searchData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Bijv. origineel onderdeel van Holley, moet compatibel zijn met..."
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Zoekfilters */}
          <Card className="p-4">
            <h3 className="font-semibold text-green-800 mb-3">Zoekfilters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxPrice">Maximale prijs (€)</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  value={searchData.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                  placeholder="Bijv. 500"
                />
              </div>
              <div>
                <Label htmlFor="location">Voorkeur locatie</Label>
                <Input
                  id="location"
                  value={searchData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Bijv. Nederland, Europa..."
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button 
              onClick={handleSearch}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Zoeken
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="text-green-600 border-green-300"
            >
              Annuleren
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
