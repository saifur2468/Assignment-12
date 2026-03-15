import React, { useEffect, useState } from 'react';
import { auth } from '../Authsection/AuthContetx'; 
import { 
  Users, Megaphone, Handshake, Ticket, Menu, X, UserCircle, CreditCard, History 
} from 'lucide-react';
import { FaHome, FaStar, FaLink, FaHandPointLeft } from "react-icons/fa";
import { FaPersonRifle } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [admin, setAdmin] = useState({ name: "Loading...", photo: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const userEmail = auth.currentUser?.email;
  const isAdmin = userEmail === "mdislamshakib218@gmail.com"; 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAdmin({
          name: user.displayName || "User",
          photo: user.photoURL || "https://via.placeholder.com/150"
        });
      }
    });
    return () => unsubscribe();
  }, []);


  const adminMenuItems = [
    { name: 'Home Page', icon: <FaHome size={20}/>, path: '/' },
    { name: 'Admin Profile', icon: <FaPersonRifle size={20}/>, path: '/adminProfile' },
    { name: 'Manage Members', icon: <Users size={20}/>, path: '/ManageMembers' },
    { name: 'Make Announcement', icon: <Megaphone size={20}/>, path: '/MakeAnnunmante' },
    { name: 'Agreement Requests', icon: <Handshake size={20}/>, path: '/AgreementsRequest' },
    { name: 'Manage Coupons', icon: <Ticket size={20}/>, path: '/ManageCoupons'},
  ];


  const userMenuItems = [
    { name: 'Home Page', icon: <FaHome size={20}/>, path: '/' },
    { name: 'My Profile', icon: <UserCircle size={20}/>, path: '/userProfile' },
    { name: 'Make Payment', icon: <CreditCard size={20}/>, path: '/MakePayment' },
    { name: 'Payment History', icon: <History size={20}/>, path: '/paymentHistory' },
  ];


  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1e293b] text-white flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 flex flex-col items-center border-b border-gray-700 relative">
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 lg:hidden"><X size={24} /></button>
          <img src={admin.photo} alt="Profile" className="w-20 h-20 rounded-full border-4 border-indigo-500 mb-4 object-cover" />
          <h2 className="text-xl font-bold uppercase tracking-wider text-center">{admin.name}</h2>
          <p className="text-[10px] text-indigo-400 font-bold bg-indigo-900/50 px-3 py-1 rounded-full mt-1">
            {isAdmin ? "ADMIN DASHBOARD" : "USER DASHBOARD"}
          </p>
        </div>

        <nav className="flex-1 mt-6 overflow-y-auto">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setIsSidebarOpen(false)} className="flex items-center px-6 py-4 hover:bg-indigo-600 transition-colors gap-4">
              {item.icon}
              <span className="text-sm font-medium uppercase">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <header className="flex justify-between items-center p-4 md:p-8 bg-white shadow-sm">
          <h1 className="text-xl font-bold text-gray-700">
             {isAdmin ? "Admin Overview" : "Member Panel"}
          </h1>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 lg:hidden"><Menu size={28} /></button>
        </header>

        <div className="p-4 md:p-8">
          
           <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-300 text-center text-gray-400">
              Welcome to your {isAdmin ? "Admin" : "User"} Profile
           </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;