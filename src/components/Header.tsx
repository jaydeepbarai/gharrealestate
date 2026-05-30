/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenAdvisoryDesk: () => void;
}

export default function Header({ currentTab, onTabChange, onOpenAdvisoryDesk }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'dubai', label: 'DUBAI' },
    { id: 'abudhabi', label: 'ABU DHABI' },
    { id: 'advisory', label: 'ADVISORY' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#141414] border-b border-white/5 py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO AREA - matches screenshot perfectly */}
        <div 
          id="brand-logo" 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          {/* Black monogram box with white GH */}
          <div className="bg-[#e0d7c6] text-[#0a0a0a] font-mono font-bold text-lg w-10 h-10 flex items-center justify-center tracking-tighter">
            GH
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-white font-sans font-bold text-sm tracking-[0.25em] leading-none group-hover:text-[#e0d7c6] transition-colors">
              GHAR
            </span>
            <span className="text-[#e0d7c6]/60 font-sans text-[9px] tracking-[0.18em] leading-relaxed mt-0.5 uppercase">
              Advisory
            </span>
          </div>
        </div>

        {/* DESKTOP NAV - matches screenshot */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] font-sans font-medium tracking-[0.18em] transition-all duration-200 relative pb-1 ${
                  isActive 
                    ? 'text-[#e0d7c6]' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e0d7c6]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* CALL TO ACTION BUTTON - matches screenshot */}
        <div id="desktop-cta" className="hidden lg:flex items-center">
          <button
            id="btn-header-advisory"
            onClick={onOpenAdvisoryDesk}
            className="border border-[#e0d7c6]/30 text-[#e0d7c6] bg-transparent hover:bg-[#e0d7c6] hover:text-[#0a0a0a] hover:border-[#e0d7c6] transition-all duration-200 text-[10px] font-sans font-bold tracking-[0.18em] px-5 py-2.5 flex items-center gap-2"
          >
            ADVISORY DESK <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            id="btn-mobile-advisory"
            onClick={onOpenAdvisoryDesk}
            className="border border-[#e0d7c6]/30 text-[#e0d7c6] bg-transparent hover:bg-[#e0d7c6] hover:text-[#0a0a0a] hover:border-[#e0d7c6] transition-all duration-150 text-[9px] font-sans font-bold tracking-[0.12em] px-3 py-1.5 flex items-center gap-1"
          >
            ADVISORY <ArrowUpRight className="w-3 h-3" />
          </button>
          
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1 hover:bg-white/5 rounded-sm"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden absolute left-0 right-0 top-full bg-[#141414] border-b border-white/5 py-6 px-6 z-40 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-xs font-sans font-medium tracking-[0.18em] py-1 border-b border-white/5 pb-2 ${
                    isActive ? 'text-[#e0d7c6] font-semibold' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
