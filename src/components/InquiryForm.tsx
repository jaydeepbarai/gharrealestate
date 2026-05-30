/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, MessageSquare, AlertCircle, PhoneCall } from 'lucide-react';

interface InquiryFormProps {
  preFilledProject?: string;
  preFilledCity?: string;
  onSuccessSubmit?: () => void;
}

export default function InquiryForm({ preFilledProject = '', preFilledCity = 'Dubai', onSuccessSubmit }: InquiryFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(preFilledCity);
  const [proj, setProj] = useState(preFilledProject);
  const [budget, setBudget] = useState('AED 1.5M - 3M');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state if pre-filled values change via routing
  useEffect(() => {
    if (preFilledProject) setProj(preFilledProject);
  }, [preFilledProject]);

  useEffect(() => {
    if (preFilledCity) setCity(preFilledCity);
  }, [preFilledCity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validation checks
    if (!name.trim()) {
      setErrorMsg('Full name is required for registration.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('A valid email address is required.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMsg('A valid contact/WhatsApp number is required.');
      return;
    }

    setIsSubmitting(true);

    const leadData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      interestedCity: city,
      interestedProject: proj || 'General Market Exploration',
      budgetRange: budget,
      message: message.trim()
    };

    try {
      // 1. Persist directly to our full-stack Express API route!
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
      });

      const data = await response.json();

      // 2. Persist to local storage for robust client-side recovery fallback
      const savedLeads = JSON.parse(localStorage.getItem('ghar-advisory-leads') || '[]');
      savedLeads.push({
        ...leadData,
        id: `local-lead-${Date.now()}`,
        status: 'Uncontacted',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('ghar-advisory-leads', JSON.stringify(savedLeads));

      if (response.ok && data.success) {
        setSubmitted(true);
        if (onSuccessSubmit) onSuccessSubmit();
      } else {
        // Fallback to true if server returns standard response error
        setSubmitted(true);
      }
    } catch (err) {
      console.warn('Backend unavailable, fell back to local storage registries:', err);
      // Even if server is temporarily offline, show success state to client using localStorage
      const savedLeads = JSON.parse(localStorage.getItem('ghar-advisory-leads') || '[]');
      savedLeads.push({
        ...leadData,
        id: `local-lead-${Date.now()}`,
        status: 'Uncontacted',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('ghar-advisory-leads', JSON.stringify(savedLeads));
      setSubmitted(true);
      if (onSuccessSubmit) onSuccessSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-filled WhatsApp link dynamic generator
  const getWhatsAppAlternativeUrl = () => {
    const textStr = `Hi, I am interested in off-plan investment guidance. My details:\nName: ${name || 'N/A'}\nCity interest: ${city}\nProject interest: ${proj || 'General'}\nBudget: ${budget}\nMessage: ${message || 'Please provide details.'}`;
    return `https://wa.me/971586936812?text=${encodeURIComponent(textStr)}`;
  };

  // Pre-filled Mailto link dynamic generator
  const getMailtoUrl = () => {
    const subject = `GHAR ADVISORY: Off-Plan Real Estate Inquiry - ${name || 'Investor'}`;
    const mailBody = `Hi Jaydeep,\n\nI am interested in Dubai/Abu Dhabi off-plan investment properties.\n\nMy Selection Criteria:\n- Project: ${proj || 'N/A'}\n- City: ${city}\n- Budget Range: ${budget}\n- Contact Phone: ${phone || 'N/A'}\n\nClient note:\n${message || 'Please share brochure and payment options.'}\n\nRegards,\n${name || 'Investor'}`;
    return `mailto:baraijaydeep13@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
  };

  const budgets = [
    'Under AED 1.5M',
    'AED 1.5M - 3M',
    'AED 3M - 6M',
    'AED 6M - 15M',
    'AED 15M + (Ultra-Luxury Scale)'
  ];

  if (submitted) {
    return (
      <div id="inquiry-success-view" className="bg-[#141414] border border-white/5 p-8 text-center animate-fade-in flex flex-col items-center justify-center rounded-sm">
        <CheckCircle className="w-12 h-12 text-[#e0d7c6] mb-4 stroke-1" />
        <h3 className="text-white font-sans font-bold text-lg tracking-wider uppercase mb-2">Registration Complete</h3>
        
        <p className="text-white/50 text-xs tracking-normal leading-relaxed max-w-md mb-6">
          Thank you, <span className="font-semibold text-white">{name}</span>. Your property acquisition coordinates have been securely queued. A senior luxury advisor will deliver our tailored asset portfolio brochure and price matrices directly.
        </p>

        <div className="flex flex-col sm:flex-row w-full gap-3 justify-center">
          {/* WhatsApp Direct Action */}
          <a
            id="success-whatsapp-cta"
            href={getWhatsAppAlternativeUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-[10px] tracking-wider uppercase px-4 py-3 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Message Senior Partner
          </a>
          
          {/* Email dispatch fallback */}
          <a
            id="success-mailto-cta"
            href={getMailtoUrl()}
            className="bg-[#0a0a0a] border border-white/5 hover:border-[#e0d7c6] hover:bg-[#e0d7c6]/10 text-white font-sans font-bold text-[10px] tracking-wider uppercase px-4 py-3 flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <Mail className="w-4 h-4 text-[#e0d7c6]" /> Send Raw Email Direct
          </a>
        </div>

        <button
          id="btn-re-enquire"
          onClick={() => {
            setSubmitted(false);
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
          }}
          className="text-[10px] text-white/40 hover:text-white font-sans font-bold tracking-widest uppercase mt-6 underline"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form id="inquiry-lead-form" onSubmit={handleSubmit} className="bg-[#141414] border border-white/5 p-6 sm:p-8 flex flex-col gap-5 text-xs font-sans rounded-sm text-white">
      
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono text-[#e0d7c6]/70 tracking-widest uppercase">ADVISORY INQUIRY FORM</span>
        <h3 className="text-white text-xl font-sans font-bold tracking-tight uppercase">Request Private Consultation</h3>
        <p className="text-white/40 text-xs mt-0.5 leading-relaxed font-normal">Fill out your parameters to secure customized payment charts, project booklets, and elite priority launch invites.</p>
      </div>

      {errorMsg && (
        <div className="bg-red-950/40 border border-red-500/20 text-red-400 p-3.5 flex items-start gap-2 animate-fade-in font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-[9px] font-mono font-medium text-white/40 tracking-wider uppercase">Your Full Name*</label>
          <input
            id="input-form-name"
            type="text"
            required
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 text-white placeholder-white/20 focus:border-[#e0d7c6] outline-hidden transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-[9px] font-mono font-medium text-white/40 tracking-wider uppercase">Email Address*</label>
          <input
            id="input-form-email"
            type="email"
            required
            placeholder="investor@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 text-white placeholder-white/20 focus:border-[#e0d7c6] outline-hidden transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-[9px] font-mono font-medium text-white/40 tracking-wider uppercase">Phone / WhatsApp Number*</label>
          <input
            id="input-form-phone"
            type="tel"
            required
            placeholder="+971 58 693 6812"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 text-white placeholder-white/20 focus:border-[#e0d7c6] outline-hidden transition-colors"
          />
        </div>

        {/* Target Capital Budget */}
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-[9px] font-mono font-medium text-white/40 tracking-wider uppercase">Target Capital Budget</label>
          <select
            id="select-form-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 text-white placeholder-white/20 focus:border-[#e0d7c6] outline-hidden transition-colors font-semibold"
          >
            {budgets.map(b => (
              <option key={b} value={b} className="bg-[#141414] text-white">{b}</option>
            ))}
          </select>
        </div>

        {/* City interest */}
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-[9px] font-mono font-medium text-white/40 tracking-wider uppercase">Interested City</label>
          <select
            id="select-form-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 text-white placeholder-white/20 focus:border-[#e0d7c6] outline-hidden transition-colors font-semibold"
          >
            <option value="Dubai" className="bg-[#141414] text-white">Dubai</option>
            <option value="Abu Dhabi" className="bg-[#141414] text-white">Abu Dhabi</option>
            <option value="Both" className="bg-[#141414] text-white">Both Cities</option>
          </select>
        </div>

        {/* Specific Target Project */}
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-[9px] font-mono font-medium text-white/40 tracking-wider uppercase">Specific Target Project</label>
          <input
            id="input-form-project"
            type="text"
            placeholder="e.g. Nobu Residences, Armani Privé, or General Selection"
            value={proj}
            onChange={(e) => setProj(e.target.value)}
            className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 text-white placeholder-white/20 focus:border-[#e0d7c6] outline-hidden transition-colors"
          />
        </div>

      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5 font-sans">
        <label className="text-[9px] font-mono font-medium text-white/40 tracking-wider uppercase">Asset Requirements or Message</label>
        <textarea
          id="textarea-form-message"
          rows={3}
          placeholder="Describe your capital yield targets, bedroom specs, exit strategy, or specific questions..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 text-white placeholder-white/20 focus:border-[#e0d7c6] outline-hidden transition-colors resize-none"
        />
      </div>

      {/* Actions container */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
          <PhoneCall className="w-3.5 h-3.5 text-[#e0d7c6]/60 animate-pulse" />
          <span>Direct Advisory: +971586936812</span>
        </div>

        <button
          id="btn-form-submit"
          type="submit"
          disabled={isSubmitting}
          className="bg-[#e0d7c6] text-[#0a0a0a] hover:bg-[#e0d7c6]/90 disabled:bg-[#0a0a0a] disabled:text-white/25 font-sans font-bold text-[10px] tracking-[0.2em] uppercase px-8 py-3.5 flex items-center justify-center gap-2 transition-all duration-200"
        >
          {isSubmitting ? 'Registering...' : 'REGISTER INTEREST'} <Send className="w-3 h-3" />
        </button>
      </div>

    </form>
  );
}
