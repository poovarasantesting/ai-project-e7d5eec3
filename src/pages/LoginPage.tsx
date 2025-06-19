import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/lib/auth";
import { toast } from "sonner";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  
  // Demo credentials for easy login
  const demoEmail = "user@example.com";
  const demoPassword = "password123";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    const user = login(data.email, data.password);
    
    if (user) {
      toast.success("Successfully logged in");
      navigate(from);
    } else {
      toast.error("Invalid email or password");
    }
  };

  const fillDemoCredentials = () => {
    form.setValue("email", demoEmail);
    form.setValue("password", demoPassword);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
        
        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            className="text-gray-600 hover:text-indigo-600"
            onClick={fillDemoCredentials}
          >
            Use Demo Credentials
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? This is a demo app, so just use the demo credentials.
          </p>
        </div>
      </div>
    </div>
  );
}