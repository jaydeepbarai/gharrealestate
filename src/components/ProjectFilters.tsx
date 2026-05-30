/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, ArrowDownAZ, X } from 'lucide-react';
import { projectDataService } from '../utils/projectDataService';

interface ProjectFiltersProps {
  initialCity?: string;
  onFilterChange: (filters: any) => void;
}

export default function ProjectFilters({ initialCity = 'All', onFilterChange }: ProjectFiltersProps) {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState(initialCity);
  const [developer, setDeveloper] = useState('All');
  const [community, setCommunity] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [handoverYear, setHandoverYear] = useState('All');
  const [bedroom, setBedroom] = useState('All');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest-launch');
  
  const [developers, setDevelopers] = useState<string[]>([]);
  const [communities, setCommunities] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sync with initialCity prop when it shifts (e.g. from header nav click)
  useEffect(() => {
    setCity(initialCity);
    setCommunity('All'); // Reset community when city shifts
  }, [initialCity]);

  // Read auxiliary filter fields from database
  useEffect(() => {
    async function loadAuxData() {
      const devList = await projectDataService.getDevelopers();
      const commList = await projectDataService.getCommunities(city);
      setDevelopers(devList);
      setCommunities(commList);
    }
    loadAuxData();
  }, [city]);

  // Fire filter change upstream
  useEffect(() => {
    let priceMin: number | undefined;
    let priceMax: number | undefined;

    if (priceRange !== 'All') {
      const [minStr, maxStr] = priceRange.split('-');
      if (minStr) priceMin = parseFloat(minStr);
      if (maxStr) priceMax = parseFloat(maxStr);
    }

    onFilterChange({
      search,
      city,
      developer,
      community,
      propertyType,
      priceMin,
      priceMax,
      handoverYear,
      bedroom,
      status,
      sortBy
    });
  }, [search, city, developer, community, propertyType, priceRange, handoverYear, bedroom, status, sortBy]);

  const handleReset = () => {
    setSearch('');
    setCity('All');
    setDeveloper('All');
    setCommunity('All');
    setPropertyType('All');
    setPriceRange('All');
    setHandoverYear('All');
    setBedroom('All');
    setStatus('All');
    setSortBy('newest-launch');
  };

  const propertyTypes = ['All', 'Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Mansion'];
  const bedroomOptions = ['All', 'Studio', '1', '2', '3', '4', '5', '6'];
  const statusOptions = ['All', 'Upcoming', 'Launched', 'Selling', 'Sold Out'];
  const handoverOptions = ['All', '2026', '2027', '2028', '2029'];
  const priceRanges = [
    { label: 'All Budgets', value: 'All' },
    { label: 'Under AED 1.5M', value: '0-1500000' },
    { label: 'AED 1.5M - 3M', value: '1500000-3000000' },
    { label: 'AED 3M - 6M', value: '3000000-6000000' },
    { label: 'AED 6M - 15M', value: '6000000-15000000' },
    { label: 'AED 15M + (Ultra Luxury)', value: '15000000-999000000' }
  ];

  return (
    <div id="filter-wrapper" className="bg-[#141414] border border-white/5 p-6 shadow-xs max-w-7xl mx-auto mb-10 text-white">
      
      {/* Primary search row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input
            id="input-filter-search"
            type="text"
            placeholder="Search projects by developer, name, community, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 focus:border-[#e0d7c6] text-xs font-sans tracking-wide outline-hidden text-white placeholder-white/30 transition-colors"
          />
        </div>

        {/* City Toggle - Minimalist Pill Choice */}
        <div className="flex bg-[#0a0a0a] p-1 border border-white/5">
          {['All', 'Dubai', 'Abu Dhabi'].map((c) => (
            <button
              key={c}
              id={`filter-city-${c.replace(' ', '')}`}
              onClick={() => { setCity(c); setCommunity('All'); }}
              className={`px-4 py-2 text-[10px] uppercase font-sans font-bold tracking-[0.15em] transition-all duration-150 ${
                city === c 
                  ? 'bg-[#e0d7c6] text-[#0a0a0a]' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Controls togglers */}
        <div className="flex gap-2">
          <button
            id="btn-toggle-advanced"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center justify-center gap-2 px-4 py-3 border text-[10px] font-sans font-bold tracking-[0.14em] uppercase transition-all duration-150 ${
              showAdvanced ? 'bg-white/5 border-[#e0d7c6] text-[#e0d7c6]' : 'border-white/10 text-white/50 hover:border-[#e0d7c6] hover:text-[#e0d7c6]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {showAdvanced ? 'Hide Filters' : 'More Filters'}
          </button>

          {(search || city !== 'All' || developer !== 'All' || community !== 'All' || propertyType !== 'All' || priceRange !== 'All' || handoverYear !== 'All' || bedroom !== 'All' || status !== 'All') && (
            <button
              id="btn-reset-filters"
              onClick={handleReset}
              className="flex items-center justify-center gap-1 px-3 py-3 border border-red-500/20 text-red-400 text-[10px] font-sans font-bold tracking-[0.14em] uppercase hover:bg-red-500/10 transition-all duration-150"
              title="Reset Search Fields"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Advanced filters dropdown area */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5 animate-fade-in text-xs font-sans text-white">
          
          {/* Developer */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest">DEVELOPER</label>
            <select
              id="select-filter-developer"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 hover:border-[#e0d7c6] outline-hidden text-xs text-white transition-colors"
            >
              <option value="All" className="bg-[#141414]">All Developers</option>
              {developers.filter(d => d !== 'All').map(dev => (
                <option key={dev} value={dev} className="bg-[#141414]">{dev}</option>
              ))}
            </select>
          </div>

          {/* Community */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest">COMMUNITY</label>
            <select
              id="select-filter-community"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 hover:border-[#e0d7c6] outline-hidden text-xs text-white transition-colors"
            >
              <option value="All" className="bg-[#141414]">All Communities</option>
              {communities.filter(c => c !== 'All').map(comm => (
                <option key={comm} value={comm} className="bg-[#141414]">{comm}</option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest">PROPERTY TYPE</label>
            <select
              id="select-filter-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 hover:border-[#e0d7c6] outline-hidden text-xs text-white transition-colors"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type} className="bg-[#141414]">{type === 'All' ? 'All Formats' : type}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest">PRICE BUDGET</label>
            <select
              id="select-filter-price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 hover:border-[#e0d7c6] outline-hidden text-xs text-white transition-colors"
            >
              {priceRanges.map(pr => (
                <option key={pr.value} value={pr.value} className="bg-[#141414]">{pr.label}</option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest">BEDROOM CONFIG</label>
            <select
              id="select-filter-bedrooms"
              value={bedroom}
              onChange={(e) => setBedroom(e.target.value)}
              className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 hover:border-[#e0d7c6] outline-hidden text-xs text-white transition-colors"
            >
              {bedroomOptions.map(bed => (
                <option key={bed} value={bed} className="bg-[#141414]">{bed === 'All' ? 'All Sizes' : `${bed} Bedrooms`}</option>
              ))}
            </select>
          </div>

          {/* Handover Year */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest">HANDOVER TARGET</label>
            <select
              id="select-filter-handover"
              value={handoverYear}
              onChange={(e) => setHandoverYear(e.target.value)}
              className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 hover:border-[#e0d7c6] outline-hidden text-xs text-white transition-colors"
            >
              {handoverOptions.map(yr => (
                <option key={yr} value={yr} className="bg-[#141414]">{yr === 'All' ? 'All Handover Years' : `Handover Year ${yr}`}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest">PROJECT STATUS</label>
            <select
              id="select-filter-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 hover:border-[#e0d7c6] outline-hidden text-xs text-white transition-colors"
            >
              {statusOptions.map(st => (
                <option key={st} value={st} className="bg-[#141414]">{st === 'All' ? 'All Status' : st}</option>
              ))}
            </select>
          </div>

          {/* Sorting Option */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest">SORT ORDER</label>
            <select
              id="select-filter-sorting"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2.5 bg-[#0a0a0a] border border-white/10 hover:border-[#e0d7c6] outline-hidden text-xs text-white transition-colors font-semibold"
            >
              <option value="newest-launch" className="bg-[#141414]">Newest Launches First</option>
              <option value="price-asc" className="bg-[#141414]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#141414]">Price: High to Low</option>
              <option value="handover-soonest" className="bg-[#141414]">Handover: Soonest First</option>
            </select>
          </div>

        </div>
      )}

      {/* active search badges snippet below search block */}
      {showAdvanced && (search || city !== 'All' || developer !== 'All' || community !== 'All' || propertyType !== 'All' || priceRange !== 'All' || handoverYear !== 'All' || bedroom !== 'All' || status !== 'All') && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/5 pt-3.5">
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">ACTIVE FILTERS:</span>
          {city !== 'All' && (
            <span className="text-[9px] bg-[#0a0a0a] border border-white/10 text-[#e0d7c6] px-2 py-0.5 font-mono uppercase rounded-xs">City: {city}</span>
          )}
          {developer !== 'All' && (
            <span className="text-[9px] bg-[#0a0a0a] border border-white/10 text-[#e0d7c6] px-2 py-0.5 font-mono uppercase rounded-xs">Developer: {developer}</span>
          )}
          {community !== 'All' && (
            <span className="text-[9px] bg-[#0a0a0a] border border-white/10 text-[#e0d7c6] px-2 py-0.5 font-mono uppercase rounded-xs">Community: {community}</span>
          )}
          {propertyType !== 'All' && (
            <span className="text-[9px] bg-[#0a0a0a] border border-white/10 text-[#e0d7c6] px-2 py-0.5 font-mono uppercase rounded-xs">Type: {propertyType}</span>
          )}
          {bedroom !== 'All' && (
            <span className="text-[9px] bg-[#0a0a0a] border border-white/10 text-[#e0d7c6] px-2 py-0.5 font-mono uppercase rounded-xs">Beds: {bedroom}</span>
          )}
          {handoverYear !== 'All' && (
            <span className="text-[9px] bg-[#0a0a0a] border border-white/10 text-[#e0d7c6] px-2 py-0.5 font-mono uppercase rounded-xs">Handover: {handoverYear}</span>
          )}
          {status !== 'All' && (
            <span className="text-[9px] bg-[#0a0a0a] border border-white/10 text-[#e0d7c6] px-2 py-0.5 font-mono uppercase rounded-xs">Status: {status}</span>
          )}
          {search && (
            <span className="text-[9px] bg-[#0a0a0a] border border-white/10 text-[#e0d7c6] px-2 py-0.5 font-mono uppercase rounded-xs">Keyword: "{search}"</span>
          )}
        </div>
      )}
    </div>
  );
}
