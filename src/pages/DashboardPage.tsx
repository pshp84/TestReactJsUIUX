import moment from "moment";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useRequestContext } from "../context/useRequestContext";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export const DashboardPage: React.FC = () => {
  const { requests, deleteRequest } = useRequestContext();
  const { registered, deleteUser } = useAuth();

  const sidebarLinks = [
    { label: "Users", key: "users" },
    { label: "Services", key: "services" },
  ];

  const handleDelete = (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed && deleteUser) {
      deleteUser(id);
      toast.success("User deleted successfully.");
    }
  };

  const handleServiceDelete = (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (isConfirmed && deleteRequest) {
      deleteRequest(id);
      toast.success("Service deleted successfully.");
    }
  };

  return (
    <Layout sidebarLinks={sidebarLinks}>
      {(activeTab) => {
        switch (activeTab) {
          case "users":
            return (
              <>
                <div className="space-y-4">
                  {registered && registered.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-gray-800 rounded-xl text-gray-300">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left border-b border-gray-700">
                              Id
                            </th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">
                              Role
                            </th>
                            <th className="px-4 py-3 text-left border-b border-gray-700"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {registered &&
                            registered.map((user, index) => {
                              const counter = index + 1;
                              return (
                                <tr
                                  key={index}
                                  className="hover:bg-gray-700 transition"
                                >
                                  <td className="px-4 py-3">{counter}</td>
                                  <td className="px-4 py-3">{user.name}</td>
                                  <td className="px-4 py-3">{user.email}</td>
                                  <td className="px-4 py-3">{user.role}</td>
                                  <td className="px-4 py-3">
                                    <Trash2
                                      onClick={() => {
                                        if (user.id) {
                                          handleDelete(user.id);
                                        } else {
                                          console.error("User ID is undefined");
                                        }
                                      }}
                                      className="cursor-pointer"
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-white text-center">
                      No users are found.
                    </div>
                  )}
                </div>
              </>
            );
          case "services":
            return (
              <>
                <div className="space-y-4">
                  {requests && requests.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-gray-800 rounded-xl text-gray-300">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left border-b border-gray-700">
                              Id
                            </th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">
                              Title
                            </th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">
                              Service Type
                            </th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left border-b border-gray-700">
                              Date&Time
                            </th>
                            <th className="px-4 py-3 text-left border-b border-gray-700"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {requests &&
                            requests.map((req, index) => (
                              <tr
                                key={index}
                                className="hover:bg-gray-700 transition"
                              >
                                <td className="px-4 py-3">{req.id}</td>
                                <td className="px-4 py-3">{req.title}</td>
                                <td className="px-4 py-3">{req.serviceType}</td>
                                <td className="px-4 py-3">{req.status || "Pending"}</td>
                                <td className="px-4 py-3">
                                  {moment(req.date).format(
                                    "MMM D, YYYY h:mm A"
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <Trash2
                                    onClick={() => {
                                      if (req.id) {
                                        handleServiceDelete(req.id);
                                      } else {
                                        console.error(
                                          "Service ID is undefined"
                                        );
                                      }
                                    }}
                                    className="cursor-pointer"
                                  />
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
  );
};
