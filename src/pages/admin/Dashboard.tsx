import AdminLayout from "../../components/layouts/AdminLayout";
import { BarChart3, TrendingUp, Users, UserCheck, User, CreditCard, Activity } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: "1,248", icon: Users, color: "bg-blue-500", change: "+12.5%" },
    { title: "Active Users", value: "946", icon: UserCheck, color: "bg-green-500", change: "+5.2%" },
    { title: "New Signups", value: "48", icon: User, color: "bg-purple-500", change: "+14.8%" },
    { title: "Revenue", value: "$12,675", icon: CreditCard, color: "bg-amber-500", change: "+7.3%" },
  ];

  const activities = [
    { user: "John Doe", action: "created a new account", time: "5 minutes ago" },
    { user: "Jane Smith", action: "updated their profile", time: "2 hours ago" },
    { user: "Robert Johnson", action: "made a payment", time: "4 hours ago" },
    { user: "Emily Wilson", action: "submitted a support ticket", time: "1 day ago" },
    { user: "Michael Brown", action: "deleted their account", time: "2 days ago" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-600">Overview of your application's statistics and activities.</p>
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
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold mr-2">{stat.value}</h3>
                    <span className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-slate-600" />
                User Growth
              </h2>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between border-b border-slate-100 pt-6">
              {/* Simple chart visualization */}
              {[35, 55, 45, 65, 75, 60, 50].map((height, i) => (
                <div key={i} className="w-full">
                  <div 
                    className="bg-indigo-500 rounded-t w-10/12 mx-auto" 
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-center text-xs mt-2 text-slate-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-slate-600" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex items-start space-x-3 pb-3 border-b border-slate-100">
                  <div className="bg-indigo-100 h-8 w-8 rounded-full flex items-center justify-center text-indigo-700 font-semibold text-sm">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">{activity.user}</span> 
                      <span className="text-slate-600"> {activity.action}</span>
                    </p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}