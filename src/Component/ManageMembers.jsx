import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserMinus, Mail, User, Users, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = async () => {
        try {
            const res = await axios.get("https://servercode-murex.vercel.app/api/members");
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
        Swal.fire({
            title: "Are you sure?",
            text: "This member will be downgraded to a regular user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, Remove",
            borderRadius: '15px'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.patch(`https://servercode-murex.vercel.app/api/members/remove/${email}`);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire("Success!", "Role updated to regular user.", "success");
                        fetchMembers();
                    }
                } catch (err) {
                    Swal.fire("Error", "Something went wrong!", "error");
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                <p className="text-slate-500 font-medium">Fetching members data...</p>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-[#f8fafc] min-h-screen font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Manage Members
                        </h2>
                        <p className="text-slate-500 mt-1 flex items-center gap-2">
                            <Users size={18} className="text-indigo-500" />
                            Total <span className="font-bold text-slate-800">{members.length}</span> active building members
                        </p>
                    </div>
                    <div className="h-1 w-20 bg-indigo-600 rounded-full md:hidden"></div>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    <th className="py-5 px-8 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member Details</th>
                                    <th className="py-5 px-8 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                                    <th className="py-5 px-8 text-xs font-semibold text-center text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="py-20 text-center">
                                            <div className="flex flex-col items-center opacity-40">
                                                <Users size={48} className="mb-2" />
                                                <p className="text-lg font-medium">No members found</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member) => (
                                        <tr key={member._id} className="hover:bg-indigo-50/30 transition-all group">
                                            <td className="py-5 px-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-100 to-blue-50 flex items-center justify-center text-indigo-600 border border-indigo-200 shadow-sm">
                                                        <User size={20} strokeWidth={2.5} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-base">{member.name}</p>
                                                        <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">Verified Member</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 px-8">
                                                <div className="flex items-center gap-2 text-slate-600 group-hover:text-indigo-600 transition-colors">
                                                    <Mail size={16} className="opacity-70" />
                                                    <span className="text-sm font-medium">{member.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-8 text-center">
                                                <button
                                                    onClick={() => handleRemoveMember(member.email)}
                                                    className="inline-flex items-center gap-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:shadow-md active:scale-95 group/btn"
                                                >
                                                    <UserMinus size={16} className="group-hover/btn:scale-110 transition-transform" />
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

                {/* Footer Info */}
                <p className="mt-6 text-center text-slate-400 text-sm">
                    Only authorized administrators can perform these actions.
                </p>
            </div>
        </div>
    );
};

export default ManageMembers;