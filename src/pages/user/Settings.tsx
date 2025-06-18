import UserLayout from "../../components/layouts/UserLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Bell, Lock, Eye, EyeOff, Monitor, Smartphone } from "lucide-react";

export default function UserSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation check
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    // In a real app, you would save to the backend here
    setTimeout(() => {
      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }, 600);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${notifications[key] ? 'disabled' : 'enabled'}`);
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-slate-600">Manage your account settings and preferences</p>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Lock className="h-5 w-5 text-slate-700" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input 
                  id="currentPassword"
                  name="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
              />
            </div>
            
            <Button type="submit">Update Password</Button>
          </form>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="h-5 w-5 text-slate-700" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-start space-x-3">
                <div className="pt-0.5">
                  <Monitor className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-slate-500">Receive notifications via email</p>
                </div>
              </div>
              <div>
                <Button 
                  variant={notifications.email ? "default" : "outline"}
                  onClick={() => toggleNotification("email")}
                >
                  {notifications.email ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-start space-x-3">
                <div className="pt-0.5">
                  <Smartphone className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-slate-500">Receive push notifications on your device</p>
                </div>
              </div>
              <div>
                <Button 
                  variant={notifications.push ? "default" : "outline"}
                  onClick={() => toggleNotification("push")}
                >
                  {notifications.push ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-start space-x-3">
                <div className="pt-0.5">
                  <Bell className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-slate-500">Receive marketing and promotional emails</p>
                </div>
              </div>
              <div>
                <Button 
                  variant={notifications.marketing ? "default" : "outline"}
                  onClick={() => toggleNotification("marketing")}
                >
                  {notifications.marketing ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}