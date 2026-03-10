import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="bg-[#020314] text-white py-20 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left Side: Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="text-[#6366f1] font-semibold tracking-widest uppercase text-sm">
                        Discover Our Building
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                        About Our Building: <br /> 
                        <span className="text-gray-400">Innovative Solutions for Modern Living</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Experience a digital-first lifestyle in our state-of-the-art building. We provide an environment where luxury meets functionality, designed specifically for the next generation of residents.
                    </p>

                    {/* Features List */}
                    <ul className="space-y-4 mb-10">
                        {[
                            "Advanced Security & 24/7 Monitoring",
                            "World-class Modern Facilities & Gym",
                            "High-speed Digital Infrastructure",
                            "Smart Home Automation Systems"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <div className="bg-[#6366f1] p-1 rounded-full">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-gray-300 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <button className="bg-[#6366f1] hover:bg-[#4f46e5] px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20">
                        Discover More
                    </button>
                </motion.div>

                {/* Right Side: Overlapping Images */}
                <div className="relative">
                    {/* Main Image (Background) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" 
                            alt="Modern Building" 
                            className="w-full h-[400px] md:h-[500px] object-cover"
                        />
                    </motion.div>

                    {/* Secondary Image (Foreground) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-10 -left-6 md:-left-12 w-2/3 md:w-3/5 rounded-2xl overflow-hidden border-4 border-[#020314] shadow-2xl"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c" 
                            alt="Building Interior" 
                            className="w-full h-[250px] object-cover"
                        />
                    </motion.div>

                    {/* Stats Card */}
                    <div className="absolute top-10 -right-6 md:-right-10 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hidden sm:block">
                        <div className="flex gap-8">
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-[#6366f1]">24/7</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Security</p>
                            </div>
                            <div className="w-[1px] bg-white/10 h-10 self-center"></div>
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-[#6366f1]">100%</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Modern</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;