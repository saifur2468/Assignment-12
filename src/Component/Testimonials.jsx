import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Ariful Islam",
      role: "Regular Traveler",
      image: "https://i.pravatar.cc/150?u=1",
      review: "The apartment was stunning! Booking through this site was incredibly easy and stress-free. Highly recommended!",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Khan",
      role: "Business Woman",
      image: "https://i.pravatar.cc/150?u=2",
      review: "Verified listings gave me peace of mind. No hidden costs, exactly what I was looking for in a booking site.",
      rating: 5
    },
    {
      id: 3,
      name: "Tanvir Ahmed",
      role: "Digital Nomad",
      image: "https://i.pravatar.cc/150?u=3",
      review: "Excellent 24/7 support. They helped me find a studio apartment within minutes! Best experience so far.",
      rating: 4
    },
    {
      id: 4,
      name: "Mousumi Akter",
      role: "Family Traveler",
      image: "https://i.pravatar.cc/150?u=4",
      review: "Clean and safe places. My family enjoyed the stay. The coupons saved us a lot of money!",
      rating: 5
    },
    {
      id: 5,
      name: "Rahat Hossain",
      role: "Freelancer",
      image: "https://i.pravatar.cc/150?u=5",
      review: "The best apartment booking site in the city. The interface is very user-friendly and visually pleasing.",
      rating: 5
    }
  ];

  // মারকির নিরবচ্ছিন্ন লুপের জন্য অ্যারেটি ডুপ্লিকেট করা হয়েছে
  const marqueeVariants = {
    animate: {
      x: [0, -1035], // আপনার কার্ডের উইডথ অনুযায়ী এই ভ্যালু অ্যাডজাস্ট হতে পারে
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // স্পিড কন্ট্রোল করতে এখানে ভ্যালু কমাতে বা বাড়াতে পারেন
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-3">
          Testimonials
        </h2>
        <p className="text-4xl font-black text-gray-900">
          What Our Happy Guests Say
        </p>
      </div>

      <div className="relative flex">
        {/* ফেইড ইফেক্টের জন্য দুই পাশে গ্রেডিয়েন্ট মাস্ক */}
        <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        <motion.div
          className="flex gap-6 flex-nowrap"
          variants={marqueeVariants}
          animate="animate"
          whileHover={{ transition: { duration: 0 } }} // মাউস রাখলে স্পিড জিরো (পজ) করার সহজ উপায়
        >
          {[...reviews, ...reviews].map((item, index) => (
            <div
              key={index}
              className="w-[320px] md:w-[380px] flex-shrink-0 bg-gray-50 p-8 rounded-[40px] border border-gray-100 hover:border-indigo-200 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 font-medium leading-relaxed mb-8">
                "{item.review}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900 leading-none mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-indigo-600 font-bold uppercase tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;