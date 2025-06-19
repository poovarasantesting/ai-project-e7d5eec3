import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser, isAdmin } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requireAdmin = false 
}: ProtectedRouteProps) {
  const location = useLocation();
  const currentUser = getCurrentUser();
  
  const isAuthenticated = !!currentUser;
  const hasAdminAccess = isAdmin(currentUser);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
    } else if (requireAdmin && !hasAdminAccess) {
      console.log("User doesn't have admin privileges, access denied");
    }
  }, [isAuthenticated, requireAdmin, hasAdminAccess]);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !hasAdminAccess) {
    // Redirect to dashboard if admin access is required but user is not an admin
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}