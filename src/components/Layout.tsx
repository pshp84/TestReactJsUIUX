import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div 
            className="text-xl font-semibold text-blue-400 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Test App
          </div>
          
          <div className="flex items-center space-x-4">
            
            {isAuthenticated && user && (
              <div className="flex items-center">
                <div className="hidden md:block mr-4">
                  <p className="text-sm font-medium text-gray-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.email}
                  </p>
                </div>
                <div className="relative group">
                  <button 
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-900 text-blue-300"
                    aria-label="User menu"
                  >
                    <User className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-700 md:hidden">
                      <p className="text-sm font-medium text-gray-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};