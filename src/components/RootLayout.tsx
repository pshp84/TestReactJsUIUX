import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function RootLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === "client") {
      navigate("/dashboard/client");
    } else if (user?.role === "professional") {
      navigate("/dashboard/professional");
    } else if (user?.role === "admin") {
      navigate("/dashboard");
    }
  // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Outlet />
        <ScrollToTop />
      </div>
      <Footer />
    </div>
  );
}
