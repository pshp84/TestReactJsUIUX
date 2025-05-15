import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: 'client' | 'professional' | 'admin';
}

const RouteGuard: React.FC<RouteGuardProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      window.location.href = '/';
      return;
    }
    
    if (requiredRole && user.type !== requiredRole) {
      if (user.type === 'admin') {
        window.location.href = '/admin-dashboard';
      } else {
        const redirectPath = user.type === 'client' ? '/client-dashboard' : '/professional-dashboard';
        window.location.href = redirectPath;
      }
    }
  }, [user, requiredRole]);
  
  if (!user || (requiredRole && user.type !== requiredRole)) {
    return null;
  }
  
  return <>{children}</>;
};

export default RouteGuard;