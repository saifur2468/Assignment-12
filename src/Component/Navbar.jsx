import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Authsection/AuthContetx'; 
import { HiMenuAlt3, HiX } from "react-icons/hi"; 

const pages = [
    { name: 'Home', path: '/' },
    { name: 'Appartments', path: '/Appartments' },
    { name: 'Contact', path: '/ContactSection' }
];

const settings = [
    { name: 'Profile', },
    { name: 'Dashboard', path: '/dashboard' }
];

const ResponsiveAppBar = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const [userMenuOpen, setUserMenuOpen] = useState(false); 
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            setUserMenuOpen(false);
            navigate('/login');
        });
    };

    return (
        <nav className="bg-[#020314] border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#6366f1] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <Link to="/" className="text-white font-bold text-2xl tracking-tighter uppercase">
                            Building
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {pages.map((page) => (
                            <Link 
                                key={page.name} 
                                to={page.path} 
                                className="text-gray-300 hover:text-[#6366f1] font-medium transition-colors"
                            >
                                {page.name}
                            </Link>
                        ))}
                    </div>

                    {/* User Section (Conditional) */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center focus:outline-none"
                                >
                                    <img 
                                        className="h-10 w-10 rounded-full border-2 border-indigo-500 p-0.5 object-cover" 
                                        src={user?.photoURL || "https://i.ibb.co/mR9798S/user.png"} 
                                        alt="Profile" 
                                    />
                                </button>

                                {/* User Dropdown */}
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-[#0a0c1f] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                                        {settings.map((item) => (
                                            <Link 
                                                key={item.name} 
                                                to={item.path}
                                                className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 font-semibold"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                            >
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-300 hover:text-white focus:outline-none"
                            >
                                {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isOpen && (
                <div className="md:hidden bg-[#020314] border-t border-white/5 px-4 pt-4 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
                    {pages.map((page) => (
                        <Link 
                            key={page.name} 
                            to={page.path} 
                            className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {page.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default ResponsiveAppBar;