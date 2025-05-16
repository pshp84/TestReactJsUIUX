import React from 'react';
import { Sparkles, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Sparkles className="text-pink-500 mr-2" size={24} />
              <span className="text-xl font-bold text-gray-800">G-UrbanGlow</span>
            </div>
            <p className="text-gray-600 text-sm">
              Llevando los servicios de belleza y bienestar a la puerta de su casa. Conectándote con los mejores profesionales para una experiencia de lujo en casa.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Inicio</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-pink-500 transition text-sm">Servicios</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-pink-500 transition text-sm">Cómo Funciona</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Acerca de</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Nuestros Servicios</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Manicura y pedicura</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Peinado</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Terapia de masaje</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Maquillaje</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Cuidado de la piel</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Contáctenos</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">Correo electrónico: info@gurbanglow.com</li>
              <li className="text-gray-600 text-sm">Teléfono: +1 (123) 123-4567</li>
              <li className="text-gray-600 text-sm">Dirección: xyz</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} G-UrbanGlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;