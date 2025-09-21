import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const DEFAULT_ROUTES = {
  pelayan: "/dashboard",
  kasir: "/list-pesanan",
};

const NotFound = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user?.role) {
    const userRole = user.role.toLowerCase();
    const defaultPath = DEFAULT_ROUTES[userRole] || "/";
    return <Navigate to={defaultPath} replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-lg text-gray-700">Halaman tidak ditemukan</p>
      <a
        href="/login"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Kembali ke Login
      </a>
    </div>
  );
};

export default NotFound;
