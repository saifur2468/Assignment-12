import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ticket, Copy } from 'lucide-react';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coupons.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">No active coupons right now. Check back later!</p>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon._id} className="relative bg-gradient-to-br from-indigo-600 to-purple-700 p-1 rounded-3xl shadow-xl overflow-hidden group">
              {/* Decorative circles for ticket look */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>

              <div className="bg-white rounded-[20px] p-6 h-full flex flex-col items-center text-center border-2 border-dashed border-indigo-100">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                  <Ticket size={32} />
                </div>
                <h3 className="text-3xl font-black text-indigo-900 mb-1">{coupon.discount}% OFF</h3>
                <p className="text-gray-500 text-sm mb-6 px-4">{coupon.description}</p>

                <div className="mt-auto w-full">
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl p-3 mb-2 font-mono font-bold text-indigo-600 uppercase tracking-widest">
                    {coupon.code}
                    <button
                      onClick={() => copyToClipboard(coupon.code)}
                      className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-indigo-600 transition-all shadow-sm"
                      title="Copy Code"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Click icon to copy code</p>
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




















