import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import GuestTable from "./pages/GuestTable.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ListOrder from "./pages/ListOrder.jsx";
import MasterMenu from "./pages/MasterMenu.jsx";
import ProtectedRoute from "./route/ProtectedRoute.jsx";
import NotFound from "./route/NotFound.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/guest" element={<GuestTable />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute roles="pelayan" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu-management" element={<MasterMenu />} />
          </Route>
          <Route element={<ProtectedRoute roles={["kasir", "pelayan"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list-pesanan" element={<ListOrder />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
