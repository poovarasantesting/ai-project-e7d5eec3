import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      if (isAdmin(currentUser)) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-gray-600">
            Login to access your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}