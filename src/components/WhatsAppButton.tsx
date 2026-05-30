/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '971586936812';
  const preFilledText = encodeURIComponent('Hi, I am interested in UAE off-plan property investment. Please share available options.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${preFilledText}`;

  return (
    <a
      id="floating-whatsapp-widget"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#0a0a0a] text-white border border-white/10 hover:bg-[#e0d7c6] hover:text-[#0a0a0a] hover:border-[#e0d7c6] shadow-2xl transition-all duration-300 group flex items-center gap-4 py-3 px-5 rounded-sm"
      style={{ animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
    >
      {/* Visual glowing active advisor status dot */}
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </div>

      <div className="flex flex-col text-left">
        <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-white/40 group-hover:text-[#0a0a0a]/60 uppercase">
          WHATSAPP
        </span>
        <span className="text-xs font-sans font-semibold tracking-wider">
          Direct Advisor
        </span>
      </div>

      <MessageSquare className="w-5 h-5 text-[#e0d7c6] group-hover:text-[#0a0a0a] transition-colors" />
    </a>
  );
}
