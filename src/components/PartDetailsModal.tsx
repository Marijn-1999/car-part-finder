
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ExternalLink, Heart, Star, MapPin, Calendar, User } from 'lucide-react';

interface PartDetailsModalProps {
  partId: number;
  onClose: () => void;
  onExternalLink: (platform: string) => void;
}

export const PartDetailsModal = ({ partId, onClose, onExternalLink }: PartDetailsModalProps) => {
  // Mock data - in real app this would come from API
  const partDetails = {
    id: partId,
    title: "Originele Carburateur Ford Mustang 1967 - Holley 4150",
    price: "€485",
    platform: "Marktplaats",
    location: "Amsterdam, Noord-Holland",
    condition: "Gebruikt - Goede staat",
    image: "/placeholder.svg",
    seller: "ClassicCarParts_NL",
    description: "Originele Holley 4150 carburateur voor Ford Mustang 1967. In zeer goede staat, recent gereviseerd. Alle onderdelen zijn origineel en authentiek. Perfect voor restauratie projecten.",
    specs: {
      merk: "Ford",
      model: "Mustang",
      jaar: "1967",
      onderdeel: "Carburateur",
      conditie: "Gebruikt - Goede staat",
      garantie: "3 maanden"
    },
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    sellerInfo: {
      name: "ClassicCarParts_NL",
      rating: 4.8,
      reviews: 234,
      memberSince: "2019"
    }
  };

  const handleContactSeller = () => {
    console.log('Contacting seller...');
  };

  const handleAddToWishlist = () => {
    console.log('Added to wishlist');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="p-0 border-0">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-green-800">Onderdeel Details</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Images */}
              <div>
                <div className="mb-4">
                  <img 
                    src={partDetails.image} 
                    alt={partDetails.title}
                    className="w-full h-64 object-cover rounded-lg bg-gray-100"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {partDetails.images.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`${partDetails.title} ${index + 1}`}
                      className="w-full h-20 object-cover rounded bg-gray-100 cursor-pointer hover:opacity-75"
                    />
                  ))}
                </div>
              </div>
              
              {/* Details */}
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{partDetails.title}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl font-bold text-green-600">{partDetails.price}</span>
                    <Badge variant="outline">{partDetails.platform}</Badge>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{partDetails.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Merk:</span> {partDetails.specs.merk}
                    </div>
                    <div>
                      <span className="font-medium">Model:</span> {partDetails.specs.model}
                    </div>
                    <div>
                      <span className="font-medium">Jaar:</span> {partDetails.specs.jaar}
                    </div>
                    <div>
                      <span className="font-medium">Conditie:</span> {partDetails.specs.conditie}
                    </div>
                    <div>
                      <span className="font-medium">Garantie:</span> {partDetails.specs.garantie}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Verkoper informatie</h4>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-8 w-8 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium">{partDetails.sellerInfo.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{partDetails.sellerInfo.rating}</span>
                          <span>({partDetails.sellerInfo.reviews} reviews)</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Lid sinds {partDetails.sellerInfo.memberSince}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Beschrijving</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {partDetails.description}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => onExternalLink(partDetails.platform)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Bekijk op {partDetails.platform}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-green-600 border-green-300"
                    onClick={handleContactSeller}
                  >
                    Contact verkoper
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
