import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { motion } from 'framer-motion';
import { BedDouble, Bath, Square, MapPin, Star, Loader2 } from 'lucide-react';

const TopApartments = () => {
    const [buildings, setBuildings] = useState([]);
    const [userAgreements, setUserAgreements] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const auth = getAuth();

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        });
        return () => unsubscribe();
    }, [auth]);

  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const buildingRes = await axios.get("https://servercode-murex.vercel.app/buildings");
         
                setBuildings(buildingRes.data.slice(0, 6));

                if (user?.email) {
                    const agreementRes = await axios.get(`https://servercode-murex.vercel.app/api/user-agreements/${user.email}`);
                    setUserAgreements(agreementRes.data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    // ৩. এগ্রিমেন্ট রিকোয়েস্ট হ্যান্ডলার
    const handleAgreementRequest = async (apt) => {
        if (!user) return alert("Please Login First!");

        const payload = {
            userName: user.displayName || "Anonymous",
            userEmail: user.email,
            floorNo: apt.floorNo,
            blockName: apt.blockName,
            roomNo: apt.apartmentNo,
            rent: apt.rent,
            status: 'pending',
            requestDate: new Date().toLocaleDateString()
        };

        try {
            const res = await axios.post("https://servercode-murex.vercel.app/api/agreements/request", payload);
            if (res.status === 201 || res.status === 200) {
                alert("Agreement request sent successfully!");
                setUserAgreements([...userAgreements, { room: apt.apartmentNo, status: 'pending' }]);
            }
        } catch (err) {
            alert(err.response?.data?.message || "Failed to send request.");
        }
    };

    // ৪. বাটনের স্ট্যাটাস চেক
    const getButtonStatus = (aptNo) => {
        const agreement = userAgreements.find(a => a.room === aptNo);
        if (!agreement) return { text: "Book Now", class: "bg-[#1C1F32] hover:bg-indigo-600 text-white", disabled: false };
        if (agreement.status === 'accepted') return { text: "Booked", class: "bg-green-600 text-white cursor-not-allowed", disabled: true };
        if (agreement.status === 'pending') return { text: "Pending", class: "bg-yellow-500 text-white cursor-not-allowed", disabled: true };
        return { text: "Book Now", class: "bg-[#1C1F32] text-white", disabled: false };
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600 mb-2" size={40} />
            <p className="font-bold text-gray-500">Loading Top Offers...</p>
        </div>
    );

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-3">Featured</h2>
                        <p className="text-4xl font-black text-gray-900">Top Rated Apartments</p>
                    </div>
                    <a href="/apartments" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors border-b-2 border-indigo-600 pb-1">
                        View All Units
                    </a>
                </div>

                {/* Apartments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {buildings.map((apt) => {
                        const btnStatus = getButtonStatus(apt.apartmentNo);
                        return (
                            <motion.div 
                                key={apt._id}
                                whileHover={{ y: -10 }}
                                className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Image Section */}
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={apt.image} 
                                        alt="apartment" 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                                        <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">Floor: {apt.floorNo}</span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-gray-900/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 text-white">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs font-bold">4.9</span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        Unit {apt.apartmentNo} - {apt.blockName} Block
                                    </h3>
                                    
                                    <div className="flex items-center gap-1 text-gray-400 mb-6">
                                        <MapPin size={14} />
                                        <span className="text-sm font-medium">Prime Location, City Center</span>
                                    </div>

                                    {/* Features Row */}
                                    <div className="flex justify-between items-center py-4 border-t border-b border-gray-50 mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><BedDouble size={18} /></div>
                                            <span className="text-sm font-bold text-gray-700">3 Bed</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Bath size={18} /></div>
                                            <span className="text-sm font-bold text-gray-700">2 Bath</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Square size={18} /></div>
                                            <span className="text-sm font-bold text-gray-700">1200 sqft</span>
                                        </div>
                                    </div>

                                    {/* Price and Action */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-black text-gray-900">${apt.rent}</span>
                                            <span className="text-gray-400 text-sm font-medium"> / mo</span>
                                        </div>
                                        <button 
                                            disabled={btnStatus.disabled}
                                            onClick={() => handleAgreementRequest(apt)}
                                            className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${btnStatus.class}`}
                                        >
                                            {btnStatus.text}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TopApartments;