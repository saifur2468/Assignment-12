import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Copy } from 'lucide-react';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API থেকে ডেটা নিয়ে আসা
    axios.get("https://servercode-murex.vercel.app/api/coupons")
      .then(res => {
        setCoupons(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  if (loading) return <div className="text-center py-20 font-bold text-indigo-600">Checking for offers...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-black text-center mb-12 text-gray-800">Available Promotions</h2>

      {/* Grid columns fix: changed from grid-cols-4 to grid-cols-1 for mobile responsiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 justify-items-center">
        {coupons.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">No active coupons right now. Check back later!</p>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon._id} className="relative bg-white rounded-3xl shadow-lg overflow-hidden flex h-64 w-full max-w-[550px] border border-gray-100">
              
              {/* Left Section (Dark/Navy Blue) */}
              <div className="bg-[#1C1F32] w-[40%] p-6 flex flex-col justify-between text-white relative">
                <p className="text-[#FF9F1C] font-bold text-[10px] tracking-[0.2em] uppercase">
                  STYLEVAULT
                </p>
                
                <div className="flex items-start leading-none">
                  <span className="text-3xl font-bold text-[#FF9F1C] mt-2">%</span>
                  <span className="text-8xl font-black ml-1">{coupon.discount}</span>
                </div>
                
                <div className="mb-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold mb-1">OFF SITEWIDE</p>
                  <p className="text-[10px] text-gray-500">Expires {new Date(coupon.expiry).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                {/* Vertical Semi-Circles (The Ticket Edge) */}
                <div className="absolute top-0 right-[-10px] h-full flex flex-col justify-between py-2 z-10">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-white rounded-full -mr-2"></div>
                  ))}
                </div>
              </div>

              {/* Right Section (White) */}
              <div className="bg-white w-[60%] p-6 flex flex-col justify-between ml-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 capitalize leading-tight">
                      {coupon.title || "Summer flash sale"}
                    </h3>
                    <span className="text-[10px] text-[#BC9158] font-bold bg-[#FFF7EB] px-3 py-1 rounded-full uppercase tracking-wide">
                      Limited
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-snug">
                    {coupon.description}
                  </p>
                </div>

                <div className="mt-auto">
                   <div className="w-full h-[1px] border-t border-dashed border-gray-200 mb-4"></div>
                   
                   <p className="text-[10px] text-gray-400 font-bold uppercase mb-2 tracking-tighter">Promo Code</p>
                   
                   <div className='flex items-center gap-2'>
                        <div className="flex-grow bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 font-mono font-bold text-gray-800 uppercase tracking-widest text-lg">
                            {coupon.code}
                        </div>
                        <button
                            onClick={() => copyToClipboard(coupon.code)}
                            className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600"
                            title="Copy Code"
                        >
                            <span className="text-sm font-bold px-1">Copy</span>
                        </button>
                    </div>
                  
                  <div className="flex items-center gap-1 mt-3">
                    <span className="text-gray-400 text-xs">*</span>
                    <p className="text-[11px] text-gray-400 font-medium">
                        Min. order ${coupon.minOrder || '50'} • single use only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Coupons;