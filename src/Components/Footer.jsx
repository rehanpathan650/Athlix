// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h2 className="font-bold text-lg mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-gray-400">About</a></li>
            <li><a href="/product" className="hover:text-gray-400">Products</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-bold text-lg mb-4">Newsletter</h2>
          <p className="mb-4 text-gray-300">Subscribe to get latest updates and offers.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded text-black flex-1 bg-white"
            />
            <button className="bg-gray-400 text-black px-4 py-2 rounded font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="font-bold text-lg mb-4">Follow Us</h2>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Athlix. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
