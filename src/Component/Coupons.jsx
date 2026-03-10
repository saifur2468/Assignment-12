import React from "react";
import { motion } from "framer-motion";
import { FaTag, FaTicketAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const coupons = [
  {
    code: "SAVE10",
    discount: "10%",
    description: "Get 10% discount on your monthly apartment rent.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    code: "NEWUSER15",
    discount: "15%",
    description: "Special discount for new apartment members.",
    color: "from-purple-500 to-pink-600",
  },
  {
    code: "SUMMER20",
    discount: "20%",
    description: "Enjoy summer offer on selected apartments.",
    color: "from-orange-400 to-red-500",
  },
];

const Coupons = () => {
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon ${code} copied!`);
  };

  return (
    <div className="py-24 bg-[#020314] overflow-hidden relative">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-indigo-400 font-semibold tracking-widest uppercase text-sm"
          >
            Exclusive Offers
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3">
            Special Discount Coupons
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {coupons.map((coupon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* Card Design */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 h-full flex flex-col items-center text-center shadow-2xl overflow-hidden">
                
                {/* Coupon Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${coupon.color} flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                  <FaTicketAlt className="text-white text-2xl" />
                </div>

                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">
                  Use Code
                </h3>
                
                {/* Code with Dashed Border */}
                <div 
                  onClick={() => copyToClipboard(coupon.code)}
                  className="cursor-pointer border-2 border-dashed border-white/20 bg-white/5 px-6 py-2 rounded-xl mb-4 hover:border-indigo-400 transition-colors group/code"
                >
                  <span className="text-2xl font-mono font-bold text-white tracking-widest">
                    {coupon.code}
                  </span>
                </div>

                <div className={`text-4xl font-black bg-gradient-to-r ${coupon.color} bg-clip-text text-transparent mb-4`}>
                  {coupon.discount} OFF
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {coupon.description}
                </p>

                <button 
                  onClick={() => copyToClipboard(coupon.code)}
                  className={`w-full py-4 rounded-2xl bg-gradient-to-r ${coupon.color} text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-indigo-500/20 transition-all transform active:scale-95`}
                >
                  Apply & Copy
                </button>

                {/* Left & Right Decorative Cutouts (Ticket Look) */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#020314] rounded-full border-r border-white/10"></div>
                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#020314] rounded-full border-l border-white/10"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Coupons;




















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaTicketAlt } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// const Coupons = () => {
//   const [coupons, setCoupons] = useState([]);

//   useEffect(() => {
//     // ডাটাবেজ থেকে কুপন ফেচ করা
//     axios.get("http://localhost:5000/coupons")
//       .then(res => setCoupons(res.data))
//       .catch(err => console.error("Error loading coupons", err));
//   }, []);

//   const copyToClipboard = (code) => {
//     navigator.clipboard.writeText(code);
//     toast.success(`Coupon ${code} copied!`);
//   };

//   return (
//     <div className="py-24 bg-[#020314] overflow-hidden relative">
//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 uppercase tracking-tighter italic">
//             Special Discount <span className="text-indigo-500">Coupons</span>
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {coupons.map((coupon, index) => (
//             <motion.div
//               key={coupon._id}
//               whileHover={{ y: -10 }}
//               className="relative group"
//             >
//               <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 h-full flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                
//                 {/* Coupon Code Section */}
//                 <div 
//                   onClick={() => copyToClipboard(coupon.couponCode)}
//                   className="cursor-pointer border-2 border-dashed border-indigo-500/50 bg-indigo-500/5 px-6 py-2 rounded-xl mb-4 hover:border-indigo-400 transition-colors"
//                 >
//                   <span className="text-2xl font-mono font-bold text-white tracking-widest">
//                     {coupon.couponCode}
//                   </span>
//                 </div>

//                 <div className="text-4xl font-black text-indigo-400 mb-4">
//                   {coupon.discountPercentage}% OFF
//                 </div>

//                 <p className="text-gray-400 text-sm mb-8 flex-grow">
//                   {coupon.description}
//                 </p>

//                 <button 
//                   onClick={() => copyToClipboard(coupon.couponCode)}
//                   className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
//                 >
//                   Copy Code
//                 </button>

//                 {/* Ticket Look Cutouts */}
//                 <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#020314] rounded-full border-r border-white/10"></div>
//                 <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#020314] rounded-full border-l border-white/10"></div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Coupons;