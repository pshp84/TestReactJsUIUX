import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { Home, About, Services, Contact, Blog, Reservation } from "./pages1";
import RootLayout from "./components/RootLayout";
import ClientDashboardPage from "./pages/ClientDashboardPage";
import ProfessionalDashboardPage from "./pages/ProfessionalDashboardPage";
import { ClientDashboardProvider } from "./context/ClientDashboardContext";

function App() {
  return (
    <AuthProvider>
      <ClientDashboardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/Reservation" element={<Reservation />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard/client"
            element={
              <ProtectedRoutes>
                <ClientDashboardPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard/professional"
            element={
              <ProtectedRoutes>
                <ProfessionalDashboardPage />
              </ProtectedRoutes>
            }
          />
          <Route path="/not-found" element={<NotFoundPage />} />
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Router>
       <ToastContainer />
      </ClientDashboardProvider>
    </AuthProvider>
  );
}

export default App;
