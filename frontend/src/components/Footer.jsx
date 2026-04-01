import React from 'react';
import { Link } from 'react-router-dom';
import { GiCircuitry } from 'react-icons/gi';
import { FiTwitter, FiInstagram, FiYoutube, FiGithub, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark-800 border-t border-gray-700/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GiCircuitry className="text-2xl text-purple-500" />
              <span className="font-gaming text-xl font-bold">
                <span className="text-gradient-cyber">DOWAR</span>
                <span className="text-white"> TECH</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for premium gaming PCs. From budget builds to ultra high-end machines, we've got your perfect gaming rig.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FiTwitter size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FiInstagram size={20} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FiYoutube size={20} /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><FiGithub size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-gaming text-sm text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Products' },
                { to: '/products?category=Budget', label: 'Budget PCs' },
                { to: '/products?category=High-End', label: 'High-End PCs' },
                { to: '/products?category=Ultra', label: 'Ultra PCs' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-gaming text-sm text-white mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              {['FAQ', 'Shipping Policy', 'Returns & Warranty', 'Technical Support', 'Contact Us'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-gaming text-sm text-white mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="text-purple-400 flex-shrink-0" />
                support@dowartech.com
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="text-purple-400 flex-shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="text-purple-400 flex-shrink-0 mt-0.5" />
                123 Gaming Street<br />Tech Valley, CA 94025
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Dowar Tech. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with <span className="text-purple-400">♥</span> for gamers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
