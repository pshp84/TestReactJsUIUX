import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookings } from '../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import BookingCard from '../components/BookingCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import DashboardHeader from '../components/DashboardHeader';
import { Pencil, Save, User } from 'lucide-react';

const ProfessionalDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    specialty: 'Hair Styling',
    phone: '(555) 123-4567',
    city: 'San Francisco',
    bio: 'Professional stylist with 5 years of experience specializing in modern cuts and color techniques.',
  });
  
  const [allBookings, setAllBookings] = useState(bookings);

  const sortedBookings = [...allBookings].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return 0;
  });
  
  const pendingBookings = sortedBookings.filter(b => b.status === 'pending');
  const acceptedBookings = sortedBookings.filter(b => b.status === 'accepted');
  const completedBookings = sortedBookings.filter(b => b.status === 'completed');
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAcceptBooking = (id: string) => {
    setAllBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status: 'accepted' } : booking
      )
    );
  };
  
  const handleRejectBooking = (id: string) => {
    setAllBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status: 'rejected' } : booking
      )
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Professional Profile</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setEditingProfile(!editingProfile)}
              >
                {editingProfile ? (
                  <>
                    <Save size={16} className="mr-1" /> Save
                  </>
                ) : (
                  <>
                    <Pencil size={16} className="mr-1" /> Edit
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <User size={48} className="text-gray-500" />
                </div>
                <Badge variant="default">Professional</Badge>
              </div>
              
              <div className="md:w-3/4">
                {editingProfile ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                      />
                      <Input
                        label="Specialty"
                        name="specialty"
                        value={profileData.specialty}
                        onChange={handleProfileChange}
                      />
                      <Input
                        label="Phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                      />
                      <Input
                        label="City"
                        name="city"
                        value={profileData.city}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {profileData.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <span className="text-gray-500">Specialty:</span>
                        <span className="ml-2 font-medium">{profileData.specialty}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <span className="ml-2 font-medium">{profileData.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">City:</span>
                        <span className="ml-2 font-medium">{profileData.city}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{profileData.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pending Requests</CardTitle>
                <Badge variant="default">{pendingBookings.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingBookings.length > 0 ? (
                  pendingBookings.map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userType="professional"
                      onAccept={handleAcceptBooking}
                      onReject={handleRejectBooking}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No pending requests at the moment.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Badge variant="success">{acceptedBookings.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {acceptedBookings.length > 0 ? (
                  acceptedBookings.map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userType="professional"
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No upcoming appointments.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Service History</CardTitle>
              <Badge variant="outline">{completedBookings.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedBookings.length > 0 ? (
                completedBookings.map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    userType="professional"
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No completed services yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;