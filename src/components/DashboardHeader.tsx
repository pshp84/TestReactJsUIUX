import React from 'react';
import { Sparkles } from 'lucide-react';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';

const DashboardHeader: React.FC = () => {
  const { logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Sparkles className="text-pink-500 mr-2" size={24} />
            <span className="text-xl font-bold text-gray-800">G-UrbanGlow</span>
          </div>

          <Button 
            variant="outline" 
            onClick={logout}
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 