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
            <a href="#" className="text-gray-600 hover:text-pink-500 transition">Home</a>
            <a href="#services" className="text-gray-600 hover:text-pink-500 transition">Services</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-pink-500 transition">How it Works</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition">About</a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={openLoginModal}
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  onClick={openSignupModal}
                >
                  Sign Up
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
              <a href="#" className="text-gray-600 hover:text-pink-500 transition py-2">Home</a>
              <a href="#services" className="text-gray-600 hover:text-pink-500 transition py-2">Services</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-pink-500 transition py-2">How it Works</a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition py-2">About</a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition py-2">Contact</a>
              
              {user ? (
                <Button 
                  variant="outline" 
                  onClick={logout}
                  fullWidth
                >
                  Logout
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    onClick={openLoginModal}
                    fullWidth
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={openSignupModal}
                    fullWidth
                  >
                    Sign Up
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