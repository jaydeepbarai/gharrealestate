/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, Linkedin, Compass, Shield, Award } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#141414] text-white py-16 px-6 sm:px-12 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Title area */}
        <div id="footer-branding" className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#e0d7c6] text-[#0a0a0a] font-mono font-bold text-base w-8 h-8 flex items-center justify-center">
              GH
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xs tracking-[0.2em] leading-none">GHAR</span>
              <span className="text-[#e0d7c6]/60 text-[8px] tracking-[0.16em] leading-relaxed uppercase">Advisory</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs tracking-wide max-w-sm leading-relaxed mt-2">
            Jaydeep Barai Real Estate Advisory is Dubai's distinguished boutique consultancy, specializing exclusively in elite-class off-plan residential acquisition and real estate capital modeling. 
          </p>
          <div className="flex items-center gap-3 mt-2 text-gray-400">
            <a 
              id="footer-linkedin-link"
              href="https://www.linkedin.com/in/jaydeepbarai/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div id="footer-navigation" className="flex flex-col gap-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#e0d7c6] uppercase">ADVISORY LINKS</span>
          <div className="flex flex-col gap-2.5 text-xs text-gray-400">
            <button onClick={() => onTabChange('home')} className="text-left hover:text-white transition-colors duration-150">Home Portfolio</button>
            <button onClick={() => onTabChange('projects')} className="text-left hover:text-white transition-colors duration-150">Search Directory (100 Projects)</button>
            <button onClick={() => onTabChange('dubai')} className="text-left hover:text-white transition-colors duration-150">Dubai Off-Plan</button>
            <button onClick={() => onTabChange('abudhabi')} className="text-left hover:text-white transition-colors duration-150">Abu Dhabi Off-Plan</button>
            <button onClick={() => onTabChange('advisory')} className="text-left hover:text-white transition-colors duration-150">Investment Advisory Desk</button>
          </div>
        </div>

        {/* Contact info */}
        <div id="footer-contact" className="flex flex-col gap-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#e0d7c6] uppercase">DIRECT CONTACT</span>
          <div className="flex flex-col gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <a href="tel:+971586936812" className="hover:text-white transition-colors duration-150">+971 58 693 6812</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <a href="mailto:baraijaydeep13@gmail.com" className="hover:text-white transition-colors duration-150">baraijaydeep13@gmail.com</a>
            </div>
            <div className="flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">Business Bay, Dubai, United Arab Emirates</span>
            </div>
          </div>
        </div>

      </div>

      {/* Compliance Notice Block */}
      <div id="footer-compliance" className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col gap-6 text-[10px] text-gray-500 tracking-wide leading-relaxed">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <span className="font-semibold text-gray-400">REGULATORY COMPLIANCE</span>
          </div>
          <span className="text-gray-600">Last updated: May 2026</span>
        </div>
        <p className="bg-[#0a0a0a] p-4 border border-white/5 text-gray-500 rounded-sm">
          Project information listed on this digital advisory platform is for general informational guidance only and subject to developer availability, price fluctuations, regulatory governmental approvals, and final developer sales agreements. Designated starting prices represent target listings at time of publication. Developer escrow terms and layout floorplans are subject to official RERA (Dubai) or Municipal (Abu Dhabi) confirmation.
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 border-t border-white/5 pt-6">
          <span>&copy; {currentYear} Jaydeep Barai Real Estate Advisory. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors duration-150">Terms of Counsel</a>
            <a href="#" className="hover:text-gray-400 transition-colors duration-150">Privacy Safeguards</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
