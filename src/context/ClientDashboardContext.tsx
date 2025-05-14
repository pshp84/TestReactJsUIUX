import React, { createContext, useState } from 'react';
import { ClientService, ClientServiceRequest } from '../types';

const mockServices: ClientService[] = [
  {
    id: 1,
    name: "Manicure",
    description: "Professional nail care and styling.",
    imageUrl: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Blow-dry",
    description: "Hair styling with a professional blow-dry.",
    imageUrl: "https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Barber",
    description: "Classic and modern barbering services.",
    imageUrl: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Hair Dye",
    description: "Professional hair coloring services.",
    imageUrl: "https://images.pexels.com/photos/3993448/pexels-photo-3993448.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

interface ClientDashboardContextProps {
  mockServices: ClientService[];
  serviceRequests: ClientServiceRequest[];
  addServiceRequest: (request: Omit<ClientServiceRequest, 'id' | 'status'>) => void;
}

export const ClientDashboardContext = createContext<ClientDashboardContextProps | undefined>(undefined);

export const ClientDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [serviceRequests, setServiceRequests] = useState<ClientServiceRequest[]>([]);

  const addServiceRequest = (request: Omit<ClientServiceRequest, 'id' | 'status'>) => {
    const newRequest: ClientServiceRequest = {
      ...request,
      id: Date.now(),
      status: 'pending',
    };
    setServiceRequests((prev) => [newRequest, ...prev]);
  };

  return (
    <ClientDashboardContext.Provider value={{ mockServices, serviceRequests, addServiceRequest }}>
      {children}
    </ClientDashboardContext.Provider>
  );
};
