import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, X } from "lucide-react";

const AgreementRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agreements");
      console.log("Fetched Data:", res.data); // ডেটা চেক করার জন্য
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    if (window.confirm("Are you sure you want to accept?")) {
      try {
        // আপনার ব্যাকএন্ডে POST রুট দেওয়া আছে, তাই এখানে post হবে
        await axios.post(`http://localhost:5000/api/agreements/accept/${id}`);
        fetchRequests();
      } catch (err) {
        alert("Failed to accept");
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject?")) {
      try {
        await axios.post(`http://localhost:5000/api/agreements/reject/${id}`);
        fetchRequests();
      } catch (err) {
        alert("Failed to reject");
      }
    }
  };

  if (loading) return <div className="text-center py-20 text-blue-600 font-bold">Loading...</div>;

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Agreement Requests</h2>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            Pending: {requests.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                <th className="p-4 border-b">User Details</th>
                <th className="p-4 border-b">Apartment Info</th>
                <th className="p-4 border-b">Rent</th>
                <th className="p-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-400 font-medium">
                    No pending requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="p-4">
                      {/* ব্যাকএন্ড অনুযায়ী req.name এবং req.email */}
                      <div className="font-bold text-gray-900">{req.name}</div>
                      <div className="text-sm text-gray-500">{req.email}</div>
                    </td>
                    <td className="p-4">
                      {/* ব্যাকএন্ড অনুযায়ী floor, block, room */}
                      <div className="text-sm">
                        <span className="font-semibold">Floor:</span> {req.floor} | 
                        <span className="font-semibold ml-1">Block:</span> {req.block}
                      </div>
                      <div className="text-sm text-indigo-600 font-medium">
                        Room: {req.room}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-green-600">${req.rent}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => handleAccept(req._id)}
                          className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 text-sm font-medium"
                        >
                          <Check size={16} /> Accept
                        </button>
                        <button 
                          onClick={() => handleReject(req._id)}
                          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 text-sm font-medium"
                        >
                          <X size={16} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgreementRequests;