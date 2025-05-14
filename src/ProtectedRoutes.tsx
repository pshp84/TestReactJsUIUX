import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProtectedRoutes: React.FC<any> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  // if (user?.role === "client" && location.pathname !== "/dashboard/client") {
  //   return <Navigate to="/dashboard/client" replace />;
  // }
  // if (
  //   user?.role === "professional" &&
  //   location.pathname !== "/dashboard/professional"
  // ) {
  //   return <Navigate to="/dashboard/professional" replace />;
  // }

  return <>{children}</>;
};
