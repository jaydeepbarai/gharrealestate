/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Calendar, CreditCard, ChevronRight, TrendingUp } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
  onViewDetails: (slug: string) => void;
  onEnquire: (projectName: string) => void;
}

export default function ProjectCard({ project, onViewDetails, onEnquire }: ProjectCardProps) {
  // Utility to format price compactly (e.g. 1.2M AED)
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M`;
    }
    return `AED ${price.toLocaleString()}`;
  };

  return (
    <div 
      id={`project-card-${project.id}`}
      className="bg-[#141414] border border-white/5 hover:border-[#e0d7c6]/50 transition-all duration-300 flex flex-col h-full group"
    >
      {/* Visual Header Image Container */}
      <div className="relative aspect-16/10 overflow-hidden bg-[#0a0a0a] flex-shrink-0">
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* City tag */}
        <div className="absolute top-4 left-4 bg-[#141414]/90 backdrop-blur-md text-[#e0d7c6] border border-[#e0d7c6]/20 text-[9px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1.5 shadow-md">
          {project.city}
        </div>
        {/* Status tag */}
        <div className="absolute top-4 right-4 bg-[#0a0a0a]/90 backdrop-blur-md text-white border border-white/10 text-[9px] font-sans font-bold tracking-[0.15em] uppercase px-2.5 py-1">
          {project.status}
        </div>
      </div>

      {/* Main Structural Metadata Body */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Community & Developer badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono text-white/50 tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#e0d7c6]/70" /> {project.community}
          </span>
          <span className="text-[9px] bg-[#0a0a0a] font-sans font-bold text-[#e0d7c6] uppercase tracking-widest px-2 py-0.5 border border-white/5">
            {project.developer}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-white font-sans font-semibold text-lg tracking-wide group-hover:text-[#e0d7c6] transition-colors line-clamp-1 mb-2">
          {project.name}
        </h3>

        {/* Descriptions snippet */}
        <p className="text-white/40 text-xs tracking-normal leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Features list */}
        <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 border-t border-white/5 pt-4 mb-5 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[10px] tracking-wider font-mono">STARTING:</span>
            <span className="font-sans font-semibold text-white">{formatPrice(project.startingPrice)}</span>
          </div>
          <div className="flex items-center gap-2 justify-self-end">
            <span className="text-white/50 text-[10px] tracking-wider font-mono">YIELD:</span>
            <span className="font-sans font-semibold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> {project.expectedROI || '8.2%'}
            </span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Calendar className="w-3.5 h-3.5 text-[#e0d7c6]/60" />
            <span className="text-white/50 text-[10px] tracking-wider font-mono mr-1">HANDOVER:</span>
            <span className="font-sans font-medium text-white/90 text-xs">{project.handover}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <CreditCard className="w-3.5 h-3.5 text-[#e0d7c6]/60" />
            <span className="text-white/50 text-[10px] tracking-wider font-mono mr-1">PAYMENT PLAN:</span>
            <span className="font-sans font-medium text-white/90 text-xs">{project.paymentPlan}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-6">
          {project.propertyTypes.map((type) => (
            <span key={type} className="text-[9px] bg-[#0a0a0a] text-zinc-300 px-2 py-0.5 border border-white/5 rounded-xs font-mono uppercase tracking-wider">
              {type}
            </span>
          ))}
          <span className="text-[9px] bg-[#0a0a0a] text-zinc-300 px-2 py-0.5 border border-white/5 rounded-xs font-mono tracking-wider">
            {project.bedrooms.join('/')} BEDS
          </span>
        </div>

        {/* Buttons - Interactive elements */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-white/5">
          <button 
            id={`btn-view-${project.id}`}
            onClick={() => onViewDetails(project.slug)}
            className="border border-white/10 text-[#e0d7c6] hover:border-[#e0d7c6] hover:bg-white/5 transition-colors duration-200 py-2.5 text-[10px] font-sans font-bold tracking-[0.14em] text-center flex items-center justify-center gap-1 uppercase"
          >
            DETAILS <ChevronRight className="w-3.5 h-3.5" />
          </button>
          
          <button 
            id={`btn-enquire-${project.id}`}
            onClick={() => onEnquire(project.name)}
            className="bg-[#e0d7c6] text-[#0a0a0a] hover:bg-[#e0d7c6]/90 transition-colors duration-200 py-2.5 text-[10px] font-sans font-bold tracking-[0.14em] text-center uppercase"
          >
            ENQUIRE
          </button>
        </div>

      </div>
    </div>
  );
}
