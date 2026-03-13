import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserMinus, Mail, User } from 'lucide-react';
import Swal from 'sweetalert2'; // সুন্দর এলার্টের জন্য (ঐচ্ছিক)

const ManageMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/members");
            setMembers(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleRemoveMember = async (email) => {
        // কনফার্মেশন প্রম্পট
        Swal.fire({
            title: "Are you sure?",
            text: "This member will be downgraded to a regular user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6366f1",
            confirmButtonText: "Yes, remove him!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.patch(`http://localhost:5000/api/members/remove/${email}`);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire("Removed!", "Member has been changed to user.", "success");
                        fetchMembers(); // লিস্ট আপডেট করা
                    }
                } catch (err) {
                    Swal.fire("Error", "Failed to remove member", "error");
                }
            }
        });
    };

    if (loading) return <div className="text-center py-20 font-bold text-indigo-600">Loading Members...</div>;

    return (
        <div className="p-4 md:p-8 bg-white min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-800">Manage Members</h2>
                    <p className="text-slate-500">Currently active building members: {members.length}</p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Head */}
                            <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-widest font-bold">
                                <tr>
                                    <th className="py-5 px-6">User Details</th>
                                    <th>Email Address</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-20 text-slate-400 font-medium">
                                            No members found in the database.
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member) => (
                                        <tr key={member._id} className="hover:bg-slate-50 transition-colors border-b border-slate-50">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                        <User size={20} />
                                                    </div>
                                                    <span className="font-bold text-slate-700">{member.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-slate-500 font-medium italic underline underline-offset-4 decoration-slate-200">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={16} className="text-slate-400" />
                                                    {member.email}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <button 
                                                    onClick={() => handleRemoveMember(member.email)}
                                                    className="btn btn-error btn-sm text-black px-5 rounded-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md shadow-red-100"
                                                >
                                                    <UserMinus size={16} />
                                                    Remove Member
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageMembers;