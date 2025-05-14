import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { ServiceCard } from "../components/ServiceCard";
import { ServiceModal } from "../components/ServiceModal";
import { Service } from "../types";
import { Plus, Search } from "lucide-react";
import { Button } from "../components/Button";
import {
  getServices,
  addService as addServiceFunction,
  updateService as updateServiceFunction,
  deleteService as deleteServiceFunction,
} from "../data/mock-data";
import { useClientDashboard } from "../context/useClientDashboard";

const ClientDashboardPage = () => {
  const { mockServices } = useClientDashboard();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleAddClick = () => {
    setCurrentService(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (service: Service) => {
    setCurrentService(service);
    setIsModalOpen(true);
  };

  const handleAddService = async (serviceData: Omit<Service, "id">) => {
    try {
      const newService = await addServiceFunction(serviceData);
      setServices((prev) => [...prev, newService]);
      showNotification("Service successfully added", "success");
    } catch (error) {
      console.error("Error adding service:", error);
      showNotification("Failed to add service", "error");
    }
  };

  const handleUpdateService = async (serviceData: Omit<Service, "id">) => {
    if (!currentService) return;

    try {
      const updatedService = await updateServiceFunction(
        currentService.id,
        serviceData
      );

      setServices((prev) =>
        prev.map((service) =>
          service.id === currentService.id ? updatedService : service
        )
      );

      showNotification("Service successfully updated", "success");
    } catch (error) {
      console.error("Error updating service:", error);
      showNotification("Failed to update service", "error");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteServiceFunction(id);
        setServices((prev) => prev.filter((service) => service.id !== id));
        showNotification("Service successfully deleted", "success");
      } catch (error) {
        console.error("Error deleting service:", error);
        showNotification("Failed to delete service", "error");
      }
    }
  };

  const handleSaveService = (serviceData: Omit<Service, "id">) => {
    if (currentService) {
      handleUpdateService(serviceData);
    } else {
      handleAddService(serviceData);
    }
  };

  const filteredServices = mockServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Layout>
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Services</h1>
            </div>

            <Button onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            />
          </div>
        </div>

        {notification.message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              notification.type === "success"
                ? "bg-green-900/20 border border-green-800 text-green-400"
                : "bg-red-900/20 border border-red-800 text-red-400"
            } animate-in fade-in slide-in-from-top duration-300`}
          >
            {notification.message}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-xl overflow-hidden h-80"
              />
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onEdit={handleEditClick}
                onDelete={handleDeleteService}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {searchTerm
                ? "No services match your search"
                : "No services found"}
            </p>
            {searchTerm && (
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                className="mt-4"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}

        <ServiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveService}
          service={currentService}
        />
      </Layout>
    </>
  );
};

export default ClientDashboardPage;
