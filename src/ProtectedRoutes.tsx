import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProtectedRoutes: React.FC<any> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }


  return <>{children}</>;
};
