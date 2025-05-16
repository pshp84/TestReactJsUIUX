import React, { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const openLoginModal = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };
  
  const openSignupModal = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="text-pink-500 mr-2" size={24} />
            <span className="text-xl font-bold text-gray-800">G-UrbanGlow</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-pink-500 transition">Inicio</a>
            <a href="#services" className="text-gray-600 hover:text-pink-500 transition">Servicios</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-pink-500 transition">Cómo Funciona</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition">Acerca de</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition">Contacto</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={logout}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={openLoginModal}
                >
                  Iniciar sesión
                </Button>
                <Button 
                  variant="primary" 
                  onClick={openSignupModal}
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-600 hover:text-pink-500 transition py-2">Inicio</a>
              <a href="#services" className="text-gray-600 hover:text-pink-500 transition py-2">Servicios</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-pink-500 transition py-2">Cómo Funciona</a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition py-2">Acerca de</a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition py-2">Contacto</a>
              
              {user ? (
                <Button 
                  variant="outline" 
                  onClick={logout}
                  fullWidth
                >
                  Cerrar sesión
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={openLoginModal}
                    fullWidth
                  >
                    Iniciar sesión
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={openSignupModal}
                    fullWidth
                  >
                    Registrarse
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
          mode={authMode}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
    </header>
  );
};

export default Header;