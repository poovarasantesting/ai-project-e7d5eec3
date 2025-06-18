import UserLayout from "../../components/layouts/UserLayout";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Full-stack developer passionate about creating intuitive user experiences.",
    location: "San Francisco, CA",
    website: "https://example.com"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save to the backend here
    setTimeout(() => {
      toast.success("Profile updated successfully");
      setIsEditing(false);
    }, 600);
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-10 mb-6">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-600">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-4">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-slate-600">{user?.email}</p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                  <p className="text-xs text-slate-500">Email cannot be changed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input 
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button type="submit">Save Changes</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Bio</h3>
                  <p>{formData.bio}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Location</h3>
                    <p>{formData.location}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Website</h3>
                    <a href={formData.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      {formData.website}
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Role</h3>
                    <p className="capitalize">{user?.role}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Member Since</h3>
                    <p>April 2023</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}