import AdminLayout from "../../components/layouts/AdminLayout";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Shield, Database, Globe, MailOpen, BellRing, Lock, Save } from "lucide-react";

export default function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Awesome Dashboard",
    siteUrl: "https://dashboard.example.com",
    adminEmail: "admin@example.com",
    userRegistration: true,
    maintenanceMode: false
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@example.com",
    smtpPassword: "••••••••",
    fromEmail: "no-reply@example.com",
    fromName: "Awesome Dashboard"
  });

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveGeneralSettings = () => {
    // In a real app, you would save to the backend here
    toast.success("General settings saved successfully");
  };

  const saveEmailSettings = () => {
    // In a real app, you would save to the backend here
    toast.success("Email settings saved successfully");
  };

  const clearCache = () => {
    // Simulate clearing cache
    toast.success("System cache cleared successfully");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-slate-600">Configure your application settings</p>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="h-5 w-5 text-slate-700" />
            <h2 className="text-xl font-semibold">General Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input 
                  id="siteName"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input 
                  id="siteUrl"
                  name="siteUrl"
                  value={generalSettings.siteUrl}
                  onChange={handleGeneralChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input 
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  value={generalSettings.adminEmail}
                  onChange={handleGeneralChange}
                />
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="userRegistration"
                  name="userRegistration"
                  checked={generalSettings.userRegistration}
                  onChange={handleGeneralChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label htmlFor="userRegistration">Allow User Registration</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={generalSettings.maintenanceMode}
                  onChange={handleGeneralChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={saveGeneralSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save General Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <MailOpen className="h-5 w-5 text-slate-700" />
            <h2 className="text-xl font-semibold">Email Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpServer">SMTP Server</Label>
                <Input 
                  id="smtpServer"
                  name="smtpServer"
                  value={emailSettings.smtpServer}
                  onChange={handleEmailChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input 
                  id="smtpPort"
                  name="smtpPort"
                  value={emailSettings.smtpPort}
                  onChange={handleEmailChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtpUsername">SMTP Username</Label>
                <Input 
                  id="smtpUsername"
                  name="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={handleEmailChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input 
                  id="smtpPassword"
                  name="smtpPassword"
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={handleEmailChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input 
                  id="fromEmail"
                  name="fromEmail"
                  value={emailSettings.fromEmail}
                  onChange={handleEmailChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input 
                  id="fromName"
                  name="fromName"
                  value={emailSettings.fromName}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            
            <div className="pt-4 flex flex-wrap gap-2">
              <Button onClick={saveEmailSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Email Settings
              </Button>
              <Button variant="outline">
                Test Email Configuration
              </Button>
            </div>
          </div>
        </div>

        {/* System Maintenance */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Database className="h-5 w-5 text-slate-700" />
            <h2 className="text-xl font-semibold">System Maintenance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Button onClick={clearCache}>
                Clear System Cache
              </Button>
              <Button variant="outline">
                Run System Diagnostics
              </Button>
              <Button variant="outline">
                Export System Logs
              </Button>
            </div>
            
            <div className="mt-4 bg-slate-50 p-4 rounded-md border border-slate-200">
              <div className="flex items-center space-x-2 text-amber-600 mb-2">
                <Shield className="h-5 w-5" />
                <h3 className="font-medium">Danger Zone</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                These actions are destructive and cannot be undone. Please proceed with caution.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="destructive">Reset All Settings</Button>
                <Button variant="destructive">Purge All Data</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}