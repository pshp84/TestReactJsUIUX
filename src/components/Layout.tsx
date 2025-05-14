import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Edit, LogOut, User } from "lucide-react";
import UserProfilePage from "../pages/UserProfilePage";

interface SidebarLink {
  label: string;
  key: string;
}

interface LayoutProps {
  children: (activeTab: string) => ReactNode;
  sidebarLinks: SidebarLink[];
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebarLinks }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(sidebarLinks[0]?.key);
  const [profileMode, setProfileMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-300">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div
          className="p-6 text-xl font-semibold text-blue-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          UrbanGlow
        </div>
        <nav className="flex-1 flex flex-col space-y-2 p-4">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => {
                setActiveTab(link.key);
                setProfileMode(false);
              }}
              className={`py-3 px-4 rounded-lg text-left transition ${
                activeTab === link.key
                  ? "bg-gray-700 text-white border-l-4 border-blue-500"
                  : "hover:bg-gray-700 text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="text-xl font-semibold text-blue-400 cursor-pointer">
              {/* Test App */}
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated && user && (
                <div className="flex items-center">
                  <div className="hidden md:block mr-4">
                    <p className="text-sm font-medium text-gray-100">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <div className="relative group">
                    <button
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-900 text-blue-300"
                      aria-label="User menu"
                    >
                      <User className="w-4 h-4" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-700">
                      <div className="px-4 py-2 border-b border-gray-700 md:hidden">
                        <p className="text-sm font-medium text-gray-100">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                      <button
                        onClick={() => setProfileMode(true)}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {profileMode ? (
            <UserProfilePage onCloseProfile={() => setProfileMode(false)} />
          ) : (
            children(activeTab)
          )}
        </main>
      </div>
    </div>
  );
};
