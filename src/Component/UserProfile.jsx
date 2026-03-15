import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "./Authsection/AuthContetx";
import { Calendar, Home, Mail, MapPin, Layers, Clock, CheckCircle2, ListFilter, User as UserIcon, Loader2 } from "lucide-react";

const UserProfile = () => {
    const [apartmentInfo, setApartmentInfo] = useState(null);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("profile"); 
    const user = auth.currentUser;

    useEffect(() => {
        if (user?.email) {
            const fetchData = async () => {
                try {
                    // Fetch Profile & Active Apartment
                    const profileRes = await axios.get(`https://servercode-murex.vercel.app/api/user-profile/${user.email}`);
                    setApartmentInfo(profileRes.data);

                    // Fetch All Requests made by this user
                    const requestsRes = await axios.get(`https://servercode-murex.vercel.app/api/my-requests/${user.email}`);
                    setMyRequests(requestsRes.data);
                } catch (err) {
                    console.error("Error fetching data:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                <p className="text-slate-500 font-medium tracking-wide">Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 bg-[#F8FAFC] min-h-screen">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Profile Section */}
                <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/150"}
                                alt="User"
                                className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg object-cover"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white ring-1 ring-green-100"></div>
                        </div>
                        
                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{user?.displayName || "Member Name"}</h2>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 mt-1">
                                <Mail size={16} className="text-indigo-500" />
                                <span className="text-sm font-medium">{user?.email}</span>
                            </div>
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-bold uppercase tracking-wider border border-indigo-100">
                                    {apartmentInfo ? "Active Member" : "Guest User"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-6 bg-slate-200/50 p-1.5 rounded-2xl w-fit">
                    <button 
                        onClick={() => setActiveTab("profile")}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "profile" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        My Apartment
                    </button>
                    <button 
                        onClick={() => setActiveTab("requests")}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "requests" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        Application History
                    </button>
                </div>

                {/* Tab Content: Profile/Active Apartment */}
                {activeTab === "profile" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Home className="text-indigo-600" size={20} /> Current Apartment
                                </h3>
                                {apartmentInfo && (
                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-md font-black uppercase">Occupied</span>
                                )}
                            </div>

                            {apartmentInfo ? (
                                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <InfoCard icon={<Calendar />} label="Agreement Date" value={new Date(apartmentInfo.acceptDate).toLocaleDateString()} />
                                    <InfoCard icon={<Layers />} label="Floor Number" value={`Floor ${apartmentInfo.floorNo}`} />
                                    <InfoCard icon={<MapPin />} label="Block Name" value={`Block - ${apartmentInfo.blockName}`} />
                                    <InfoCard icon={<Home />} label="Apartment No" value={`Room #${apartmentInfo.apartmentNo}`} />
                                </div>
                            ) : (
                                <div className="p-16 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                        <Home size={32} />
                                    </div>
                                    <p className="text-slate-400 font-medium">You don't have an active apartment yet.</p>
                                   
                                    <button className="mt-4 text-indigo-600 font-bold text-sm hover:underline">Apply for an apartment →</button>
                                   
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Tab Content: My Requests */}
                {activeTab === "requests" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-4">
                            {myRequests.length > 0 ? (
                                myRequests.map((req, index) => (
                                    <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-50 rounded-xl text-slate-600">
                                                <ListFilter size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">Room #{req.apartmentNo}</p>
                                                <p className="text-xs text-slate-500">Floor: {req.floorNo} | Block: {req.blockName}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-6">
                                            <div className="text-right hidden md:block">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Applied On</p>
                                                <p className="text-sm font-medium text-slate-700">{new Date(req.requestDate || Date.now()).toLocaleDateString()}</p>
                                            </div>
                                            
                                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                                                req.status === 'checked' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {req.status === 'checked' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                                                {req.status === 'checked' ? 'Accepted' : 'Pending Review'}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-[2rem] p-20 text-center border border-dashed border-slate-200">
                                    <p className="text-slate-400">No application history found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper Component for Info Cards
const InfoCard = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
        <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
            {React.cloneElement(icon, { size: 22 })}
        </div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-lg font-bold text-slate-700 tracking-tight">{value}</p>
        </div>
    </div>
);

export default UserProfile;