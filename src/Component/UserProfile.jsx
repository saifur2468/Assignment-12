import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "./Authsection/AuthContetx";
import { Calendar, Home, Mail, User, MapPin, Layers } from "lucide-react";

const UserProfile = () => {
  const [apartmentInfo, setApartmentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/api/user-profile/${user.email}`)
        .then((res) => {
          setApartmentInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div className="text-center py-20 font-bold text-indigo-600">Loading Profile...</div>;

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="relative">
            <img 
              src={user?.photoURL || "https://via.placeholder.com/150"} 
              alt="User" 
              className="w-32 h-32 rounded-full border-4 border-indigo-500 p-1 object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-800">{user?.displayName || "Member Name"}</h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mt-2">
              <Mail size={18} className="text-indigo-500" />
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="mt-4 inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest">
              Verified Member
            </div>
          </div>
        </div>

        {/* Apartment Information Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-indigo-600 p-4 text-white flex items-center gap-3">
            <Home size={24} />
            <h3 className="font-bold text-lg">Rented Apartment Information</h3>
          </div>

          {apartmentInfo ? (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Accept Date */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Agreement Date</p>
                  <p className="text-lg font-bold text-gray-700">
                    {new Date(apartmentInfo.acceptDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Floor Info */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                  <Layers size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Floor No</p>
                  <p className="text-lg font-bold text-gray-700">{apartmentInfo.floorNo}</p>
                </div>
              </div>

              {/* Block Info */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Block Name</p>
                  <p className="text-lg font-bold text-gray-700">Block - {apartmentInfo.blockName}</p>
                </div>
              </div>

              {/* Room No */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                  <Home size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Apartment No</p>
                  <p className="text-lg font-bold text-gray-700">Room #{apartmentInfo.apartmentNo}</p>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-20 text-center">
              <p className="text-gray-400 italic">No active rental agreement found.</p>
              <button className="mt-4 btn btn-outline btn-indigo btn-sm">Browse Apartments</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserProfile;