import React from 'react';
import { ShieldCheck, Wallet, Headphones, Lock, Search, CalendarCheck, Home } from 'lucide-react';

const FeaturesAndSteps = () => {
  // Why Choose Us Data
  const features = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Verified Listings",
      desc: "Every apartment is manually verified by our team to ensure quality and safety."
    },
    {
      icon: <Wallet size={32} />,
      title: "No Hidden Fees",
      desc: "Transparent pricing with no surprise charges at the final checkout."
    },
    {
      icon: <Headphones size={32} />,
      title: "24/7 Support",
      desc: "Our dedicated support team is available around the clock to help you."
    },
    {
      icon: <Lock size={32} />,
      title: "Secure Payment",
      desc: "100% secure payment gateway supporting all major credit cards and mobile banking."
    }
  ];

  // How It Works Data
  const steps = [
    {
      icon: <Search size={40} />,
      title: "Find Your Best Place",
      desc: "Browse through hundreds of verified apartments in your preferred location."
    },
    {
      icon: <CalendarCheck size={40} />,
      title: "Book with Confidence",
      desc: "Select your dates, apply coupons, and confirm your booking instantly."
    },
    {
      icon: <Home size={40} />,
      title: "Enjoy Your Stay",
      desc: "Check-in smoothly and experience the comfort of your chosen home."
    }
  ];

  return (
    <div className="space-y-24 py-20 bg-white">
      
      {/* --- Section 1: Why Choose Us --- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Why Choose Us</h2>
          <p className="text-4xl font-black text-gray-900">Experience the Best Booking Service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div key={index} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* --- Section 2: How It Works --- */}
      

    </div>
  );
};

export default FeaturesAndSteps;