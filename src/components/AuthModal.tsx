import React, { useState } from 'react';
import { X } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSwitchMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  onSwitchMode 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'client' | 'professional' | 'admin'>('client');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      let success;
      
      if (mode === 'login') {
        success = await login(email, password, userType);
        if (!success) {
          if (userType === 'admin') {
            setError('Credenciales de administrador no válidas. Uso admin@demo.com/admin123');
          } else {
            setError('Credenciales no válidas. Para la demostración, uso client@demo.com/password123 or professional@demo.com/password123');
          }
        }
      } else {
        if (!name.trim()) {
          setError('El nombre es obligatorio');
          return;
        }
        success = await signup(email, password, name, userType);
        if (!success) {
          setError('El correo electrónico ya existe');
        }
      }
      
      if (success) {
        onClose();
      }
    } catch (err) {
      setError('Se ha producido un error. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl overflow-hidden max-h-2xl shadow-2xl w-full max-w-3xl mx-4 relative animate-fadeIn">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={24} />
        </button>
        
        <div className="grid md:grid-cols-2 min-h-[400px]">
          <div className="hidden md:block bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-12 lg:flex flex-col justify-center items-center text-white">
            <div className="text-center max-w-md">
              <h3 className="text-3xl font-bold mb-4">
                {mode === 'login' ? 'Bienvenido de nuevo!' : 'Comenzar G-UrbanGlow'}
              </h3>
              <p className="text-lg text-white/90 mb-8">
                {mode === 'login' 
                  ? 'Inicie sesión para acceder a servicios premium de belleza y bienestar en la puerta de su casa' 
                  : 'Regístrese para conectarse con los mejores profesionales de la belleza en su área'}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                  <span className='text-left'>Reserva citas al instante</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                  <span className='text-left'>Conéctate con profesionales verificados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                  <span className='text-left'>Disfruta de ofertas exclusivas</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {mode === 'login' ? 'Iniciar sesión' : 'Crear una cuenta'}
            </h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <div className="flex rounded-xl overflow-hidden border-2 border-gray-200">
                  <button
                    type="button"
                    className={`flex-1 py-3 text-center text-sm font-medium transition-colors duration-200 ${
                      userType === 'client' 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setUserType('client')}
                  >
                    Cliente
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-3 text-center text-sm font-medium transition-colors duration-200 ${
                      userType === 'professional' 
                        ? 'bg-pink-500 text-white' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setUserType('professional')}
                  >
                    Profesional
                  </button>
                  {mode === 'login' && (
                    <button
                      type="button"
                      className={`flex-1 py-2 text-center text-sm ${
                        userType === 'admin' 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setUserType('admin')}
                    >
                      Admin
                    </button>
                  )}
                </div>
              </div>
              
              {mode === 'signup' && (
                <Input
                  label="Nombre completo"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Ingresa tu nombre completo"
                  className="text-lg"
                />
              )}
              
              <Input
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingresa tu correo electrónico"
                className="text-lg"
              />
              
              <Input
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={mode === 'login' ? "Ingresa tu contraseña" : "Crear una contraseña"}
                className="text-lg"
              />
              
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                className="mt-2"
                disabled={isLoading}
              >
                {isLoading ? 'Espera...' : (
                  mode === 'login' 
                    ? `Inicie sesión como ${userType === 'admin' ? 'Admin' : userType === 'client' ? 'Cliente' : 'Profesional'}` 
                    : `Regístrese como ${userType === 'client' ? 'Cliente' : 'Profesional'}`
                )}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {mode === 'login' 
                  ? "¿No tienes una cuenta? " 
                  : "¿Ya tienes una cuenta? "}
                <button 
                  onClick={onSwitchMode}
                  className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-200"
                >
                  {mode === 'login' ? 'Únete' : 'Iniciar sesión'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;