import { useContext } from 'react';
import { ClientDashboardContext } from './ClientDashboardContext';

export const useClientDashboard = () => {
  const context = useContext(ClientDashboardContext);
  if (!context) {
    throw new Error('useClientDashboard must be used within a ClientDashboardProvider');
  }
  return context;
};
