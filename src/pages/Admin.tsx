import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Mock user data
const users = [
  { id: 1, name: "John Doe", email: "user@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Inactive" },
];

export default function Admin() {
  const navigate = useNavigate();
  
  // Check authentication
  useEffect(() => {
    const authUser = localStorage.getItem('authUser');
    if (!authUser) {
      navigate('/login');
      return;
    }
    
    const { role } = JSON.parse(authUser);
    if (role !== 'admin') {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Total registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Currently active users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{users.filter(u => u.status === "Active").length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Overall system health</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-500">Healthy</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage system users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all registered users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}