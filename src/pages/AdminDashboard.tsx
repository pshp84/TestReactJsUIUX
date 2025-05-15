import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { BarChart, Users, Calendar, TrendingUp } from 'lucide-react';
import DashboardHeader from '../components/DashboardHeader';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock statistics
  const stats = {
    totalUsers: 156,
    totalProfessionals: 42,
    totalClients: 114,
    activeBookings: 28,
    completedBookings: 187,
    totalRevenue: 15600,
  };

  // Mock recent users
  const recentUsers = [
    { id: 1, name: 'Emma Wilson', type: 'client', joinDate: '2025-03-15' },
    { id: 2, name: 'James Chen', type: 'professional', joinDate: '2025-03-14' },
    { id: 3, name: 'Sofia Garcia', type: 'client', joinDate: '2025-03-14' },
    { id: 4, name: 'Michael Kim', type: 'professional', joinDate: '2025-03-13' },
  ];

  // Mock popular services
  const popularServices = [
    { name: 'Hair Styling', bookings: 45 },
    { name: 'Massage Therapy', bookings: 38 },
    { name: 'Manicure & Pedicure', bookings: 32 },
    { name: 'Makeup', bookings: 28 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with G-UrbanGlow today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
                </div>
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Users className="text-pink-500" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="success">+12% </Badge>
                <span className="ml-2 text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Bookings</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.activeBookings}</h3>
                </div>
                <div className="bg-lavender-100 p-3 rounded-lg">
                  <Calendar className="text-lavender-500" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="success">+5% </Badge>
                <span className="ml-2 text-gray-500">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-800">${stats.totalRevenue}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="text-green-500" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="success">+18% </Badge>
                <span className="ml-2 text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Completed Services</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.completedBookings}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <BarChart className="text-yellow-500" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="success">+8% </Badge>
                <span className="ml-2 text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">Joined {user.joinDate}</p>
                    </div>
                    <Badge variant={user.type === 'client' ? 'default' : 'outline'}>
                      {user.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800">{service.name}</p>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        {service.bookings} bookings
                      </span>
                      <div 
                        className="w-24 bg-gray-200 rounded-full h-2"
                        style={{
                          background: `linear-gradient(to right, #FF6696 ${(service.bookings / 45) * 100}%, #E5E7EB 0%)`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;