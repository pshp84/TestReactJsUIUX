import React from 'react';
import { Service } from '../types';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from './Button';

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onDelete }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-700 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full flex justify-end space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(service)}
              className="bg-white/80 hover:bg-white text-gray-800"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(service.id)}
              className="bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-900 text-blue-300 rounded-full capitalize">
            {service.category}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-white mb-1">
          {service.name}
        </h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {service.description}
        </p>
        <p className="text-lg font-bold text-green-400">
          {formatPrice(service.price)}
        </p>
      </div>
    </div>
  );
};