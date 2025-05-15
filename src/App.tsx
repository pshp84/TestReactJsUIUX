import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ClientDashboard from './pages/ClientDashboard';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RouteGuard from './utils/routeGuard';
import { useAuth } from './context/AuthContext';

const Router: React.FC = () => {
  const { user } = useAuth();
  const path = window.location.pathname;
  
  React.useEffect(() => {
    const titleElement = document.querySelector('title');
    if (titleElement) {
      if (path === '/') {
        titleElement.textContent = 'G-UrbanGlow | Beauty & Wellness at Home';
      } else if (path === '/client-dashboard') {
        titleElement.textContent = 'Client Dashboard | G-UrbanGlow';
      } else if (path === '/professional-dashboard') {
        titleElement.textContent = 'Professional Dashboard | G-UrbanGlow';
      } else if (path === '/admin-dashboard') {
        titleElement.textContent = 'Admin Dashboard | G-UrbanGlow';
      }
    }
  }, [path]);
  
  const renderPage = () => {
    if (!user) {
      return <LandingPage />;
    }

    switch (path) {
      case '/client-dashboard':
        return (
          <RouteGuard requiredRole="client">
            <ClientDashboard />
          </RouteGuard>
        );
      case '/professional-dashboard':
        return (
          <RouteGuard requiredRole="professional">
            <ProfessionalDashboard />
          </RouteGuard>
        );
      case '/admin-dashboard':
      return (
        <RouteGuard requiredRole="admin">
          <AdminDashboard />
        </RouteGuard>
      );
      default:
        if (user.type === 'admin') {
          window.location.href = '/admin-dashboard';
        } else if (user.type === 'client') {
          window.location.href = '/client-dashboard';
        } else {
          window.location.href = '/professional-dashboard';
        }
        return null;
    }
  };
  
  return renderPage();
};

const AppLayout: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {!user && <Header />}
      <main className="flex-grow">
        <Router />
      </main>
      {!user && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}

export default App;