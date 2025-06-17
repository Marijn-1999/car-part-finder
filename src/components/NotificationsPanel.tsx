
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Bell, CheckCircle, AlertCircle } from 'lucide-react';

interface NotificationsPanelProps {
  onClose: () => void;
}

export const NotificationsPanel = ({ onClose }: NotificationsPanelProps) => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Nieuw onderdeel gevonden!',
      message: 'Ford Mustang carburateur gevonden op Marktplaats voor €485',
      time: '5 min geleden',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Prijs gedaald',
      message: 'Porsche 911 remschijven zijn 15% goedkoper geworden',
      time: '2 uur geleden',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Zoekactie voltooid',
      message: 'Geen nieuwe resultaten voor VW Kever bumper',
      time: '1 dag geleden',
      read: true
    }
  ];

  const handleMarkAsRead = (notificationId: number) => {
    console.log(`Marked notification ${notificationId} as read`);
  };

  const handleClearAll = () => {
    console.log('Cleared all notifications');
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold text-green-800">Meldingen</h3>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            {notifications.filter(n => !n.read).length}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3 mb-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-3 rounded-lg border-l-4 ${
              notification.type === 'success' ? 'border-green-500 bg-green-50' :
              notification.type === 'info' ? 'border-blue-500 bg-blue-50' :
              'border-yellow-500 bg-yellow-50'
            } ${!notification.read ? 'bg-opacity-100' : 'bg-opacity-50'}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                {notification.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                {notification.type === 'info' && <Bell className="h-4 w-4 text-blue-600 mt-0.5" />}
                {notification.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
              {!notification.read && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  ✓
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-green-600 border-green-300"
          onClick={handleClearAll}
        >
          Alles wissen
        </Button>
        <Button 
          size="sm" 
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Instellingen
        </Button>
      </div>
    </Card>
  );
};
