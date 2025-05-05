import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { Input } from './Input';
import { Button } from './Button';
import { X } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, 'id'>) => void;
  service?: Service;
}

const initialFormState = {
  name: '',
  description: '',
  price: 0,
  category: '',
  imageUrl: ''
};

const categories = [
  'development',
  'design',
  'marketing',
];

export const ServiceModal: React.FC<ServiceModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  service 
}) => {
  const [formData, setFormData] = useState<Omit<Service, 'id'>>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (service) {
        setFormData({
          name: service.name,
          description: service.description,
          price: service.price,
          category: service.category,
          imageUrl: service.imageUrl
        });
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
    }
  }, [isOpen, service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than zero';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    
    try {
      onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div 
        className="relative bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white">
            {service ? 'Edit Service' : 'Add New Service'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <Input
            id="name"
            name="name"
            label="Service Name"
            placeholder="Enter service name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          
          <div className="space-y-2">
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter service description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 bg-gray-800 text-white border rounded-lg transition-colors outline-none resize-none ${
                errors.description 
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                  : 'border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
              required
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          
          <Input
            id="price"
            name="price"
            type="number"
            label="Price ($)"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={formData.price.toString()}
            onChange={handleChange}
            error={errors.price}
            required
          />
          
          <div className="space-y-2">
            <label 
              htmlFor="category" 
              className="block text-sm font-medium text-gray-300"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-gray-800 text-white border rounded-lg transition-colors outline-none ${
                errors.category 
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                  : 'border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>
          
          <Input
            id="imageUrl"
            name="imageUrl"
            label="Image URL"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={handleChange}
            error={errors.imageUrl}
            required
          />
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {service ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};