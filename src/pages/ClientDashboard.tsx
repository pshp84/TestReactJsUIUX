import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { services, bookings } from '../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import BookingCard from '../components/BookingCard';
import ServiceCard from '../components/ServiceCard';
import DashboardHeader from '../components/DashboardHeader';
import { X } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    address: '',
    city: '',
  });
  
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [userBookings, setUserBookings] = useState(bookings);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleServiceSelect = (service: typeof services[0]) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, service: service.id }));
    setShowBookingModal(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBooking = {
      id: `booking-${Math.random().toString(36).substr(2, 9)}`,
      service: selectedService?.name || '',
      date: formData.date,
      time: formData.time,
      status: 'pending' as const,
      address: `${formData.address}, ${formData.city}`,
      client: user?.name || 'Cliente',
      professional: 'TBD'
    };
    
    setUserBookings([newBooking, ...userBookings]);
    setBookingSuccess(true);
    setShowBookingModal(false);
    
    setFormData({
      service: '',
      date: '',
      time: '',
      address: '',
      city: '',
    });
    
    setTimeout(() => {
      setBookingSuccess(false);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-pink-100 to-lavender-100 rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Bienvenido, {user?.name || 'Cliente'}!
          </h1>
          <p className="text-gray-600">
            Reserve un nuevo servicio o haga un seguimiento de sus citas existentes.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Servicios Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div 
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="cursor-pointer"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Mis Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userBookings.length > 0 ? (
                  userBookings.map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userType="client"
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Todavía no tienes reservas. ¡Reserva un servicio para empezar!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 relative animate-fadeIn">
            <button 
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Reserva {selectedService?.name}
            </h2>
            
            {bookingSuccess && (
              <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 animate-fadeIn">
                ¡Reserva exitosa! Su solicitud ha sido enviada a profesionales.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                label="Ciudad"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                fullWidth
                placeholder="Ingresa a tu ciudad"
              />
              
              <Input
                label="Dirección"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                fullWidth
                placeholder="Ingresa tu dirección"
              />
              
              <Input
                label="Fecha"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                fullWidth
                min={new Date().toISOString().split('T')[0]}
              />
              
              <Input
                label="Hora"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                fullWidth
              />
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="mt-4"
              >
                Reservar ahora
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;