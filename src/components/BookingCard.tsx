import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';

interface BookingCardProps {
  booking: {
    id: string;
    service: string;
    date: string;
    time: string;
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
    professional?: string;
    client?: string;
    address?: string;
  };
  userType: 'client' | 'professional';
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ 
  booking, 
  userType,
  onAccept,
  onReject
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="default">Pendiente</Badge>;
      case 'accepted':
        return <Badge variant="success">Aceptado</Badge>;
      case 'rejected':
        return <Badge variant="error">Rechazado</Badge>;
      case 'completed':
        return <Badge variant="outline">Completado</Badge>;
      default:
        return <Badge variant="default">Pendiente</Badge>;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{booking.service}</CardTitle>
          {getStatusBadge(booking.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Fecha:</span>
            <span className="font-medium">{booking.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Hora:</span>
            <span className="font-medium">{booking.time}</span>
          </div>
          {userType === 'professional' && booking.client && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Cliente:</span>
              <span className="font-medium">{booking.client}</span>
            </div>
          )}
          {userType === 'professional' && booking.address && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dirección:</span>
              <span className="font-medium">{booking.address}</span>
            </div>
          )}
          {userType === 'client' && booking.professional && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Profesional:</span>
              <span className="font-medium">{booking.professional}</span>
            </div>
          )}
        </div>
      </CardContent>
      {userType === 'professional' && booking.status === 'pending' && (
        <CardFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onReject && onReject(booking.id)}
          >
            Rechazar
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onAccept && onAccept(booking.id)}
          >
            Aceptar
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookingCard;