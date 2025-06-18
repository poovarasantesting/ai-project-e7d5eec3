import UserLayout from "../../components/layouts/UserLayout";
import { useAuth } from "../../contexts/AuthContext";
import { BarChart, Clock, Mail, Users } from "lucide-react";

export default function UserDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: "Total Messages", value: "12", icon: Mail, color: "bg-blue-500" },
    { title: "Projects", value: "3", icon: Users, color: "bg-green-500" },
    { title: "Hours Logged", value: "28.5", icon: Clock, color: "bg-purple-500" },
    { title: "Performance", value: "92%", icon: BarChart, color: "bg-amber-500" },
  ];

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-slate-600">Here's what's happening with your account today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start space-x-4 pb-4 border-b border-slate-100">
                <div className="bg-slate-200 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
                <div>
                  <p className="font-medium">Activity {item}</p>
                  <p className="text-sm text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p className="text-xs text-slate-400 mt-1">{item} day{item !== 1 ? 's' : ''} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['New Project', 'Send Message', 'Update Profile', 'View Reports'].map((action, index) => (
              <button
                key={index}
                className="p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-center transition-colors"
              >
                <p className="font-medium">{action}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}