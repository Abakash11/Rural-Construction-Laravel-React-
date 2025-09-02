import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white pt-12 pb-6 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:pr-4">
            <h3 className="text-2xl font-bold text-amber-500 mb-4 flex items-center">
              <span className="mr-2">🏗️</span> Rural Construction
            </h3>
            <p className="text-gray-300 mb-4">
              Building dreams with quality, integrity, and decades of expertise.
              From foundations to finishes, we construct excellence in every project.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-amber-500 transition-colors">
                <span className="text-white">f</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-amber-500 transition-colors">
                <span className="text-white">t</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-amber-500 transition-colors">
                <span className="text-white">in</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-amber-500 transition-colors">
                <span className="text-white">ig</span>
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-semibold text-amber-500 mb-4 flex items-center">
              <span className="mr-2">🔧</span> Our Services
            </h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> Residential Construction</Link></li>
              <li><Link to="/services" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> Commercial Buildings</Link></li>
              <li><Link to="/services" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> Renovation & Remodeling</Link></li>
              <li><Link to="/services" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> Infrastructure Development</Link></li>
              <li><Link to="/services" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> Interior Design</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-amber-500 mb-4 flex items-center">
              <span className="mr-2">🔗</span> Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> About Our Company</Link></li>
              <li><Link to="/projects" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> Our Projects</Link></li>
              <li><Link to="#" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> Client Testimonials</Link></li>
              <li><Link to="#" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> Careers</Link></li>
              <li><Link to="/blogs" className="text-gray-300 no-underline hover:text-amber-500 transition-colors flex items-center"><span className="mr-2 text-amber-500">→</span> Blog & News</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold text-amber-500 mb-4 flex items-center">
              <span className="mr-2">📞</span> Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-amber-500 mr-3 mt-1">📍</span>
                <span className="text-gray-300">B-13X, Rajaji Puram
                  Lucknow, Uttar Pradesh, 226017
                  0522400XXXX</span>
              </li>
              <li className="flex items-center">
                <span className="text-amber-500 mr-3">📞</span>
                <a href="tel:+15551234567" className="text-gray-300 hover:text-amber-500">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center">
                <span className="text-amber-500 mr-3">✉️</span>
                <a href="mailto:info@ruralconstruction.com" className="text-gray-300 hover:text-amber-500">original.rural.construction@gmail.com</a>
              </li>
              <li className="flex items-center">
                <span className="text-amber-500 mr-3">🕒</span>
                <span className="text-gray-300">Mon-Fri: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dividing Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-3 md:mb-0">
            Copyright © 2025 Rural Construction. Built with React & Laravel.
          </p>
          <p className="text-green-400 font-medium flex items-center">
            <span className="mr-1">💻</span> Developed By Abakash Rudra
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
