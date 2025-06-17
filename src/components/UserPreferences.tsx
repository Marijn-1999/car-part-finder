
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface UserPreferencesProps {
  onClose: () => void;
}

export const UserPreferences = ({ onClose }: UserPreferencesProps) => {
  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-green-800">Mijn voorkeuren</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="favorite-brand">Favoriete merk</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een merk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ford">Ford</SelectItem>
              <SelectItem value="porsche">Porsche</SelectItem>
              <SelectItem value="ferrari">Ferrari</SelectItem>
              <SelectItem value="volkswagen">Volkswagen</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="year-range">Bouwjaar voorkeur</Label>
          <div className="flex gap-2">
            <Input placeholder="Van jaar" />
            <Input placeholder="Tot jaar" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="location">Voorkeurslocatie</Label>
          <Input placeholder="bijv. Nederland, Amsterdam" />
        </div>
        
        <div>
          <Label htmlFor="max-price">Maximale prijs (€)</Label>
          <Input type="number" placeholder="500" />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">E-mail notificaties</Label>
          <Switch id="notifications" />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-search">Automatisch zoeken</Label>
          <Switch id="auto-search" />
        </div>
        
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Voorkeuren opslaan
        </Button>
      </div>
    </Card>
  );
};
