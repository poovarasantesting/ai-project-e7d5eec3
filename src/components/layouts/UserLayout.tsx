import { Link, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">User Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="hidden md:block">Welcome, {user?.name}</span>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-16 md:w-64 bg-slate-900 text-white p-4">
          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center p-2 rounded hover:bg-slate-800 transition-colors">
              <LayoutDashboard className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link to="/profile" className="flex items-center p-2 rounded hover:bg-slate-800 transition-colors">
              <User className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Profile</span>
            </Link>
            <Link to="/settings" className="flex items-center p-2 rounded hover:bg-slate-800 transition-colors">
              <Settings className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}