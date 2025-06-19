import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <header className="border-b bg-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold">
          Auth Demo
        </Link>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="text-sm">
                  {currentUser.name} ({currentUser.role})
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}