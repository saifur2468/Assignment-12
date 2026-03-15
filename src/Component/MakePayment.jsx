import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "./Authsection/AuthContetx";
import { CreditCard, Tag, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MakePayment = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const user = auth.currentUser;
    const navigate = useNavigate();


    useEffect(() => {
        if (user?.email) {
            axios.get(`https://servercode-murex.vercel.app/api/payment-info/${user.email}`)
                .then((res) => {
                    setInfo(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Fetch Error:", err);
                    setLoading(false);
                });
        }
    }, [user]);


    const handleApplyCoupon = async () => {
        if (!couponCode) return Swal.fire("Error", "Please enter a coupon code", "info");

        try {
            const res = await axios.get("https://servercode-murex.vercel.app/api/coupons");
            const allCoupons = res.data;
            const validCoupon = allCoupons.find(c => c.code === couponCode && c.status === 'active');

            if (validCoupon) {
                setDiscount(validCoupon.discount);
                setAppliedCoupon(validCoupon.code);
                Swal.fire("Success!", `${validCoupon.discount}% discount applied!`, "success");
            } else {
                Swal.fire("Invalid!", "Coupon code is not valid or expired.", "error");
            }
        } catch (err) {
            Swal.fire("Error", "Failed to fetch coupons.", "error");
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        const month = e.target.month.value;

        if (month === "Pick a Month") {
            return Swal.fire("Wait", "Please select a month", "warning");
        }

        const finalAmount = info.rent - (info.rent * discount) / 100;


        const paymentRecord = {
            email: user.email,
            userName: user.displayName,
            floor: info.floor,
            block: info.block,
            room: info.room,
            month: month,
            payableAmount: finalAmount,
            transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            date: new Date().toISOString(),
            status: "Paid"
        };

        try {
            const res = await axios.post("https://servercode-murex.vercel.app/api/payments", paymentRecord);

            if (res.data.insertedId) {
                Swal.fire({
                    title: "Payment Successful!",
                    text: `You have successfully paid $${finalAmount} for ${month}.`,
                    icon: "success",
                    confirmButtonColor: "#4F46E5",
                });


                navigate("/paymentHistory");
            }
        } catch (err) {
            console.error("Payment Error:", err);
            Swal.fire("Error", "Something went wrong during payment.", "error");
        }
    };

    if (loading) return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <span className="loading loading-bars loading-lg text-indigo-600"></span>
            <p className="font-bold text-indigo-600 animate-pulse">Loading Payment Data...</p>
        </div>
    );

    if (!info) return (
        <div className="text-center py-20">
            <div className="bg-red-50 text-red-500 p-10 rounded-3xl inline-block border border-red-100 shadow-xl">
                <h2 className="text-2xl font-black mb-2 uppercase">No Active Agreement!</h2>
                <p>Please wait for admin approval or check your agreement status.</p>
            </div>
        </div>
    );

    const payableAmount = info.rent - (info.rent * discount) / 100;

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-indigo-600 p-6 text-white flex items-center gap-3 shadow-lg">
                    <CreditCard size={28} />
                    <h2 className="text-2xl font-black uppercase tracking-tight">Pay Rent</h2>
                </div>

                <form onSubmit={handlePaymentSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Floor</label>
                            <input type="text" value={info.floor} readOnly className="input input-bordered w-full bg-slate-100 font-bold" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Block</label>
                            <input type="text" value={info.block} readOnly className="input input-bordered w-full bg-slate-100 font-bold" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Room No</label>
                            <input type="text" value={info.room} readOnly className="input input-bordered w-full bg-slate-100 font-bold" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Original Rent</label>
                            <input type="text" value={`$${info.rent}`} readOnly className="input input-bordered w-full bg-slate-100 font-black text-indigo-600" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-slate-600 uppercase">Select Payment Month</label>
                            <select name="month" required defaultValue="Pick a Month" className="select select-bordered w-full focus:ring-2 ring-indigo-500 font-bold">
                                <option disabled>Pick a Month</option>
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Coupon Section */}
                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <label className="text-sm font-bold text-indigo-900 flex items-center gap-2 mb-3">
                            <Tag size={18} /> Apply Discount Coupon
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter Code (e.g. SAVE10)"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="input input-bordered flex-1 rounded-xl font-bold uppercase"
                            />
                            <button
                                type="button"
                                onClick={handleApplyCoupon}
                                className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-8"
                            >
                                Apply
                            </button>
                        </div>
                        {discount > 0 && (
                            <p className="text-green-600 font-bold mt-2 flex items-center gap-2 text-sm bg-white p-2 rounded-lg inline-block">
                                <CheckCircle2 size={16} /> {discount}% Discount Applied!
                            </p>
                        )}
                    </div>

                    {/* Final Summary & Pay Button */}
                    <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl text-white shadow-2xl">
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Amount to Pay</p>
                            <h3 className="text-4xl font-black text-indigo-400">${payableAmount}</h3>
                        </div>
                        <button type="submit" className="btn btn-lg bg-indigo-500 hover:bg-indigo-400 border-none text-white px-10 rounded-xl font-black shadow-lg">
                            Pay Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakePayment;