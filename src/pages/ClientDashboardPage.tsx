import { useState } from "react";
import { Layout } from "../components/Layout";
import { ServiceCard } from "../components/ServiceCard";
import { Search } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useClientDashboard } from "../context/useClientDashboard";
import { toast } from "react-toastify";
import { useRequestContext } from "../context/useRequestContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

interface FormData {
  id?: string;
  title: string;
  city: string;
  address: string;
  serviceType: string;
  date: string;
  time?: string;
}

const initialFormData: FormData = {
  id: "",
  title: "",
  city: "",
  address: "",
  serviceType: "",
  date: "",
  time: "",
};

const ClientDashboardPage = () => {
  const { mockServices } = useClientDashboard();
  const { addRequest, requests } = useRequestContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [searchRequest, setSearchRequest] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-500 text-yellow-900",
    Confirmed: "bg-green-500 text-green-900",
    InProgress: "bg-blue-500 text-blue-900",
    Accepted: "bg-gray-500 text-gray-900",
    Rejected: "bg-red-500 text-red-900",
  };

  const sidebarLinks = [
    { label: "Our Services", key: "services" },
    { label: "Request Service", key: "request" },
    { label: "Service Status", key: "status" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.serviceType)
      newErrors.serviceType = "Type of Service is required.";
    if (!selectedDate) newErrors.date = "Date&Time is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.success("Please select a valid date & time.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (validate()) {
      const data = {
        id: crypto.randomUUID(),
        title: formData.title,
        city: formData.city,
        address: formData.address,
        serviceType: formData.serviceType,
        date: selectedDate,
        time: "",
        status: "Pending" as const, 
      };
      addRequest(data);
      const updatedRequests = [...requests, data];
      localStorage.setItem("services", JSON.stringify(updatedRequests));

      toast.success("Service request submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFormData(initialFormData);
      setSelectedDate(null);
      setErrors({});
    }
  };

  const filteredServices = mockServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRequests = requests.filter(
    (req) =>
      req.serviceType.toLowerCase().includes(searchRequest.toLowerCase()) ||
      req.city.toLowerCase().includes(searchRequest.toLowerCase()) ||
      req.address.toLowerCase().includes(searchRequest.toLowerCase())
  );

  return (
    <>
      <Layout sidebarLinks={sidebarLinks}>
        {(activeTab) => {
          switch (activeTab) {
            case "services":
              return (
                <>
                  <div className="mb-6 mt-4">
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
                  {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                      {filteredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-white text-center">
                      {"No services found."}
                    </div>
                  )}
                </>
              );

            case "request":
              return (
                <>
                  <div className="w-full bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                      Request Service
                    </h2>
                    <form
                      onSubmit={handleSubmit}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <Input
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                      />

                      <div className="space-y-2 w-full">
                        <label
                          htmlFor="serviceType"
                          className="block text-sm font-medium text-gray-300"
                        >
                          Type of Service
                        </label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 bg-gray-800 text-white border rounded-lg transition-colors outline-none
              ${
                errors.serviceType
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              }`}
                        >
                          <option value="">Select a service</option>
                          {mockServices.map((service) => (
                            <option key={service.id} value={service.name}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                        {errors.serviceType && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.serviceType}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 w-full">
                        <label
                          htmlFor="dateTime"
                          className="block text-sm font-medium text-gray-300"
                        >
                          Select Date & Time
                        </label>
                        <DatePicker
                          id="dateTime"
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          showTimeSelect
                          dateFormat="Pp"
                          wrapperClassName="w-full"
                          placeholderText="Select date and time"
                          popperPlacement="bottom-start"
                          className={`w-full px-3 py-2 bg-gray-800 text-white border rounded-lg outline-none
      ${
        errors.date
          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          : "border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      }`}
                        />
                        {errors.date && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.date}
                          </p>
                        )}
                      </div>

                      <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city}
                      />
                      <div className="space-y-2 w-full">
                        <label className="block text-sm font-medium text-gray-300">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows={3}
                          className={`w-full px-3 py-2 bg-gray-800 text-white border rounded-lg outline-none 
          ${
            errors.address
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          }`}
                        ></textarea>
                        {errors.address && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2 flex justify-end">
                        <Button type="submit" className="cursor-pointer">
                          Submit Request
                        </Button>
                      </div>
                    </form>
                  </div>
                </>
              );

            case "status":
              return (
                <>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                      Request Status
                    </h2>
                    {requests.length > 0 && (
                      <div className="mb-6 mt-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="search"
                            placeholder="Search..."
                            value={searchRequest}
                            onChange={(e) => setSearchRequest(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                          />
                        </div>
                      </div>
                    )}
                    {filteredRequests.length > 0 ? (
                      <div className="w-full overflow-x-auto">
                        <table className="min-w-[800px] w-full bg-gray-800 rounded-xl text-gray-300">
                          <thead>
                            <tr>
                              <th className="whitespace-nowrap px-4 py-3 text-left border-b border-gray-700">
                                Title
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left border-b border-gray-700">
                                Service Type
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left border-b border-gray-700">
                                City
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left border-b border-gray-700">
                                Address
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left border-b border-gray-700">
                                Date
                              </th>
                              <th className="whitespace-nowrap px-4 py-3 text-left border-b border-gray-700">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredRequests.map((req, index) => (
                              <tr
                                key={index}
                                className="hover:bg-gray-700 transition"
                              >
                                <td className="whitespace-nowrap px-4 py-3">{req.title}</td>
                                <td className="whitespace-nowrap px-4 py-3">{req.serviceType}</td>
                                <td className="whitespace-nowrap px-4 py-3">{req.city}</td>
                                <td className="whitespace-nowrap px-4 py-3">{req.address}</td>
                                <td className="whitespace-nowrap px-4 py-3">
                                  {moment(req.date).format(
                                    "MMM D, YYYY h:mm A"
                                  )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3">
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      statusColors[req.status || "Pending"]
                                    }`}
                                  >
                                    {req.status || "Pending"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-white text-center">
                        No requested services are found.
                      </div>
                    )}
                  </div>
                </>
              );

            default:
              return null;
          }
        }}
      </Layout>
    </>
  );
};

export default ClientDashboardPage;
