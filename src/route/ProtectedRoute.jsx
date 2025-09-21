import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEFAULT_ROUTES = {
  pelayan: "/dashboard",
  kasir: "/list-pesanan",
};

const ProtectedRoute = ({ roles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  const userRole = user.role?.toLowerCase();

  if (roles && !roles.includes(userRole)) {
    const defaultPath = DEFAULT_ROUTES[userRole] || "/guest";
    return <Navigate to={defaultPath} replace />;
  }

  // kalau buka root `/` langsung, arahkan ke default role route
  if (location.pathname === "/") {
    const defaultPath = DEFAULT_ROUTES[userRole] || "/";
    return <Navigate to={defaultPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
