/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Landmark, BadgeCheck, FileCheck2, Scale, 
  Percent, ArrowRightLeft, ShieldAlert, Award, Compass, Search, ChevronRight 
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import InquiryForm from './components/InquiryForm';
import CityHighlights from './components/CityHighlights';
import AdvisoryDesk from './components/AdvisoryDesk';
import ProjectDetail from './components/ProjectDetail';
import { Project } from './types';
import { projectDataService } from './utils/projectDataService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [advisoryDeskOpen, setAdvisoryDeskOpen] = useState(false);
  const [deskProjectInterest, setDeskProjectInterest] = useState('');
  
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Load preliminary catalog datasets
  useEffect(() => {
    async function initData() {
      setLoading(true);
      const featured = await projectDataService.getFeaturedProjects(6);
      const all = await projectDataService.getProjects();
      setFeaturedProjects(featured);
      setAllProjects(all);
      setFilteredProjects(all);
      setLoading(false);
    }
    initData();
  }, []);

  // Update listings based on filters
  const handleFilterChange = async (filters: any) => {
    setLoading(true);
    const results = await projectDataService.getFilteredProjects(filters);
    setFilteredProjects(results);
    setLoading(false);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedProjectSlug(null); // Clear selected details when shifting pages
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleEnquire = (projectName: string) => {
    setDeskProjectInterest(projectName);
    setAdvisoryDeskOpen(true);
  };

  const handleViewProjectDetails = (slug: string) => {
    setSelectedProjectSlug(slug);
  };

  const handleBackToListing = () => {
    setSelectedProjectSlug(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white/90 font-sans selection:bg-[#e0d7c6] selection:text-[#0a0a0a] antialiased">
      
      {/* Header controls - matches layout perfectly */}
      <Header 
        currentTab={activeTab} 
        onTabChange={handleTabChange} 
        onOpenAdvisoryDesk={() => { setDeskProjectInterest(''); setAdvisoryDeskOpen(true); }} 
      />

      {/* Main Structural Body */}
      <main className="flex-grow">
        
        {/* If selectedProjectSlug is active, render ProjectDetail view immediately. Otherwise render full page routes. */}
        {selectedProjectSlug ? (
          <ProjectDetail 
            projectSlug={selectedProjectSlug}
            onBackToListing={handleBackToListing}
            onViewProject={handleViewProjectDetails}
            onEnquire={handleEnquire}
          />
        ) : (
          <div>
            
            {/* PAGE TAB RENDERER */}
            {activeTab === 'home' && (
              <div id="home-view" className="animate-fade-in">
                
                {/* HERO AREA - Replicates requested screenshot perfectly */}
                <section id="hero-showcase" className="py-20 sm:py-28 px-6 sm:px-12 bg-[#0a0a0a] relative overflow-hidden border-b border-white/5 flex items-center">
                  <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left text column */}
                    <div className="lg:col-span-8 flex flex-col items-start gap-6 relative z-10">
                      
                      {/* Badge */}
                      <div className="bg-white/5 border border-white/10 text-[#e0d7c6] text-[9px] font-mono font-bold tracking-[0.25em] px-3.5 py-1.5 uppercase select-none rounded-xs">
                        Market Insight 2026
                      </div>
                      
                      {/* Big Heading paired sans & serif italic */}
                      <h1 className="text-white font-sans text-5xl sm:text-7xl font-light tracking-tight leading-[1.05] uppercase select-none">
                        Dubai & Abu Dhabi 
                        <br />
                        <span className="italic font-serif font-normal normal-case text-[#e0d7c6] block mt-2">
                          Off-Plan Investment
                        </span>
                      </h1>
                      
                      {/* Subheadline description */}
                      <p className="text-white/60 text-xs sm:text-sm tracking-wide leading-relaxed max-w-xl">
                        Curated off-plan residential and luxury opportunities from leading UAE developers, meticulously vetted by elite advisors for capital appreciation and recurring yield performance.
                      </p>
                      
                      {/* Double button CTA row */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-4 font-sans text-[10px] font-bold tracking-[0.16em]">
                        <button 
                          onClick={() => handleTabChange('projects')}
                          className="bg-[#e0d7c6] hover:bg-[#e0d7c6]/90 text-[#0a0a0a] py-4 px-8 text-center transition-all duration-200 uppercase rounded-sm cursor-pointer"
                        >
                          Explore Selected Projects
                        </button>
                        <button 
                          onClick={() => { setDeskProjectInterest(''); setAdvisoryDeskOpen(true); }}
                          className="border border-white/10 hover:border-[#e0d7c6] text-white py-4 px-8 bg-transparent text-center transition-all duration-200 flex items-center justify-center gap-2 uppercase rounded-sm cursor-pointer hover:bg-white/5"
                        >
                          Book Advisory <ArrowRightLeft className="w-3.5 h-3.5 text-[#e0d7c6]" />
                        </button>
                      </div>

                    </div>

                    {/* Right decorative visual box (Architectural Blueprint lines layout to suit clean portfolio feel) */}
                    <div className="hidden lg:flex lg:col-span-4 aspect-square border border-white/5 bg-[#141414] p-8 relative flex-col justify-between overflow-hidden rounded-sm">
                      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      
                      <div className="flex justify-between items-start font-mono text-[9px] text-[#e0d7c6]/60">
                        <span>PORTFOLIO CAP: 100 LISTINGS</span>
                        <span>UAE 2026 INDEX</span>
                      </div>
                      
                      {/* Vector wireframe box */}
                      <div className="w-full aspect-square border border-white/5 relative flex items-center justify-center scale-90 bg-black/40">
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5"></div>
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5"></div>
                        <div className="w-2/3 h-2/3 border border-[#e0d7c6]/30 rounded-full animate-pulse-slow"></div>
                        <div className="w-1/3 h-1/3 border border-dashed border-[#e0d7c6]/15 rounded-full"></div>
                        <span className="absolute bottom-2 right-2 font-mono text-[8px] text-white/30">ESCROW ASSURED LIMITS</span>
                      </div>
                      
                      <div className="flex justify-between items-end font-sans text-[10px] tracking-widest text-[#e0d7c6] font-bold uppercase mt-4">
                        <span>GHAR ADVISORY</span>
                        <span>0% TAX YIELDS</span>
                      </div>
                    </div>

                  </div>
                </section>

                 {/* FEATURED PROJECTS SUB SECTION */}
                <section id="featured-projects" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-white/40 tracking-[0.25em] uppercase">CURATED DEVELOPMENTS</span>
                      <h2 className="text-white text-2xl sm:text-3xl font-sans font-bold tracking-tight uppercase">Featured Off-Plan Assets</h2>
                    </div>
                    <button 
                      onClick={() => handleTabChange('projects')}
                      className="group text-[10px] text-[#e0d7c6]/80 hover:text-white font-sans font-bold tracking-[0.2em] uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      View All 100 Listings <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#e0d7c6]" />
                    </button>
                  </div>

                  {loading ? (
                    <div className="py-12 text-center text-xs font-mono text-white/40 uppercase tracking-widest animate-pulse">Compiling catalog...</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {featuredProjects.map((p) => (
                        <ProjectCard 
                          key={p.id} 
                          project={p} 
                          onViewDetails={handleViewProjectDetails} 
                          onEnquire={handleEnquire} 
                        />
                      ))}
                    </div>
                  )}
                </section>

                {/* WHY INVEST SECTION */}
                <section id="why-invest" className="py-20 bg-[#0a0a0a] text-white px-6 sm:px-12 border-t border-white/5">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-4">
                      <span className="text-[9px] font-mono text-[#e0d7c6] tracking-[0.25em] uppercase">PORTFOLIO SHIELD</span>
                      <h2 className="text-white text-2xl sm:text-3xl font-sans font-light tracking-tight uppercase leading-snug">
                        Why Invest in UAE 
                        <br />
                        <span className="italic font-serif font-normal normal-case text-[#e0d7c6]/80 block mt-1">Off-Plan Ventures</span>
                      </h2>
                      <div className="w-12 h-[1px] bg-[#e0d7c6]/40 mt-2"></div>
                      <p className="text-white/60 text-xs tracking-normal leading-relaxed max-w-md mt-2">
                        UAE off-plan real estate remains the primary choice for global wealth preservation, fueled by premium investor yields, forward-thinking sovereign infrastructure, and strict title escrow safety standards.
                      </p>
                    </div>

                    <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
                      
                      <div className="bg-[#141414] border border-white/5 p-6 flex flex-col gap-3 rounded-sm">
                        <div className="text-[#e0d7c6]/60 font-mono text-xs font-bold">01 / FISCAL NEUTRALITY</div>
                        <h4 className="text-white text-sm font-semibold tracking-wide uppercase">Tax-Free Yield Compounding</h4>
                        <p className="text-white/50 leading-relaxed text-xs">Enjoy 0% rental income tax, 0% capital gains tax, and full offshore corporate capital repatriation limits.</p>
                      </div>

                      <div className="bg-[#141414] border border-white/5 p-6 flex flex-col gap-3 rounded-sm">
                        <div className="text-[#e0d7c6]/60 font-mono text-xs font-bold">02 / CAPITAL COMMITTING</div>
                        <h4 className="text-white text-sm font-semibold tracking-wide uppercase">Stage-Construction Leverage</h4>
                        <p className="text-white/50 leading-relaxed text-xs">Distribute capital across construction milestones, securing assets at standard ground-zero base prices prior to completion.</p>
                      </div>

                      <div className="bg-[#141414] border border-white/5 p-6 flex flex-col gap-3 rounded-sm">
                        <div className="text-[#e0d7c6]/60 font-mono text-xs font-bold">03 / TRUST PREJUDICE</div>
                        <h4 className="text-white text-sm font-semibold tracking-wide uppercase">Dubai/Abu Dhabi Escrow Laws</h4>
                        <p className="text-white/50 leading-relaxed text-xs">All installment payments go directly to highly regulated, bank-supervised developer escrow channels strictly release-linked to site audits.</p>
                      </div>

                      <div className="bg-[#141414] border border-white/5 p-6 flex flex-col gap-3 rounded-sm">
                        <div className="text-[#e0d7c6]/60 font-mono text-xs font-bold">04 / GOLDEN MOBILITY</div>
                        <h4 className="text-white text-sm font-semibold tracking-wide uppercase">Sovereign 10-Year Golden Visa</h4>
                        <p className="text-white/50 leading-relaxed text-xs">Acquiring assets yielding starting limits of AED 2M qualifies the main investor and families for extended federal residential status.</p>
                      </div>

                    </div>

                  </div>
                </section>

                {/* COMPARISON METRICS SECTION */}
                <CityHighlights />

                {/* SERVICES BREAKDOWN SECTION */}
                <section id="services-breakdown" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
                  
                  <div className="text-center max-w-xl mx-auto flex flex-col gap-3 mb-16">
                    <span className="text-[10px] font-mono text-[#e0d7c6]/80 tracking-[0.25em] uppercase">HOW WE SERVE CLIENTS</span>
                    <h2 className="text-white text-2xl sm:text-3xl font-sans font-bold tracking-tight uppercase">Tailored Investment Advisory</h2>
                    <p className="text-white/50 text-xs leading-relaxed">Unlike commodity brokers, our elite advisory handles quantitative portfolio optimization, developer comparative scoring, and payment stress testing.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-xs font-sans">
                    
                    <div className="p-6 border border-white/5 bg-[#141414] hover:border-[#e0d7c6]/40 transition-colors flex flex-col gap-3.5 rounded-sm group shadow-sm">
                      <div className="w-10 h-10 bg-[#0a0a0a] flex items-center justify-center text-[#e0d7c6] font-semibold font-mono text-xs border border-white/10 rounded-sm">SA</div>
                      <h4 className="text-white text-sm font-bold tracking-wide uppercase group-hover:text-[#e0d7c6] transition-colors duration-150">Off-Plan Project Selection</h4>
                      <p className="text-white/60 leading-relaxed text-xs">Vetting individual unit layouts, views, beach access parameters, and community demand curves to isolate premium assets in active Dubai/Abu Dhabi zones.</p>
                    </div>

                    <div className="p-6 border border-white/5 bg-[#141414] hover:border-[#e0d7c6]/40 transition-colors flex flex-col gap-3.5 rounded-sm group shadow-sm">
                      <div className="w-10 h-10 bg-[#0a0a0a] flex items-center justify-center text-[#e0d7c6] font-semibold font-mono text-xs border border-white/10 rounded-sm">CC</div>
                      <h4 className="text-white text-sm font-bold tracking-wide uppercase group-hover:text-[#e0d7c6] transition-colors duration-150">Developer Comparative Vetting</h4>
                      <p className="text-white/60 leading-relaxed text-xs">Auditing developers historical handover timelines, legal compliance scores, construction quality index metrics, and escrow accounts consistency.</p>
                    </div>

                    <div className="p-6 border border-white/5 bg-[#141414] hover:border-[#e0d7c6]/40 transition-colors flex flex-col gap-3.5 rounded-sm group shadow-sm">
                      <div className="w-10 h-10 bg-[#0a0a0a] flex items-center justify-center text-[#e0d7c6] font-semibold font-mono text-xs border border-white/10 rounded-sm">IA</div>
                      <h4 className="text-white text-sm font-bold tracking-wide uppercase group-hover:text-[#e0d7c6] transition-colors duration-150">Portfolio Investment Advisory</h4>
                      <p className="text-white/60 leading-relaxed text-xs">Assembling quantitative financial portfolios across multiple communities to allocate risk, maximize rental leverage, and capitalize capital appreciation trends.</p>
                    </div>

                    <div className="p-6 border border-white/5 bg-[#141414] hover:border-[#e0d7c6]/40 transition-colors flex flex-col gap-3.5 rounded-sm group shadow-sm">
                      <div className="w-10 h-10 bg-[#0a0a0a] flex items-center justify-center text-[#e0d7c6] font-semibold font-mono text-xs border border-white/10 rounded-sm">ST</div>
                      <h4 className="text-white text-sm font-bold tracking-wide uppercase group-hover:text-[#e0d7c6] transition-colors duration-150">Payment Plan Stress Analysis</h4>
                      <p className="text-white/60 leading-relaxed text-xs">Analyzing down payment ratios, installment frequency stressors, and handover balance payment timelines to matches investor liquidity models.</p>
                    </div>

                    <div className="p-6 border border-white/5 bg-[#141414] hover:border-[#e0d7c6]/40 transition-colors flex flex-col gap-3.5 rounded-sm group shadow-sm">
                      <div className="w-10 h-10 bg-[#0a0a0a] flex items-center justify-center text-[#e0d7c6] font-semibold font-mono text-xs border border-white/10 rounded-sm">HL</div>
                      <h4 className="text-white text-sm font-bold tracking-wide uppercase group-hover:text-[#e0d7c6] transition-colors duration-150">Handovers and Off-shore Mortgages</h4>
                      <p className="text-white/60 leading-relaxed text-xs">Vetting offshore lending protocols, matching local banking options, coordinating physical handover inspections, and managing title registrations with Land officials.</p>
                    </div>

                    <div className="p-6 border border-white/5 bg-[#141414] hover:border-[#e0d7c6]/40 transition-colors flex flex-col gap-3.5 rounded-sm group shadow-sm">
                      <div className="w-10 h-10 bg-[#0a0a0a] flex items-center justify-center text-[#e0d7c6] font-semibold font-mono text-xs border border-white/10 rounded-sm">ES</div>
                      <h4 className="text-white text-sm font-bold tracking-wide uppercase group-hover:text-[#e0d7c6] transition-colors duration-150">Resales and Liquidity Exit Strategies</h4>
                      <p className="text-white/60 leading-relaxed text-xs">Developing custom marketing timetables to liquidate off-plan assets prior to key completion dates, tapping early high-yielding capital appreciation curves.</p>
                    </div>

                  </div>
                </section>

                {/* LEAD INQUIRY MODULE */}
                <section id="home-lead-capture" className="py-20 bg-[#0a0a0a] border-t border-white/5 px-6 sm:px-12">
                  <div className="max-w-4xl mx-auto">
                    <InquiryForm onSuccessSubmit={() => console.log('Home context lead recorded successfully.')} />
                  </div>
                </section>

              </div>
            )}

            {activeTab === 'projects' && (
              <div id="projects-view" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto animate-fade-in">
                
                {/* Title area */}
                <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col gap-2">
                  <span className="text-[9px] font-mono text-[#e0d7c6]/80 tracking-[0.25em] uppercase">CATALOG SEARCH DIRECTORY</span>
                  <h1 className="text-white text-3xl font-sans font-bold tracking-tight uppercase">Off-Plan Project Registry</h1>
                  <p className="text-white/50 text-xs leading-relaxed mt-1">Filter and search through our active portfolio of 100 Dubai and Abu Dhabi premium launches. Compare prices, handovers, and payment options directly.</p>
                </div>

                {/* Filter System */}
                <ProjectFilters onFilterChange={handleFilterChange} />

                {/* Catalog Counts Status bar */}
                <div className="mb-6 flex justify-between items-center text-xs text-white/40 font-mono">
                  <span>SHOWING {filteredProjects.length} OF 100 ELITE OFF-PLAN LISTINGS</span>
                  <span>CATALOG INDEX V2026.05</span>
                </div>

                {/* Listings Grid */}
                {loading ? (
                  <div className="py-24 text-center max-w-md mx-auto flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-2 border-[#e0d7c6] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] font-mono tracking-widest text-[#e0d7c6] uppercase">Updating Catalog Registries...</span>
                  </div>
                ) : filteredProjects.length === 0 ? (
                  <div className="py-20 text-center border border-dashed border-white/15 bg-[#141414] mt-6 max-w-xl mx-auto flex flex-col items-center justify-center gap-3 p-8 rounded-sm">
                    <Search className="w-10 h-10 text-white/30 stroke-1" />
                    <span className="text-white text-sm font-sans font-bold uppercase tracking-wider">No Match Coordinates Found</span>
                    <p className="text-white/50 text-xs leading-relaxed max-w-sm">No off-plan projects matched your current filtering criteria. Please refine your target budget ranges, developer options, or locations.</p>
                    <button
                      onClick={() => handleFilterChange({})}
                      className="bg-[#e0d7c6] text-[#0a0a0a] hover:bg-[#e0d7c6]/90 text-[9px] font-sans font-bold tracking-widest uppercase px-6 py-2.5 transition-all cursor-pointer mt-2 rounded-sm"
                    >
                      Clear Search Parameters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((p) => (
                      <ProjectCard 
                        key={p.id} 
                        project={p} 
                        onViewDetails={handleViewProjectDetails} 
                        onEnquire={handleEnquire} 
                      />
                    ))}
                  </div>
                )}

              </div>
            )}

            {activeTab === 'dubai' && (
              <div id="dubai-directory-view" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto animate-fade-in">
                
                {/* Title */}
                <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col gap-2">
                  <span className="text-[9px] font-mono text-white/40 tracking-[0.25em] uppercase">DUBAI PORTFOLIO TARGETS</span>
                  <h1 className="text-white text-3xl font-sans font-bold tracking-tight uppercase">Dubai Off-Plan Projects</h1>
                  <p className="text-white/50 text-xs leading-relaxed mt-1">Explore targeted premium off-plan directories focused in Dubai's key appreciation hubs including Downtown Dubai, Palm Jumeirah, Business Bay, JVC, and Emaar Beachfront.</p>
                </div>

                {/* Filter and custom dynamic registries */}
                <ProjectFilters initialCity="Dubai" onFilterChange={handleFilterChange} />

                {/* Listing Grid */}
                {loading ? (
                  <div className="py-20 text-center text-xs font-mono text-white/40 uppercase tracking-widest animate-pulse-slow">Vetting Dubai Escrows...</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((p) => (
                      <ProjectCard 
                        key={p.id} 
                        project={p} 
                        onViewDetails={handleViewProjectDetails} 
                        onEnquire={handleEnquire} 
                      />
                    ))}
                  </div>
                )}

              </div>
            )}

            {activeTab === 'abudhabi' && (
              <div id="abudhabi-directory-view" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto animate-fade-in">
                
                {/* Title */}
                <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col gap-2">
                  <span className="text-[9px] font-mono text-white/40 tracking-[0.25em] uppercase">ABU DHABI PORTFOLIO TARGETS</span>
                  <h1 className="text-white text-3xl font-sans font-bold tracking-tight uppercase">Abu Dhabi Off-Plan Projects</h1>
                  <p className="text-white/50 text-xs leading-relaxed mt-1">Discover cultural and high-end residential assets situated in Abu Dhabi’s pristine island neighborhoods, including Saadiyat Culture District, Yas Links, Masdar Eco-City, and Al Reem Hills.</p>
                </div>

                {/* Filters */}
                <ProjectFilters initialCity="Abu Dhabi" onFilterChange={handleFilterChange} />

                {/* Listings Grid */}
                {loading ? (
                  <div className="py-20 text-center text-xs font-mono text-white/40 uppercase tracking-widest animate-pulse-slow">Auditing Abu Dhabi Municipal Escrows...</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((p) => (
                      <ProjectCard 
                        key={p.id} 
                        project={p} 
                        onViewDetails={handleViewProjectDetails} 
                        onEnquire={handleEnquire} 
                      />
                    ))}
                  </div>
                )}

              </div>
            )}

            {activeTab === 'advisory' && (
              <div id="advisory-full-page-view" className="py-16 px-6 sm:px-8 max-w-5xl mx-auto animate-fade-in text-xs font-sans">
                
                {/* Header context */}
                <div className="text-center max-w-xl mx-auto mb-12 flex flex-col gap-3">
                  <span className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">GHAR ADVISORY SERVICES</span>
                  <h1 className="text-white text-3xl font-sans font-bold tracking-tight uppercase">Sovereign Asset & Leverage Modeling</h1>
                  <div className="w-12 h-[1px] bg-[#e0d7c6]/60 mx-auto mt-2"></div>
                  <p className="text-white/50 leading-relaxed text-xs">For domestic and global high-net-worth investors, we handle sovereign wealth allocations, offshore regulatory protections, tax-leverage modeling, and capital growth metrics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                  
                  {/* Explanations text block */}
                  <div className="flex flex-col gap-6">
                    <h3 className="text-[#e0d7c6] text-lg font-bold uppercase tracking-wider">Premium Advisory Frameworks</h3>
                    
                    <div className="space-y-4">
                      
                      <div className="flex gap-3">
                        <Landmark className="w-5 h-5 text-[#e0d7c6]/60 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white uppercase tracking-wider text-[11px] block mb-1">Golden Visa Compliance Selection</strong>
                          <p className="text-white/60 leading-normal text-xs">Isolating off-plan acquisitions crossing the AED 2M capital registry threshold to secure long-term 10-year residency status for investors, spouses, and families securely.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <BadgeCheck className="w-5 h-5 text-[#e0d7c6]/60 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white uppercase tracking-wider text-[11px] block mb-1">Escrow Account Auditing</strong>
                          <p className="text-white/60 leading-normal text-xs">Verifying that all structural capital allocations reside within bank-monitored RERA trust accounts, release-capped exactly to municipal engineering progress certificates.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Scale className="w-5 h-5 text-[#e0d7c6]/60 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white uppercase tracking-wider text-[11px] block mb-1">Tax-Haven Wealth Shielding</strong>
                          <p className="text-white/60 leading-normal text-xs">Structuring off-plan capital allocations to hedge globally against corporate tax boundaries, using 0% income and 0% capital gains frameworks of the UAE.</p>
                        </div>
                      </div>

                    </div>

                    <div className="bg-[#141414] p-6 border border-white/5 flex flex-col gap-3 mt-4 rounded-sm">
                      <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase block">DIGITAL SERVICE DESK</span>
                      <h4 className="text-[#e0d7c6] font-bold uppercase tracking-wide text-xs">Chat live with our ground Advisor Engine</h4>
                      <p className="text-white/50 text-xs leading-relaxed">Our proprietary digital advisory desk uses Google Search grounding to retrieve real-time announcements, prices, and development status updates from the UAE land department.</p>
                      
                      <button
                        onClick={() => { setDeskProjectInterest(''); setAdvisoryDeskOpen(true); }}
                        className="bg-[#e0d7c6] hover:bg-[#e0d7c6]/90 text-[#0a0a0a] font-sans font-bold text-[10px] tracking-widest uppercase py-3 text-center block w-full mt-2 rounded-sm cursor-pointer transition-colors duration-150"
                      >
                        Launch Advisor Chatbot
                      </button>
                    </div>

                  </div>

                  {/* Consultation Form panel */}
                  <div className="border border-white/5 bg-[#0a0a0a]">
                    <InquiryForm onSuccessSubmit={() => console.log('Advisory routing lead processed.')} />
                  </div>

                </div>

              </div>
            )}

            {activeTab === 'about' && (
              <div id="about-us-view" className="py-16 px-6 sm:px-8 max-w-5xl mx-auto animate-fade-in text-xs font-sans">
                
                <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
                  <span className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">ESTABLISHED PRESENCE</span>
                  <h1 className="text-white text-3xl font-sans font-bold tracking-tight uppercase">About Jaydeep Barai Advisory</h1>
                  <div className="w-12 h-[1px] bg-[#e0d7c6]/60 mx-auto mt-2"></div>
                  <p className="text-white/50 leading-relaxed text-xs">A signature real estate consultancy based in Business Bay, Dubai, providing high-net-worth investors and sovereign partners with unmatched, data-driven off-plan property asset acquisition guidance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                  
                  {/* Left decorative portrait placeholder (Architectural, classy, minimal) */}
                  <div className="aspect-4/5 border border-white/5 bg-[#141414] p-4 relative flex flex-col justify-between rounded-sm">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    
                    <div className="font-mono text-[8px] text-white/40">JAYDEEP BARAI REAL ESTATE ADVISORY</div>
                    
                    
                    {/* Abstract minimal structural lines drawing representing skyline */}
                    <div className="w-full h-1/2 flex items-end justify-center gap-2 relative z-10 bg-[#0a0a0a]/30 p-2 border border-white/5 rounded-xs">
                      <div className="w-1/6 h-5/6 border border-white/10 bg-[#0a0a0a] shadow-xs"></div>
                      <div className="w-1/6 h-full border border-[#e0d7c6] bg-[#e0d7c6]/10"></div>
                      <div className="w-1/6 h-4/6 border border-white/10 bg-[#0a0a0a] shadow-xs"></div>
                      <div className="w-1/6 h-2/3 border border-white/10 bg-[#141414]"></div>
                    </div>

                    <div className="font-sans font-bold text-[#e0d7c6] text-[10px] tracking-widest text-right mt-4 uppercase">UAE PORTFOLIO STRATEGY 2026</div>
                  </div>

                  {/* About textual profile details */}
                  <div className="flex flex-col gap-6">
                    <span className="text-[10px] font-mono text-[#e0d7c6]/60 tracking-widest uppercase">OUR CODE OF ETHICS</span>
                    <h3 className="text-white text-xl font-sans font-light tracking-tight uppercase">Silent Luxury, Pure Financial Vetting</h3>
                    <p className="text-white/70 leading-relaxed text-xs">
                      At GHAR ADVISORY, we recognize that luxury off-plan acquisitions represent sophisticated capital placements. We do not engage in loud marketing campaigns or high-pressure broker tactics. Our team is structured purely of seasoned financial analysts, tax specialists, and real estate legal veterans who analyze real assets under strict quantitative risk matrices.
                    </p>
                    <p className="text-white/70 leading-relaxed text-xs">
                      Led by expert real estate partner Jaydeep Barai, we manage client allocations across the UAE tier-1 developers such as Emaar, Aldar, Nakheel, and Sobha. We enforce complete transactional transparency, guaranteeing that all client installments flow directly into bank Escrow accounts release-bound directly with construction benchmarks certified by Land Departments.
                    </p>

                    {/* Simple Credibility Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-5 mt-2">
                      <div>
                        <span className="text-white font-sans font-bold text-2xl tracking-tight">100+</span>
                        <span className="text-[#e0d7c6]/60 text-[10px] font-mono tracking-widest block uppercase mt-0.5">Launches Monitored</span>
                      </div>
                      <div>
                        <span className="text-white font-sans font-bold text-2xl tracking-tight">AED 1.5B+</span>
                        <span className="text-[#e0d7c6]/60 text-[10px] font-mono tracking-widest block uppercase mt-0.5">Capital Administered</span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {activeTab === 'contact' && (
              <div id="contact-us-view" className="py-16 px-6 sm:px-8 max-w-5xl mx-auto animate-fade-in text-xs font-sans">
                
                <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
                  <span className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">DIRECT CONDUIT</span>
                  <h1 className="text-white text-3xl font-sans font-light tracking-tight uppercase">Contact Our Advisory Desk</h1>
                  <div className="w-12 h-[1px] bg-[#e0d7c6]/60 mx-auto mt-2"></div>
                  <p className="text-white/50 leading-relaxed text-xs">Secure premium layout coordinates, detailed yield brochures, and advance launching lists. Reach out directly to initiate premium presentation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
                  
                  {/* Left Column: Coordinates mapped with text details (col-span-4) */}
                  <div className="md:col-span-4 flex flex-col gap-8 text-white/70">
                    
                    <div className="flex flex-col gap-2">
                       <span className="text-[10px] font-mono text-[#e0d7c6]/60 tracking-widest uppercase">MAIN OUTPOST</span>
                      <h4 className="text-white font-bold text-sm tracking-wide uppercase font-sans">Business Bay, Dubai</h4>
                      <p className="text-white/60 leading-normal text-xs">
                        Jaydeep Barai Real Estate Advisory
                        <br />
                        The Opus Tower by Zaha Hadid, Level 14
                        <br />
                        Al A'amal St, Business Bay, Dubai, UAE
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-[#e0d7c6]/60 tracking-widest uppercase">DIRECT CONTACTS</span>
                      <h4 className="text-white font-bold text-sm tracking-wide uppercase font-sans">Advisor Communications</h4>
                      <div className="space-y-1 text-white/60 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white/40">Email:</span>
                          <a href="mailto:baraijaydeep13@gmail.com" className="hover:text-white text-[#e0d7c6] underline transition-colors">baraijaydeep13@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white/40">Phone:</span>
                          <a href="tel:+971586936812" className="hover:text-white text-[#e0d7c6] underline transition-colors">+971 58 693 6812</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white/40">LinkedIn:</span>
                          <a href="https://www.linkedin.com/in/jaydeepbarai/" target="_blank" rel="noopener noreferrer" className="hover:text-white text-[#e0d7c6] underline transition-colors">linkedin.com/in/jaydeepbarai</a>
                        </div>
                      </div>
                    </div>

                    {/* Quick credentials note */}
                    <div className="bg-[#141414] border border-white/5 p-4 rounded-sm text-[10px] text-white/40 leading-relaxed">
                      Our partners handle global consults across European (CET), American (EST), and Gulf (GST) zones securely via Zoom, Teams, or private physical briefings.
                    </div>

                  </div>

                  {/* Right Column: Inquiry Validation Form (col-span-8) */}
                  <div className="md:col-span-8 border border-white/5 bg-[#141414] rounded-sm shadow-sm">
                    <InquiryForm onSuccessSubmit={() => console.log('Direct contact message captured successfully.')} />
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Floating global WhatsApp advisory badge */}
      <WhatsAppButton />

      {/* Slide drawer AI Advisory chat desk panel */}
      <AdvisoryDesk 
        isOpen={advisoryDeskOpen} 
        onClose={() => setAdvisoryDeskOpen(false)} 
        selectedProjectName={deskProjectInterest} 
      />

      {/* Regulatory Footer block */}
      <Footer onTabChange={handleTabChange} />

    </div>
  );
}
