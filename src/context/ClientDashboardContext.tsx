import React, { createContext, useState } from "react";
import { ClientService, ClientServiceRequest } from "../types";
import { manicure, hairdye, barber, blowdry } from "../assets/index";

const mockServices: ClientService[] = [
  {
    id: 1,
    name: "Manicure",
    description: "Professional nail care and styling.",
    imageUrl: manicure,
  },
  {
    id: 2,
    name: "Blow-dry",
    description: "Hair styling with a professional blow-dry.",
    imageUrl: blowdry,
  },
  {
    id: 3,
    name: "Barber",
    description: "Classic and modern barbering services.",
    imageUrl: barber,
  },
  {
    id: 4,
    name: "Hair Dye",
    description: "Professional hair coloring services.",
    imageUrl: hairdye,
  },
];

interface ClientDashboardContextProps {
  mockServices: ClientService[];
  serviceRequests: ClientServiceRequest[];
  addServiceRequest: (
    request: Omit<ClientServiceRequest, "id" | "status">
  ) => void;
}

export const ClientDashboardContext = createContext<
  ClientDashboardContextProps | undefined
>(undefined);

export const ClientDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [serviceRequests, setServiceRequests] = useState<
    ClientServiceRequest[]
  >([]);

  const addServiceRequest = (
    request: Omit<ClientServiceRequest, "id" | "status">
  ) => {
    const newRequest: ClientServiceRequest = {
      ...request,
      id: Date.now(),
      status: "pending",
    };
    setServiceRequests((prev) => [newRequest, ...prev]);
  };

  return (
    <ClientDashboardContext.Provider
      value={{ mockServices, serviceRequests, addServiceRequest }}
    >
      {children}
    </ClientDashboardContext.Provider>
  );
};
