import React, { createContext, useState, ReactNode } from "react";

interface RequestData {
  id: string;
  title: string;
  city: string;
  address: string;
  serviceType: string;
  date: Date;
  time?: string;
  status?: string;
}

const mockRequests: RequestData[] = [
  {
    id: "e2b987cb-20f7-4ef4-9d9f-23f5b45f5fd7",
    title: "Makeup Booking",
    city: "New York",
    address: "123 St",
    serviceType: "Makeup",
    date: new Date(),
    status: "Pending",
  },
  {
    id: "f87b8c52-1fbe-450d-9029-5c2125adf2c0",
    title: "Haircut Appointment",
    city: "Los Angeles",
    address: "456 Ave",
    serviceType: "Haircut",
    date: new Date(),
    status: "Pending",
  },
];

interface RequestContextType {
  requests: RequestData[];
  addRequest: (request: Omit<RequestData, "status">) => void;
  updateRequestStatus?: (index: number, status: string) => void;
  deleteRequest?: (id: string) => void;
}

export const RequestContext = createContext<RequestContextType | undefined>(
  undefined
);

export const RequestProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [requests, setRequests] = useState<RequestData[]>(mockRequests);

  const addRequest = (request: Omit<RequestData, "status">) => {
    const newRequest = { ...request, status };
    setRequests((prev) => [...prev, newRequest]);
  };

  const updateRequestStatus = (index: number, newStatus: string) => {
    setRequests((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: newStatus };

      localStorage.setItem("services", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => {
      const updated = prev.filter((request) => request.id !== id);
      localStorage.setItem("services", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <RequestContext.Provider
      value={{ requests, addRequest, updateRequestStatus,deleteRequest }}
    >
      {children}
    </RequestContext.Provider>
  );
};
