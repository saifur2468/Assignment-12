import React, { useState } from 'react';
import Lottie from "lottie-react";
import loginAnimation from "../../../public/login.json"; // তোমার লটি ফাইলটি এখানে রাখো
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../Authsection/AuthContetx"; // তোমার অথ কন্টেক্সট পাথ
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from 'react-hot-toast';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

  
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                toast.success("Successfully Logged In!");
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(() => {
                toast.success("Logged In with Google!");
                navigate('/');
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="min-h-screen bg-[#020314] flex items-center justify-center p-6">
            <div className="max-w-5xl w-full bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row items-center">
                
                {/* Left Side: Lottie Animation */}
                <div className="w-full md:w-1/2 p-10 bg-indigo-600/10">
                    <Lottie animationData={loginAnimation} loop={true} />
                    <div className="text-center mt-6">
                        <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
                        <p className="text-gray-400 mt-2">Manage your building efficiently with Clarity.</p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-10 md:p-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Login</h2>
                    
                    <form onSubmit={handleLogin} className="space-y-6">
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
                                placeholder="••••••••" 
                            />
                        </div>

                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02]">
                            Sign In
                        </button>
                    </form>

                    <div className="divider text-gray-500 my-8 text-xs uppercase tracking-widest">OR</div>

                    {/* Social Login */}
                    <button 
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-3 rounded-xl hover:bg-white/10 transition-all"
                    >
                        <FaGoogle className="text-red-500" /> Sign in with Google
                    </button>

                    <p className="text-center text-gray-400 mt-8 text-sm">
                        Don't have an account? <Link to="/signup" className="text-indigo-400 hover:underline">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;