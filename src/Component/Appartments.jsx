import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Appartments = () => {
    const [buildings, setBuildings] = useState([]);
    const [userAgreements, setUserAgreements] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const itemsPerPage = 6;

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
                // ১. বিল্ডিং ডেটা ফেচ
                const buildingRes = await axios.get("https://servercode-murex.vercel.app/buildings");
                setBuildings(buildingRes.data);

                // ২. যদি ইউজার লগইন থাকে, তবে তার এগ্রিমেন্ট স্ট্যাটাস ফেচ করা
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
    }, [user]); // ইউজার চেঞ্জ হলে আবার ডাটা আনবে

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
                alert("Agreement request sent!");
                // রিকোয়েস্ট পাঠানোর পর লিস্ট আপডেট করে দেওয়া যাতে বাটন চেঞ্জ হয়
                setUserAgreements([...userAgreements, { room: apt.apartmentNo, status: 'pending' }]);
            }
        } catch (err) {
            alert(err.response?.data?.message || "Failed to send request.");
        }
    };

    // ৩. বাটনের টেক্সট এবং স্টাইল নির্ধারণ করার ফাংশন
    const getButtonStatus = (aptNo) => {
        const agreement = userAgreements.find(a => a.room === aptNo);
        if (!agreement) return { text: "Agreement Request", class: "bg-transparent border-indigo-500/30 hover:bg-indigo-600", disabled: false };
        if (agreement.status === 'accepted') return { text: "Selected / Booked", class: "bg-green-600 border-green-600 cursor-not-allowed", disabled: true };
        if (agreement.status === 'pending') return { text: "Request Pending", class: "bg-yellow-600 border-yellow-600 cursor-not-allowed", disabled: true };
        return { text: "Agreement Request", class: "bg-transparent border-indigo-500/30", disabled: false };
    };

    const filteredBuildings = buildings.filter(apt => {
        const rent = parseInt(apt.rent);
        const min = minPrice === '' ? 0 : parseInt(minPrice);
        const max = maxPrice === '' ? Infinity : parseInt(maxPrice);
        return rent >= min && rent <= max;
    });

    const currentItems = filteredBuildings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredBuildings.length / itemsPerPage);

    if (loading) return <div className="text-white text-center py-20 font-bold">Loading...</div>;

    return (
        <div className="min-h-screen bg-white text-black p-10">
            {/* Search inputs code remains the same... */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {currentItems.map((apt) => {
                    const btnStatus = getButtonStatus(apt.apartmentNo);
                    return (
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <img
        src={apt.image}
        alt={apt.apartmentNo}
        className="w-full h-56 object-cover"
    />

    <div className="p-5">
        <h2 className="text-xl font-bold">
            Apartment {apt.apartmentNo}
        </h2>

        <p className="text-gray-600 mt-1">
            Block: {apt.blockName} | Floor: {apt.floorNo}
        </p>

        <p className="text-lg font-semibold text-green-600 mt-2">
            Rent: ${apt.rent}/month
        </p>

        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            <p>🛏️ Bedrooms: {apt.bedrooms}</p>
            <p>🚿 Bathrooms: {apt.bathrooms}</p>
            <p>🛋️ Drawing: {apt.drawingRooms}</p>
            <p>🍳 Kitchen: {apt.kitchens}</p>
            <p>🌇 Balconies: {apt.balconies}</p>
            <p>📐 Area: {apt.area} sq.ft</p>
        </div>

        <div className="mt-4">
            <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                    apt.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}
            >
                {apt.status}
            </span>
        </div>

        <button
            disabled={btnStatus.disabled}
            className={`mt-6 border-2 rounded-xl w-full h-[54px] font-bold transition-all active:scale-95 ${btnStatus.class}`}
            onClick={() => handleAgreementRequest(apt)}
        >
            {btnStatus.text}
        </button>
    </div>
</div>
                    );
                })}
            </div>
            {/* Pagination code remains same... */}
        </div>
    );
};

export default Appartments;