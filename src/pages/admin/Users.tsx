import AdminLayout from "../../components/layouts/AdminLayout";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, UserPlus, UserX, Edit, Eye, X, Check, MoreHorizontal } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "pending";
  joined: string;
};

// Mock user data
const mockUsers: User[] = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", status: "active", joined: "2023-01-15" },
  { id: "2", name: "Regular User", email: "user@example.com", role: "user", status: "active", joined: "2023-02-20" },
  { id: "3", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", joined: "2023-03-10" },
  { id: "4", name: "John Doe", email: "john@example.com", role: "user", status: "inactive", joined: "2023-04-05" },
  { id: "5", name: "Alice Johnson", email: "alice@example.com", role: "user", status: "pending", joined: "2023-05-12" },
  { id: "6", name: "Bob Williams", email: "bob@example.com", role: "admin", status: "active", joined: "2023-06-18" },
  { id: "7", name: "Carol Martinez", email: "carol@example.com", role: "user", status: "active", joined: "2023-07-22" },
  { id: "8", name: "Dave Wilson", email: "dave@example.com", role: "user", status: "inactive", joined: "2023-08-30" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleActionId, setVisibleActionId] = useState<string | null>(null);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (userId: string, newStatus: User["status"]) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast.success(`User status updated to ${newStatus}`);
    setVisibleActionId(null);
  };

  const handleRoleToggle = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { 
          ...user, 
          role: user.role === "admin" ? "user" : "admin" 
        } : user
      )
    );
    
    const updatedUser = users.find(user => user.id === userId);
    const newRole = updatedUser?.role === "admin" ? "user" : "admin";
    
    toast.success(`User role updated to ${newRole}`);
    setVisibleActionId(null);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast.success("User deleted successfully");
      setVisibleActionId(null);
    }
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-slate-100 text-slate-800";
      case "pending": return "bg-amber-100 text-amber-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-slate-600">Manage all users in the system</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search users..." 
                className="pl-9 w-full" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-4 font-medium text-slate-500">Name</th>
                  <th className="text-left p-4 font-medium text-slate-500">Email</th>
                  <th className="text-left p-4 font-medium text-slate-500">Role</th>
                  <th className="text-left p-4 font-medium text-slate-500">Status</th>
                  <th className="text-left p-4 font-medium text-slate-500">Joined</th>
                  <th className="text-right p-4 font-medium text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                          <span className="font-medium text-slate-600">{user.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{user.email}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{new Date(user.joined).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <div className="relative">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setVisibleActionId(visibleActionId === user.id ? null : user.id)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        
                        {visibleActionId === user.id && (
                          <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg border border-slate-200">
                            <div className="py-1">
                              <button 
                                className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" 
                                onClick={() => {}}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </button>
                              <button 
                                className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" 
                                onClick={() => {}}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </button>
                              <button 
                                className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" 
                                onClick={() => handleRoleToggle(user.id)}
                              >
                                {user.role === "admin" ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-2" />
                                    Remove Admin
                                  </>
                                ) : (
                                  <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Make Admin
                                  </>
                                )}
                              </button>
                              {user.status !== "active" && (
                                <button 
                                  className="flex w-full items-center px-4 py-2 text-sm text-green-700 hover:bg-slate-100" 
                                  onClick={() => handleStatusChange(user.id, "active")}
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Activate User
                                </button>
                              )}
                              {user.status !== "inactive" && (
                                <button 
                                  className="flex w-full items-center px-4 py-2 text-sm text-amber-700 hover:bg-slate-100" 
                                  onClick={() => handleStatusChange(user.id, "inactive")}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Deactivate User
                                </button>
                              )}
                              <button 
                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-slate-100" 
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <UserX className="h-4 w-4 mr-2" />
                                Delete User
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-slate-500">
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}