import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Splitzy
            </h2>
            <p className="mt-2 text-gray-600 text-sm">
              Because good friends deserve fair splits.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#features" className="hover:text-blue-600 transition">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-blue-600 transition">How it Works</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-blue-600 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition"><Facebook size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition"><Twitter size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-pink-600 transition"><Instagram size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-blue-700 transition"><Linkedin size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Splitzy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
