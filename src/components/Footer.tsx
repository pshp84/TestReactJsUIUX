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
              Bringing beauty & wellness services to your doorstep. Connecting you with top professionals for a luxurious experience at home.
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
            <h3 className="text-gray-800 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Home</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-pink-500 transition text-sm">Services</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-pink-500 transition text-sm">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Manicure & Pedicure</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Hair Styling</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Massage Therapy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Makeup</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-500 transition text-sm">Skincare</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">Email: info@gurbanglow.com</li>
              <li className="text-gray-600 text-sm">Phone: +1 (123) 123-4567</li>
              <li className="text-gray-600 text-sm">Address: xyz</li>
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