import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles 
}: ProtectedRouteProps) {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "Please log in to continue.",
      });
    } else if (user && !allowedRoles.includes(user.role)) {
      toast({
        variant: "destructive",
        title: "Insufficient permissions",
        description: "You don't have permission to access this page.",
      });
    }
  }, [user, allowedRoles, toast]);

  // Not logged in, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Check if user has allowed role
  if (!allowedRoles.includes(user.role)) {
    // If user is logged in but doesn't have the right role,
    // redirect them to the appropriate dashboard
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // User is logged in and has an allowed role
  return <>{children}</>;
}