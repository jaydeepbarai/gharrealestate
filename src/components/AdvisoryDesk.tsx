/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, MessageSquare, ArrowUpRight, ShieldCheck, Compass, HelpCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface AdvisoryDeskProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProjectName?: string;
}

export default function AdvisoryDesk({ isOpen, onClose, selectedProjectName = '' }: AdvisoryDeskProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initialPrompts = [
    { label: 'RoI Allocations', text: 'Which coordinates offer the highest projected rental RoI for 2026 off-plan investments?' },
    { label: 'Emaar vs Aldar', text: 'Contrast Emaar (Dubai) and Aldar (Abu Dhabi) escrow regulations and historical handovers.' },
    { label: 'Exit Safeguards', text: 'How do off-plan resale exit strategies operate for HNIs before handover?' },
    { label: 'Tax & Mortgages', text: 'Brief me on DLD registration fees, Golden Visa thresholds, and non-resident financing.' }
  ];

  // Initialize with greeting if empty
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: `Welcome to GHAR ADVISORY. I am your Digital Investment Partner, equipped with real-time UAE market diagnostics.\n\n${
            selectedProjectName 
              ? `I notice you are analyzing "${selectedProjectName}". I can provide comprehensive capital yield analysis, developer credit checks, or detail payment plan safety parameters for this specific asset. How shall I direct your focus?` 
              : "I can provide instant yield analysis, regulatory asset safeguards, or guide you through current hot launches across Dubai and Abu Dhabi. How may I direct your investment inquiry today?"
          }`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isOpen, selectedProjectName]);

  // Handle scrolling to bottom upon incoming dialogues
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/advisory/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, text: m.text })),
          interestedProject: selectedProjectName || 'General Market Exploration'
        })
      });

      const data = await response.json();

      let textOutput = data.text;
      
      // Append grounding resources if found
      if (data.references && data.references.length > 0) {
        textOutput += '\n\n**Market Citation Sources Consulted:**\n';
        data.references.forEach((ref: any, idx: number) => {
          textOutput += `* [${ref.title}](${ref.uri})\n`;
        });
      }

      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: textOutput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error('Advisory Desk Connection error:', error);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: 'model',
        text: 'I apologize, but my real-time data connection encountered a transient network delay. Please consult our human partner direkt at +971586936812 via WhatsApp, or email baraijaydeep13@gmail.com for immediate professional presentation.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const parseMarkdownLinks = (text: string) => {
    // Basic helper to render markdown links and list bullets in chatbot beautifully
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 underline inline-flex items-center gap-0.5"
          >
            {match[1]} <ArrowUpRight className="w-2.5 h-2.5" />
          </a>
        );
      }
      // Replace line break characters with <br /> markers
      if (part.includes('\n')) {
        return part.split('\n').map((line, lidx) => (
          <React.Fragment key={`${index}-${lidx}`}>
            {line}
            {lidx < part.split('\n').length - 1 && <br />}
          </React.Fragment>
        ));
      }
      return part;
    });
  };

  return (
    <div id="advisory-desk-overlay" className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex justify-end">
      
      {/* Slide drawer body */}
      <div 
        id="advisory-drawer" 
        className="w-full max-w-lg bg-[#0a0a0a] border-l border-white/5 text-white flex flex-col h-full overflow-hidden animate-fade-in"
      >
        
        {/* Desk Header */}
        <div id="desk-header" className="bg-[#141414] p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 font-sans">
            <div className="bg-[#e0d7c6] text-[#0a0a0a] font-mono font-bold text-xs w-7 h-7 flex items-center justify-center">
              GH
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-white">GHAR ADVISORY</span>
              <div className="flex items-center gap-1.5 text-[#e0d7c6]/80 text-[9px] font-sans tracking-widest mt-0.5 uppercase font-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e0d7c6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#e0d7c6]"></span>
                </span>
                <span>REAL-TIME ADVISORY DESK 2026</span>
              </div>
            </div>
          </div>
          <button 
            id="btn-close-advisory"
            onClick={onClose}
            className="text-white/40 hover:text-white p-1 hover:bg-[#141414] rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Credentials Panel */}
        <div className="bg-[#141414]/50 px-5 py-3 border-b border-white/5 flex items-center gap-2.5 text-[10px] text-[#e0d7c6]/70 leading-normal font-mono">
          <ShieldCheck className="w-4 h-4 text-[#e0d7c6] flex-shrink-0" />
          <span>Secured Sandbox AI Consultation utilizing verified Dubai & Abu Dhabi Land Department indices.</span>
        </div>

        {/* Message Log Body */}
        <div 
          id="conversation-viewport" 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-5 space-y-4 font-sans text-xs flex flex-col"
        >
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div 
                key={m.id}
                id={`chat-msg-${m.id}`}
                className={`flex flex-col gap-1 max-w-[85%] ${
                  isUser ? 'align-self-end text-right ml-auto' : 'align-self-start text-left mr-auto'
                }`}
              >
                <div 
                  className={`p-4 leading-relaxed tracking-wide rounded-sm whitespace-pre-wrap ${
                    isUser 
                      ? 'bg-[#e0d7c6] text-[#0a0a0a] font-semibold' 
                      : 'bg-[#141414] text-white/95 border border-white/5'
                  }`}
                >
                  {isUser ? m.text : parseMarkdownLinks(m.text)}
                </div>
                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest mt-0.5 px-1 block">
                  {isUser ? 'Investor' : 'Advisor'} • {m.timestamp}
                </span>
              </div>
            );
          })}

          {loading && (
            <div id="chat-advisor-loading" className="align-self-start bg-[#141414] border border-white/5 p-4 rounded-sm text-white/50 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e0d7c6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e0d7c6]"></span>
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase animate-pulse text-[#e0d7c6]/85">Analyzing ground assets...</span>
            </div>
          )}

          {/* Prompt options if chat has only greeting */}
          {messages.length === 1 && (
            <div id="ai-prompts-picker" className="pt-6 border-t border-white/5 mt-auto flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-mono mb-1 uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-[#e0d7c6]/60" />
                <span>Suggested Advisories:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {initialPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    id={`prompt-btn-${idx}`}
                    onClick={() => handleSendMessage(p.text)}
                    className="p-3 text-left bg-[#141414] hover:bg-[#e0d7c6] hover:text-[#0a0a0a] border border-white/5 text-white/70 rounded-sm transition-all duration-200 text-xs font-sans leading-snug tracking-normal flex flex-col justify-between group"
                  >
                    <span className="text-[9px] font-mono uppercase tracking-widest font-bold mb-1 block text-[#e0d7c6]/60 group-hover:text-[#0a0a0a]/60">
                      {p.label}
                    </span>
                    <span className="line-clamp-2 md:line-clamp-none">{p.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Inputs row */}
        <div id="desk-inputs-area" className="p-5 border-t border-white/5 bg-[#141414] flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <input
              id="input-chat-advisory"
              type="text"
              placeholder="Ask about RoI yields, payment plans, Aldar, Emaar or specific projects..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(inputText); }}
              disabled={loading}
              className="flex-grow p-3 bg-[#0a0a0a] border border-white/10 focus:border-[#e0d7c6] focus:ring-0 outline-hidden text-xs text-white placeholder-white/20 rounded-xs transition-colors"
            />
            <button
              id="btn-chat-send"
              onClick={() => handleSendMessage(inputText)}
              disabled={loading || !inputText.trim()}
              className="p-3 bg-[#e0d7c6] text-[#0a0a0a] hover:bg-[#e0d7c6]/90 disabled:bg-[#0a0a0a] disabled:text-white/20 transition-colors duration-150 rounded-xs"
              title="Dispatch message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex justify-between items-center text-[8px] font-mono text-white/30 tracking-wider">
            <span>DIRECT TELEPHONE: +971586936812</span>
            <span>BARAIJAYDEEP13@GMAIL.COM</span>
          </div>
        </div>

      </div>
    </div>
  );
}
