import React from 'react';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#020314] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Column 1: Brand & Contact */}
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">Clarity</h2>
          <div className="text-gray-400 space-y-2 text-sm leading-relaxed">
            <p>A108 Adam Street</p>
            <p>New York, NY 535022</p>
            <p className="pt-4 font-semibold text-white">
              Phone: <span className="font-normal text-gray-400">+1 5589 55488 55</span>
            </p>
            <p className="font-semibold text-white">
              Email: <span className="font-normal text-gray-400">info@example.com</span>
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            {[FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, index) => (
              <a 
                key={index} 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#6366f1] hover:border-[#6366f1] transition-all duration-300"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Useful Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            {['Home', 'About us', 'Services', 'Terms of service', 'Privacy policy'].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-[#6366f1] transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Our Services</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            {['Web Design', 'Web Development', 'Product Management', 'Marketing', 'Graphic Design'].map((service) => (
              <li key={service}>
                <a href="#" className="hover:text-[#6366f1] transition-colors">{service}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Extra Links 1 */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Hic solutasetp</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            {['Molestiae accusamus iure', 'Excepturi dignissimos', 'Suscipit distinctio', 'Dilecta', 'Sit quas consectetur'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-[#6366f1] transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Extra Links 2 */}
        <div>
          <h4 className="font-bold mb-6 text-lg">Nobis illum</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            {['Ipsam', 'Laudantium dolorum', 'Dinera', 'Trodelas', 'Flexo'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-[#6366f1] transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
        <p>© Copyright <span className="text-white font-bold">Clarity</span> All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;