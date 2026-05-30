/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, Shield, Flame, Map, Briefcase, Percent } from 'lucide-react';

export default function CityHighlights() {
  const points = [
    {
      city: 'DUBAI REAL ESTATE MARKET',
      subtitle: 'Global High-Yield Capital',
      icon: <Flame className="w-5 h-5 text-[#e0d7c6]" />,
      metrics: [
        { label: 'Avg Rental RoI Range', value: '7.8% - 9.4% Net' },
        { label: 'Primary Drivers', value: 'Global HNIs, Golden Visa (AED 2M)' },
        { label: 'Aesthetic Focus', value: 'Iconic skylines, branded designs, beach fronts' }
      ],
      strengths: [
        'Zero income tax and zero capital gains on real estate.',
        'Extremely high density of international holiday renters.',
        'Sovereign regulatory model (RERA) with direct trust escrow guarantees.',
        'World-famous luxury branding (Armani, Bulgari, Bugatti launches).'
      ]
    },
    {
      city: 'ABU DHABI REAL ESTATE MARKET',
      subtitle: 'Sovereign Cultural Heritage',
      icon: <Shield className="w-5 h-5 text-[#e0d7c6]" />,
      metrics: [
        { label: 'Avg Rental RoI Range', value: '7.0% - 8.8% Net' },
        { label: 'Primary Drivers', value: 'Mega infra, Aldar projects, cultural tourism' },
        { label: 'Aesthetic Focus', value: 'Eco-responsible, natural mangroves, museum nodes' }
      ],
      strengths: [
        'High-density corporate tenants and federal governmental hubs.',
        'World-class cultural clusters (Louvre, Guggenheim museums).',
        'Prone to long-term community leases and higher occupancy times.',
        'Pristine natural islands (Yas recreation, Saadiyat white beach dunes).'
      ]
    }
  ];

  return (
    <div id="city-comparison-section" className="py-16 bg-[#0a0a0a] px-6 sm:px-12 border-y border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div id="comparison-header" className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-[10px] font-mono text-white/40 tracking-[0.25em] uppercase">MARKET METRICS</span>
          <h2 className="text-white text-2xl sm:text-3xl font-sans font-bold tracking-tight uppercase">
            Dubai vs Abu Dhabi
            <br />
            <span className="italic font-serif normal-case font-normal text-[#e0d7c6] block mt-1">Capital Market Matrix</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#e0d7c6] mx-auto mt-2"></div>
          <p className="text-white/40 text-xs tracking-normal leading-relaxed mt-1">
            Understanding localized regulatory variations and investor yield ratios is essential to maximizing UAE portfolio efficiency. Analyze the structural differences.
          </p>
        </div>

        {/* Visual Columns Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
          {points.map((p, idx) => (
            <div 
              key={idx}
              id={`market-col-${idx}`}
              className="bg-[#141414] border border-white/5 p-8 flex flex-col justify-between group hover:border-[#e0d7c6]/50 transition-all duration-300 rounded-sm"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#e0d7c6] uppercase">{p.city}</span>
                    <span className="text-white/40 text-[10px] font-sans tracking-wide mt-0.5">{p.subtitle}</span>
                  </div>
                  <div className="p-2.5 bg-[#0a0a0a] border border-white/5 group-hover:bg-[#e0d7c6] transition-colors rounded-xs">
                    {p.icon}
                  </div>
                </div>

                {/* Metrics Table */}
                <div className="space-y-2 border-y border-white/5 py-4 mb-6">
                  {p.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex justify-between items-center py-1 font-sans">
                      <span className="text-white/50 tracking-wide">{m.label}:</span>
                      <span className="font-semibold text-white text-right">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Bullets List */}
                <div className="space-y-3.5 mb-8 text-white/70">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-white/40 block uppercase">MARKET STRENGTHS:</span>
                  {p.strengths.map((str, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-[#e0d7c6] rounded-full mt-1.5 flex-shrink-0" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action details link */}
              <div className="border-t border-white/5 pt-5 mt-auto">
                <span className="text-[10px] text-white/40 font-mono tracking-wider uppercase group-hover:text-[#e0d7c6] transition-colors flex items-center gap-1.5">
                  View Targeted Directory <ArrowUpRight className="w-3.5 h-3.5 text-[#e0d7c6]/50 group-hover:text-[#e0d7c6]" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
