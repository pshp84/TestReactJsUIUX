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
    { id: 1, name: 'Emma Wilson', type: 'cliente', joinDate: '2025-03-15' },
    { id: 2, name: 'James Chen', type: 'profesional', joinDate: '2025-03-14' },
    { id: 3, name: 'Sofia Garcia', type: 'cliente', joinDate: '2025-03-14' },
    { id: 4, name: 'Michael Kim', type: 'profesional', joinDate: '2025-03-13' },
  ];

  // Mock popular services
  const popularServices = [
    { name: 'Peinado', bookings: 45 },
    { name: 'Terapia de masaje', bookings: 38 },
    { name: 'Manicura y pedicura', bookings: 32 },
    { name: 'Maquillaje', bookings: 28 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Bienvenido de nuevo, {user?.name}
          </h1>
          <p className="text-gray-600">
            Esto es lo que está sucediendo con el G-UrbanGlow hoy en día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total de usuarios</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
                </div>
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Users className="text-pink-500" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="success">+12% </Badge>
                <span className="ml-2 text-gray-500">vs el mes pasado</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Reservas activas</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.activeBookings}</h3>
                </div>
                <div className="bg-lavender-100 p-3 rounded-lg">
                  <Calendar className="text-lavender-500" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="success">+5% </Badge>
                <span className="ml-2 text-gray-500">vs la semana pasada</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Ingresos totales</p>
                  <h3 className="text-2xl font-bold text-gray-800">${stats.totalRevenue}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="text-green-500" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="success">+18% </Badge>
                <span className="ml-2 text-gray-500">vs el mes pasado</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Servicios Completados</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.completedBookings}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <BarChart className="text-yellow-500" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge variant="success">+8% </Badge>
                <span className="ml-2 text-gray-500">vs el mes pasado</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Usuarios recientes</CardTitle>
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
              <CardTitle>Servicios populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800">{service.name}</p>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        {service.bookings} reservas
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