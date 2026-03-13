import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { Users, Home, UserCheck, TrendingUp, PieChart as PieIcon } from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid 
} from 'recharts';

const AdminProfile = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin-stats")
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-ring loading-lg text-indigo-600"></span>
    </div>
  );

  // চার্ট ডেটা ফরম্যাটিং
  const pieData = [
    { name: 'Available', value: parseFloat(stats.availablePercent) },
    { name: 'Occupied', value: parseFloat(stats.unavailablePercent) },
  ];

  const barData = [
    { name: 'Total Users', count: stats.totalUsers },
    { name: 'Members', count: stats.totalMembers },
  ];

  const COLORS = ['#10B981', '#EF4444']; // Green for Available, Red for Occupied

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header & Admin Info --- */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                alt="Admin" 
                className="w-24 h-24 rounded-2xl object-cover border-4 border-indigo-50 shadow-inner"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">{user?.displayName || "Admin User"}</h2>
              <p className="text-slate-500 font-medium">{user?.email}</p>
              <div className="badge badge-indigo mt-2 p-3 font-bold uppercase text-[10px] tracking-widest">Admin Dashboard</div>
            </div>
          </div>
          <div className="hidden lg:block">
             <TrendingUp size={80} className="text-indigo-50" />
          </div>
        </div>

        {/* --- Stats Summary Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Home />} label="Total Rooms" value={stats.totalRooms} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard icon={<Users />} label="Total Users" value={stats.totalUsers} color="text-blue-600" bg="bg-blue-50" />
          <StatCard icon={<UserCheck />} label="Members" value={stats.totalMembers} color="text-purple-600" bg="bg-purple-50" />
          <StatCard icon={<PieIcon />} label="Occupied" value={`${stats.unavailablePercent}%`} color="text-red-600" bg="bg-red-50" />
        </div>

        {/* --- Charts Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Room Availability Pie Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-4 px-2 italic border-l-4 border-indigo-500 ml-2">&nbsp; Room Availability Ratio</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* User vs Member Bar Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-4 px-2 italic border-l-4 border-indigo-500 ml-2">&nbsp; User Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="count" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

// ছোট কার্ডের জন্য সাব-কম্পোনেন্ট
const StatCard = ({ icon, label, value, color, bg }) => (
  <div className="bg-white p-5 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-100 transition-transform hover:scale-105">
    <div className={`p-3 rounded-xl ${bg} ${color}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{label}</p>
      <p className="text-xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default AdminProfile;