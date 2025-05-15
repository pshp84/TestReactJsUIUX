/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "../components/Layout";
import { useRequestContext } from "../context/useRequestContext";
import { Button } from "../components/Button";
import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";
import { X } from "lucide-react";

const ProfessionalDashboardPage = () => {
  const { requests, updateRequestStatus } = useRequestContext();
  const sidebarLinks = [{ label: "Incoming Requests", key: "requests" }];
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleStatusChange = (requestIndex: number, newStatus: string) => {
    if (updateRequestStatus) {
      updateRequestStatus(requestIndex, newStatus);
      //localStorage.setItem("services", JSON.stringify(requests));
      toast.success(`Request ${newStatus} successfully!`);
    } else {
      console.error("updateRequestStatus is undefined. Check Provider.");
    }
  };

  return (
    <>
      <Layout sidebarLinks={sidebarLinks}>
        {(activeTab) => {
          switch (activeTab) {
            case "requests":
              return (
                <>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">
                      Incoming Requests
                    </h2>

                    {requests.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 rounded-xl text-gray-300">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left border-b border-gray-700">
                                Title
                              </th>
                              <th className="px-4 py-3 text-left border-b border-gray-700">
                                Service Type
                              </th>
                              {/* <th className="px-4 py-3 text-left border-b border-gray-700">Client City</th> */}
                              <th className="px-4 py-3 text-left border-b border-gray-700">
                                Date
                              </th>
                              <th className="px-4 py-3 text-left border-b border-gray-700">
                                Status
                              </th>
                              <th className="px-4 py-3 text-left border-b border-gray-700">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {requests.map((req, index) => (
                              <tr
                                key={index}
                                className="hover:bg-gray-700 transition"
                              >
                                <td className="px-4 py-3">{req.title}</td>
                                <td className="px-4 py-3">{req.serviceType}</td>
                                {/* <td className="px-4 py-3">{req.city}</td> */}
                                <td className="px-4 py-3">
                                  {moment(req.date).format(
                                    "MMM D, YYYY h:mm A"
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  {req.status || "Pending"}
                                </td>
                                {/* <td className="px-4 py-3 space-x-2">
                                  <Button
                                    className="bg-green-600 cursor-pointer"
                                    onClick={() =>
                                      handleStatusChange(index, "Confirmed")
                                    }
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    className="bg-red-600 cursor-pointer"
                                    onClick={() =>
                                      handleStatusChange(index, "Rejected")
                                    }
                                  >
                                    Reject
                                  </Button>
                                  <Button
                                    className="bg-blue-600 cursor-pointer"
                                    onClick={() => setSelectedRequest(req)}
                                  >
                                    View
                                  </Button>
                                </td> */}
                                <td className="px-4 py-3">
                                  <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:space-x-2">
                                    <Button
                                      className="bg-green-600 flex-1 sm:flex-none cursor-pointer"
                                      onClick={() =>
                                        handleStatusChange(index, "Confirmed")
                                      }
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      className="bg-red-600 flex-1 sm:flex-none cursor-pointer"
                                      onClick={() =>
                                        handleStatusChange(index, "Rejected")
                                      }
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      className="bg-blue-600 flex-1 sm:flex-none cursor-pointer"
                                      onClick={() => setSelectedRequest(req)}
                                    >
                                      View
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-xl text-white">
                        No service requests found.
                      </div>
                    )}

                    {/*Viewing Request Details */}
                    {selectedRequest && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-900 p-6 rounded-lg w-96 space-y-4">
                          <X
                            onClick={() => setSelectedRequest(null)}
                            className="ml-auto cursor-pointer"
                          />
                          <h3 className="text-xl font-semibold text-white">
                            Request Details
                          </h3>
                          <p>
                            <strong>Title:</strong> {selectedRequest.title}
                          </p>
                          <p>
                            <strong>Service Type:</strong>{" "}
                            {selectedRequest.serviceType}
                          </p>
                          <p>
                            <strong>City:</strong> {selectedRequest.city}
                          </p>
                          <p>
                            <strong>Address:</strong> {selectedRequest.address}
                          </p>
                          <p>
                            <strong>Date:</strong>{" "}
                            {moment(selectedRequest.date).format(
                              "MMM D, YYYY h:mm A"
                            )}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {selectedRequest.status || "Pending"}
                          </p>
                          {/* <Button
                            className="bg-gray-700 w-full cursor-pointer"
                            onClick={() => setSelectedRequest(null)}
                          >
                            Close
                          </Button> */}
                        </div>
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

export default ProfessionalDashboardPage;
