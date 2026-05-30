/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowLeft, MapPin, Calendar, CreditCard, ChevronRight, 
  HelpCircle, Sparkles, Building, Waves, ShieldCheck, 
  Compass, FileDown, Eye, CheckCircle2, DollarSign, MessageSquare 
} from 'lucide-react';
import { Project } from '../types';
import InquiryForm from './InquiryForm';
import { projectDataService } from '../utils/projectDataService';

interface ProjectDetailProps {
  projectSlug: string;
  onBackToListing: () => void;
  onViewProject: (slug: string) => void;
  onEnquire: (projectName: string) => void;
}

export default function ProjectDetail({ projectSlug, onBackToListing, onViewProject, onEnquire }: ProjectDetailProps) {
  const [project, setProject] = React.useState<Project | null>(null);
  const [similarProjects, setSimilarProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      const proj = await projectDataService.getProjectBySlug(projectSlug);
      
      if (proj) {
        setProject(proj);
        
        // Load some similar projects (filtered by same city, capped to 3 items)
        const allList = await projectDataService.getProjects();
        const similar = allList
          .filter(p => p.id !== proj.id && (p.city === proj.city || p.developer === proj.developer))
          .slice(0, 3);
        setSimilarProjects(similar);
      }
      setLoading(false);
    }
    loadData();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectSlug]);

  if (loading) {
    return (
      <div id="detail-loader" className="py-24 text-center max-w-7xl mx-auto flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-[#e0d7c6] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] font-mono tracking-widest text-[#e0d7c6]/60 uppercase">Analyzing Asset Coordinates...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div id="detail-not-found" className="py-24 text-center max-w-7xl mx-auto flex flex-col items-center justify-center gap-4 px-6 text-white bg-[#0a0a0a]">
        <HelpCircle className="w-12 h-12 text-[#e0d7c6]/40 stroke-1" />
        <h3 className="text-[#e0d7c6] font-sans font-bold text-lg uppercase tracking-wider">Asset Coordinates Unresolved</h3>
        <p className="text-white/40 text-xs leading-relaxed max-w-md font-normal">This project listing key does not correspond to an active off-plan registry layout. Please return to the directory searching console.</p>
        <button 
          onClick={onBackToListing}
          className="bg-[#e0d7c6] text-[#0a0a0a] hover:bg-[#e0d7c6]/90 transition-all duration-200 px-6 py-2.5 text-[10px] font-sans font-bold tracking-[0.2em] uppercase rounded-sm"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  // Format Price Compactly
  const formatPriceFull = (price: number) => {
    return `AED ${price.toLocaleString()}`;
  };

  // Generate dynamic breakdown percentage based on payment plan format (e.g. 60/40, 80/20)
  const getPaymentPercentage = () => {
    const pStr = project.paymentPlan;
    const matches = pStr.match(/(\d+)\/(\d+)/);
    if (matches && matches.length >= 3) {
      return {
          booking: '10%',
          duringConst: `${parseInt(matches[1]) - 10}%`,
          handover: `${matches[2]}%`
      };
    }
    return { booking: '10%', duringConst: '50%', handover: '40%' };
  };

  const paymentBreakdown = getPaymentPercentage();

  return (
    <article id={`project-detail-layout-${project.id}`} className="py-10 px-4 sm:px-8 max-w-7xl mx-auto animate-fade-in font-sans text-white bg-[#0a0a0a]">
      
      {/* Back click bar */}
      <div className="mb-8">
        <button
          id="btn-back-breadcrumb"
          onClick={onBackToListing}
          className="group text-white/40 hover:text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#e0d7c6]" /> Return to property search
        </button>
      </div>

      {/* Grid: Header Title Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-start">
        
        {/* Project Name and developer */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] font-mono font-bold bg-white/5 text-[#e0d7c6] border border-white/10 uppercase px-2.5 py-1 rounded-sm">
              {project.developer}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#e0d7c6]/60 uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {project.location}
            </span>
          </div>
          <h1 className="text-white font-sans font-bold text-3xl sm:text-4xl tracking-tight leading-tight uppercase">
            {project.name}
            <span className="italic font-serif normal-case font-normal text-[#e0d7c6]/70 block text-lg sm:text-xl mt-1.5">
              Off-Plan residential sanctuary in {project.city}
            </span>
          </h1>
        </div>

        {/* Starting Price and simple CTA actions block */}
        <div className="bg-[#141414] border border-white/5 p-6 flex flex-col gap-3.5 rounded-sm">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">INVESTMENT STARTING:</span>
            <span className="text-white font-sans font-extrabold text-2xl tracking-normal">{formatPriceFull(project.startingPrice)}</span>
            <span className="text-emerald-400 font-mono text-[9px] font-semibold tracking-wider mt-1 block">
              Estimated Net Rental Yield: {project.expectedROI || '8.2% p.a.'}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            <a 
              id="detail-whatsapp-direct"
              href={`https://wa.me/971586936812?text=${encodeURIComponent(`Hi, I am interested in details and payment schedules for: ${project.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#10b981] hover:bg-[#059669] text-[#0a0a0a] font-sans font-bold text-[10px] tracking-[0.16em] uppercase py-3 text-center flex items-center justify-center gap-2 shadow-sm rounded-sm transition-colors duration-150"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Broker
            </a>
            <button 
              id="detail-scrl-enquire"
              onClick={() => {
                const target = document.getElementById('consultation-inquiry-anchor');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border border-white/15 hover:border-[#e0d7c6] hover:bg-[#e0d7c6]/10 text-white font-sans font-bold text-[10px] tracking-[0.16em] uppercase py-3 text-center transition-colors duration-200 rounded-sm"
            >
              Request Presentation
            </button>
          </div>
        </div>

      </div>

      {/* Hero Display Showcase Area */}
      <div id="detail-hero-frame" className="relative aspect-21/9 w-full overflow-hidden bg-[#141414] border border-white/5 mb-12 rounded-sm">
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-full object-cover opacity-85"
          referrerPolicy="no-referrer"
        />
        {/* Overlay metrics */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between gap-6 sm:items-center">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-[#e0d7c6]/60 tracking-widest uppercase">DEVELOPMENT RANGE:</span>
            <span className="text-white font-bold text-sm tracking-wide">{project.sqftRange || '850 - 3,200 sq.ft.'}</span>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-[#e0d7c6]/60 tracking-widest uppercase">BEDROOM PLAN:</span>
              <span className="text-white font-bold text-sm tracking-wide">{project.bedrooms.join(', ')} bedroom layouts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-[#e0d7c6]/60 tracking-widest uppercase">COMPLETION TARGET:</span>
              <span className="text-white font-bold text-sm tracking-wide">{project.handover}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary specs column / overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        
        {/* Left 2 cols: overview text, highlights, amenities */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Overviews */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-[#e0d7c6] tracking-widest uppercase mb-1">THE ASSET INDEX</span>
            <h2 className="text-white text-xl font-sans font-bold tracking-tight uppercase">Project Masterwork Brief</h2>
            <div className="w-12 h-0.5 bg-[#e0d7c6] mt-1"></div>
            <p className="text-white/70 text-xs sm:text-sm tracking-normal leading-relaxed mt-3 whitespace-pre-line font-normal">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="flex flex-col gap-4 bg-[#141414] border border-white/5 p-6 sm:p-8 rounded-sm">
            <span className="text-[10px] font-mono text-[#e0d7c6]/60 tracking-widest uppercase">REGISTRY KEY FACTS</span>
            <h2 className="text-white text-xl font-sans font-bold tracking-tight uppercase">Capital Performance Highlights</h2>
            <div className="space-y-4 mt-4">
              {project.highlights.map((hlt, idx) => (
                <div key={idx} className="flex gap-3 text-xs leading-relaxed text-white/70 font-normal">
                  <CheckCircle2 className="w-5 h-5 text-[#e0d7c6] flex-shrink-0 mt-0.5" />
                  <span>{hlt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">EXCLUSIVE LIFESTYLE</span>
            <h2 className="text-white text-xl font-sans font-bold tracking-tight uppercase">Curated Residence Amenities</h2>
            <div className="w-12 h-0.5 bg-[#e0d7c6] mt-1 mb-2"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-white/70">
              {project.amenities.map((am, idx) => (
                <div key={idx} className="p-3 border border-white/5 bg-[#141414] flex items-center gap-2 rounded-xs">
                  <div className="w-1.5 h-1.5 bg-[#e0d7c6] rounded-full" />
                  <span className="font-sans font-medium">{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map details / locations advantages */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">LOCATION INTELLIGENCE</span>
            <h2 className="text-white text-xl font-sans font-bold tracking-tight uppercase">Prestige Connectivity Milestones</h2>
            <div className="w-12 h-0.5 bg-[#e0d7c6] mt-1 mb-2"></div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs leading-relaxed text-white/70">
                <Compass className="w-4 h-4 text-[#e0d7c6]/60 flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#e0d7c6] font-semibold font-sans uppercase">Exact Coordinates:</strong> Latitude: {project.latitude.toFixed(5)}, Longitude: {project.longitude.toFixed(5)}. Excellent central linkages to arterial community roads.</span>
              </div>
              <div className="flex items-start gap-3 text-xs leading-relaxed text-white/70">
                <Compass className="w-4 h-4 text-[#e0d7c6]/60 flex-shrink-0 mt-0.5" />
                <span>Minutes within reach of luxury retail avenues, global banking institutions, and premium gourmet fine dining ports.</span>
              </div>
              <div className="flex items-start gap-3 text-xs leading-relaxed text-white/70">
                <Compass className="w-4 h-4 text-[#e0d7c6]/60 flex-shrink-0 mt-0.5" />
                <span>Protected capital appreciation buffer due to strict zoning limitations and continuous beachfront expansions.</span>
              </div>
            </div>
          </div>

          {/* End left column */}
        </div>

        {/* Right 1 col: payment plans sidebar & floor plans blueprints */}
        <div className="flex flex-col gap-10">
          
          {/* Payment Plan breakdown */}
          <div className="border border-white/5 bg-[#141414] text-white p-6 sm:p-8 rounded-sm">
            <span className="text-[10px] font-mono text-[#e0d7c6]/60 tracking-widest uppercase">REGULATORY ACCOUNT</span>
            <h2 className="text-white text-lg font-sans font-bold tracking-tight uppercase mb-4">Payment Plan Analysis</h2>
            
            <div className="space-y-6">
              
              {/* Payment details pill */}
              <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xs">
                <span className="text-[9px] font-mono text-[#e0d7c6]/50 tracking-wider block uppercase">Developer Standard Structure:</span>
                <span className="text-white font-sans font-bold text-xl block mt-0.5">{project.paymentPlan}</span>
                <p className="text-white/40 text-[10px] leading-relaxed mt-1 font-normal">Regulated UAE Escrow protected structure insuring complete funding limits prior to stage checks.</p>
              </div>

              {/* Installments Breakdown */}
              <div className="space-y-4">
                
                {/* Milestone 1 */}
                <div className="flex items-start gap-3 border-l-2 border-white/10 pl-4 py-0.5">
                  <div className="p-1 px-2.5 bg-[#e0d7c6] text-[#0a0a0a] font-mono font-bold text-[10px] rounded-xs">
                    01
                  </div>
                  <div>
                    <span className="text-[#e0d7c6]/70 tracking-wide font-mono text-[10px] block uppercase">Booking Deposit</span>
                    <span className="font-sans font-semibold text-xs text-white block mt-0.5">{paymentBreakdown.booking} of Asset Value</span>
                    <p className="text-white/40 text-[9px] mt-0.5 font-normal">Locks physical asset unit number and initiates master contract.</p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="flex items-start gap-3 border-l-2 border-white/10 pl-4 py-0.5">
                  <div className="p-1 px-1.5 bg-[#0a0a0a] text-[#e0d7c6] border border-white/5 font-mono font-bold text-[10px] rounded-xs">
                    02
                  </div>
                  <div>
                    <span className="text-white/60 tracking-wide font-mono text-[10px] block uppercase">Construction Phase</span>
                    <span className="font-sans font-semibold text-xs text-white block mt-0.5">{paymentBreakdown.duringConst} distributed installments</span>
                    <p className="text-white/40 text-[9px] mt-0.5 font-normal">Linked directly to certified engineers DLD completion checklists.</p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="flex items-start gap-3 border-l-2 border-white/10 pl-4 py-0.5">
                  <div className="p-1 px-1.5 bg-[#0a0a0a] text-[#e0d7c6] border border-white/5 font-mono font-bold text-[10px] rounded-xs">
                    03
                  </div>
                  <div>
                    <span className="text-white/60 tracking-wide font-mono text-[10px] block uppercase">Handover Balance</span>
                    <span className="font-sans font-semibold text-xs text-white block mt-0.5">{paymentBreakdown.handover} Upon Key Keys</span>
                    <p className="text-white/40 text-[9px] mt-0.5 font-normal">Financeable via standard local offshore banks checking.</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* CAD Blueprint structural illustration placeholder */}
          <div className="border border-white/5 bg-[#141414] p-6 rounded-sm text-xs">
            <span className="text-[10px] font-mono text-[#e0d7c6]/60 tracking-widest uppercase mb-1 block">ARCHITECTURAL SCHEMATICS</span>
            <h2 className="text-white text-lg font-sans font-bold tracking-tight uppercase mb-4">Floor Plan Schematics</h2>
            
            {/* Visual vector sketch box */}
            <div className="border border-dashed border-white/10 aspect-square rounded-xs bg-[#0a0a0a] p-4 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              
              {/* Fake modular wall outlines */}
              <div className="border-2 border-[#e0d7c6]/30 w-3/4 h-2/3 rounded-xs relative z-10 flex flex-col justify-between p-4 bg-black/45">
                <div className="flex justify-between items-center w-full border-b border-white/5 pb-2">
                  <span className="text-[8px] font-mono text-[#e0d7c6]/50 uppercase">SUITE BEDROOM</span>
                  <span className="text-[8px] font-mono text-[#e0d7c6]/50 uppercase">WARDROBE</span>
                </div>
                <div className="flex justify-between items-center w-full pt-2">
                  <span className="text-[8px] font-mono text-[#e0d7c6]/50 uppercase">MAIN LIVING SALON</span>
                  <span className="text-[8px] font-mono text-[#e0d7c6]/50 uppercase">BALCONY</span>
                </div>
              </div>

              <div className="text-center mt-4 relative z-10">
                <span className="text-[10px] text-[#e0d7c6] font-mono tracking-widest uppercase font-bold">PRESTIGE SUITE MAP</span>
                <span className="text-[9px] text-white/40 block mt-1">High-resolution customizable blueprint vector (PDF)</span>
              </div>
            </div>

            <button 
              id="btn-download-pdf-brochure"
              onClick={() => alert(`Official ${project.developer} brochure download catalog initialized on secure servers.`)}
              className="w-full mt-4 border border-white/20 text-[#e0d7c6] bg-transparent hover:border-[#e0d7c6] hover:bg-[#e0d7c6]/10 font-sans font-bold text-[10px] tracking-[0.16em] uppercase py-3 flex items-center justify-center gap-2 transition-all duration-200 rounded-sm cursor-pointer"
            >
              <FileDown className="w-4 h-4" /> Download Brochure CATALOG (PDF)
            </button>
          </div>

        </div>

      </div>

      {/* Grid gallery display */}
      <div id="project-galleries" className="mb-16">
        <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase block mb-1">DEVELOPMENT GALLERY</span>
        <h2 className="text-white text-2xl font-sans font-bold tracking-tight uppercase mb-6">Interior and Exterior Renderings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.images.concat([
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
          ]).slice(0, 5).map((imgUrl, iIdx) => (
            <div 
              key={iIdx} 
              id={`gallery-item-${iIdx}`} 
              className={`relative overflow-hidden bg-[#141414] border border-white/5 group ${
                iIdx === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-16/10' : 'aspect-square'
              }`}
            >
              <img
                src={imgUrl}
                alt={`${project.name} framing ${iIdx + 1}`}
                className="w-full h-full object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="text-white font-mono text-[9px] tracking-widest uppercase border border-white/40 p-2">
                  <Eye className="w-4 h-4 inline-block mr-1 text-[#e0d7c6]" /> Inspect View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Anchor and form layout */}
      <div id="consultation-inquiry-anchor" className="border-t border-white/5 pt-16 mb-20 max-w-4xl mx-auto">
        <InquiryForm preFilledProject={project.name} preFilledCity={project.city} />
      </div>

      {/* Similar assets section */}
      {similarProjects.length > 0 && (
        <div id="similar-section" className="border-t border-white/5 pt-16">
          <span className="text-[10px] font-mono text-white/40 tracking-[0.25em] block uppercase text-center mb-1">DEVELOPMENT SIMILARITIES</span>
          <h2 className="text-white text-2xl font-sans font-bold tracking-tight uppercase text-center mb-10">Alternative Curated Asset Portfolios</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {similarProjects.map((simProj) => (
              <div 
                key={simProj.id}
                id={`similar-item-${simProj.id}`}
                className="border border-white/5 bg-[#141414] hover:border-[#e0d7c6]/40 p-5 flex flex-col justify-between transition-all duration-300 group cursor-pointer rounded-sm"
                onClick={() => onViewProject(simProj.slug)}
              >
                <div>
                  <div className="aspect-16/10 overflow-hidden bg-[#0a0a0a] mb-4">
                    <img
                      src={simProj.images[0]}
                      alt={simProj.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5 font-normal">
                    <span>{simProj.community}</span>
                    <span className="font-sans font-bold text-[#e0d7c6] border border-white/5 bg-[#0a0a0a] px-1.5">{simProj.developer}</span>
                  </div>
                  <h4 className="text-white text-sm font-sans font-bold tracking-wide group-hover:text-[#e0d7c6] mb-1 leading-snug line-clamp-1 transition-colors duration-150">
                    {simProj.name}
                  </h4>
                  <p className="text-white/50 text-[10px] font-mono mb-4">
                    Starting: AED {(simProj.startingPrice / 1000000).toFixed(1)}M • Handover {simProj.handover}
                  </p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onViewProject(simProj.slug); }}
                  className="text-[9px] font-mono text-[#e0d7c6] font-bold tracking-wider uppercase border-t border-white/5 pt-3 text-left flex items-center justify-between group-hover:text-white transition-colors duration-150"
                >
                  Inspect Asset Portfolio <ChevronRight className="w-3 h-3 text-[#e0d7c6]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </article>
  );
}
