import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom, logout, TEST_USERS } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Shield, Users } from "lucide-react";

export default function AdminDashboard() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    setUser(logout());
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Card className="mb-6 border-indigo-100 bg-indigo-50">
          <CardHeader>
            <CardTitle className="text-indigo-700">
              Welcome, Admin {user?.username}!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-indigo-700">
              You have full administrative access to the system.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>System Statistics</CardTitle>
              <Users className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Total Users</dt>
                  <dd className="text-2xl font-bold">{TEST_USERS.length}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Admin Users</dt>
                  <dd className="text-2xl font-bold">
                    {TEST_USERS.filter(u => u.role === "admin").length}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Regular Users</dt>
                  <dd className="text-2xl font-bold">
                    {TEST_USERS.filter(u => u.role === "user").length}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button className="justify-start">Manage Users</Button>
              <Button className="justify-start">System Settings</Button>
              <Button className="justify-start">View Logs</Button>
              <Button className="justify-start">Security Settings</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TEST_USERS.map((testUser) => (
                  <TableRow key={testUser.id}>
                    <TableCell>{testUser.id}</TableCell>
                    <TableCell>{testUser.username}</TableCell>
                    <TableCell className="capitalize">{testUser.role}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}