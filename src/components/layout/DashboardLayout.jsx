import { useEffect, useState } from "react";
import { Briefcase, Building2, Cake, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";
import { CookingPot, LayoutDashboard, ListOrdered } from "lucide-react";

const NAVIGATION_MENU = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "makanan",
    name: "Master Makanan",
    icon: CookingPot,
  },
  {
    id: "list-makanan",
    name: "List Pesanan",
    icon: ListOrdered,
  },
];
const NavigationItem = ({ item, isActive, onClick, isCollapse }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center p-3 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
        isActive
          ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-50"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-700"
      }`}
    >
      <Icon
        className={`size-5 flex-shrink-0 ${
          isActive ? "text-blue-600" : "text-gray-500"
        }`}
      />
      {!isCollapse && <span className="ml-3">{item.name}</span>}
    </button>
  );
};

const DashboardLayout = ({ activeMenu, children }) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(
    activeMenu || "dashboard"
  );
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Atasi masalah responsive
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // tutup dropdown profile saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen) setProfileDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleNavigate = (itemId) => {
    setActiveMenuItem(itemId);
    navigate(`/${itemId}`);
    if (isMobile) setSidebarOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarCollapse = () => !isMobile && false;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-500 transform ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        } ${sidebarCollapse() ? "w-16" : "w-64"} bg-white`}
      >
        {/* Conpany Logo */}
        <div className="flex items-center h-16 border-b border-gray-100 pl-6">
          {!sidebarCollapse() ? (
            <Link className="flex items-center space-x-3" to="/">
              <div className="size-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-xl">
                <Cake className="size-5 text-white" />
              </div>
              <span className="text-gray-900 font-bold text-xl ">
                Restaurant
              </span>
            </Link>
          ) : (
            <div className="size-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Building2 className="size-5 text-white" />
            </div>
          )}
        </div>
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {NAVIGATION_MENU.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeMenuItem === item.id}
              onClick={() => handleNavigate(item.id)}
              isCollapse={sidebarCollapse()}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            onClick={logout}
            className="w-full flex items-center p-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-red-50 transition-all duration-500 cursor-pointer"
            to="/login"
          >
            <LogOut className="size-4.5 flex-shrink-0 text-red-500" />
            {!sidebarCollapse() && (
              <span className="ml-3 font-semibold text-red-500">Logout</span>
            )}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobile && sidebarCollapse() && (
        <div
          className="fixed inset-0 bg-black z-40  bg-opacity-25 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ${
          isMobile ? "ml-0" : sidebarCollapse() ? "ml-16" : "ml-64"
        }`}
      >
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 h-16 flex items-center justify-between px-6 sticky top-0">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              >
                {sidebarOpen ? (
                  <X className="size-5 text-gray-600" />
                ) : (
                  <Menu className="size-5 text-gray-600" />
                )}
              </button>
            )}
            <div>
              <h1 className="text-base font-semibold text-gray-900">
                Welcome Back !
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                di restaurant kami.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Profile Dropdown */}
            <ProfileDropdown
              isOpen={profileDropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
              name={user?.name || ""}
              email={user?.email || ""}
              onLogout={logout}
            />
          </div>
        </header>

        {/* Main Content area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
