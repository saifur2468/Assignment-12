import React, { useState } from 'react';
import Lottie from "lottie-react";
import regAnimation from "../../../public/sign.json"; // লটি এনিমেশন ফাইল
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Authsection/AuthContetx'; // তোমার অথ কন্টেক্সট পাথ
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // ১. পাসওয়ার্ড ভেরিফিকেশন লজিক
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long!");
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error("Password must have at least one Uppercase letter!");
        }
        if (!/[a-z]/.test(password)) {
            return toast.error("Password must have at least one Lowercase letter!");
        }

        // ২. ফায়ারবেস ইউজার ক্রিয়েশন
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // ইউজার নেম আপডেট করা
                updateProfile(result.user, {
                    displayName: name
                }).then(() => {
                    toast.success("Registration Successful!");
                    navigate('/'); // সফল হলে হোমে নিয়ে যাবে
                });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen bg-[#020314] flex items-center justify-center p-6">
            <div className="max-w-5xl w-full bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row-reverse items-center">
                
                {/* Right Side: Lottie Animation (Reverse Layout) */}
                <div className="w-full md:w-1/2 p-10 bg-indigo-600/10">
                    <Lottie animationData={regAnimation} loop={true} />
                    <div className="text-center mt-6">
                        <h2 className="text-2xl font-bold text-white">Join Us Today!</h2>
                        <p className="text-gray-400 mt-2">Start your journey with our smart building management.</p>
                    </div>
                </div>

                {/* Left Side: Registration Form */}
                <div className="w-full md:w-1/2 p-10 md:p-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Create Account</h2>
                    
                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Full Name</label>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all" 
                                placeholder="Saifur Rahman" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all" 
                                placeholder="name@example.com" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all" 
                                placeholder="Must be 6+ characters" 
                            />
                        </div>

                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20">
                            Register
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-8 text-sm">
                        Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;