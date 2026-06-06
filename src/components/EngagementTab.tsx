import React from "react";
import { cvData } from "../data";
import { Shield, Sparkles, Award, Globe, Users, TrendingUp, CheckCircle, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function EngagementTab() {
  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Tab Header */}
      <div>
        <h2 className="font-sans font-black text-2xl text-[#0f172a] tracking-tight">
          Leadership & Professional Engagement
        </h2>
        <p className="text-xs text-slate-500 font-sans mt-0.5">
          Global leadership training cohorts, simulations, and memberships in human rights & policy platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Job simulations & Programs - 7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="p-2 rounded-xl bg-blue-55 text-[#3b82f6]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-black text-lg text-[#0f172a] tracking-tight">Simulations & Youth Programs</h3>
          </div>

          <div className="space-y-5">
            {cvData.leadership.map((lead, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200/60 p-6 sm:p-7 rounded-[2rem] group hover:shadow-[0_15px_45px_rgba(0,0,0,0.012)] hover:border-slate-300 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-3.5">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono tracking-wider uppercase bg-blue-50 text-[#3b82f6] font-bold px-2.5 py-0.5 rounded-lg">
                      {lead.period}
                    </span>
                    <h4 className="font-sans font-black text-base text-slate-800 leading-snug group-hover:text-[#3b82f6] transition duration-200">
                      {lead.title}
                    </h4>
                    <p className="text-xs font-sans text-slate-500 font-semibold italic">
                      {lead.organization}
                    </p>
                  </div>
                </div>

                {/* Simulation Items Bullets */}
                <ul className="space-y-2.5 text-xs font-sans text-slate-655 pl-0.5">
                  {lead.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-justify text-slate-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column (Memberships & SDG Spotlight - 5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Memberships & Affiliations box */}
          <div className="bg-[#0f172a] text-slate-100 rounded-[2rem] p-6 sm:p-8 space-y-6 border border-slate-800 shadow-[0_15px_35px_rgba(15,23,42,0.12)]">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-white/10 text-[#3b82f6]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-black text-lg tracking-tight">Memberships & Affiliations</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Actively affiliated with several international cooperatives, research agencies, and advocacy councils:
            </p>

            <div className="space-y-3 pt-1">
              {cvData.affiliations.map((aff, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-sans font-bold text-xs text-slate-200">
                      {aff.organization}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {aff.role}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {aff.period.replace("May 2026", "2026")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SDG Themes Spotlight */}
          <div className="bg-linear-to-b from-slate-50 to-white p-6 sm:p-8 rounded-[2rem] border border-slate-200/50 space-y-5 shadow-3xs">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-blue-50 text-[#3b82f6]">
                <Globe className="w-4 h-4 animate-spin-slow" />
              </div>
              <h4 className="font-sans font-black text-xs text-slate-800 uppercase tracking-widest">
                SDG Aligned Outcomes
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans text-justify">
              Through the <strong>UNESCO Hackathon</strong>, <strong>International Youth Day &#39;Generation SDG&#39;</strong> assembly, and cultural heritage ecologies research, Mohiuddin aligns his professional deliverables under international frameworks:
            </p>

            <div className="space-y-3.5 pt-1 text-xs text-gray-700">
              <div className="flex items-start space-x-3 font-sans">
                <div className="h-5 w-5 rounded bg-amber-500 text-white flex items-center justify-center font-bold font-mono shrink-0 text-[10px]">5</div>
                <div>
                  <strong className="text-[11px] font-sans font-bold text-slate-800">Gender Equality</strong>
                  <p className="text-[10px] text-slate-500 leading-tight">Sexual reproductive health curricular barriers & transformation microfinance outcomes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 font-sans">
                <div className="h-5 w-5 rounded bg-emerald-600 text-white flex items-center justify-center font-bold font-mono shrink-0 text-[10px]">13</div>
                <div>
                  <strong className="text-[11px] font-sans font-bold text-slate-800">Climate Action</strong>
                  <p className="text-[10px] text-slate-500 leading-tight">Wetland ecologies vulnerability studies under the BCCT (Climate Change Trust) project.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 font-sans">
                <div className="h-5 w-5 rounded bg-blue-600 text-white flex items-center justify-center font-bold font-mono shrink-0 text-[10px]">16</div>
                <div>
                  <strong className="text-[11px] font-sans font-bold text-slate-800">Peace, Justice & Institutions</strong>
                  <p className="text-[10px] text-slate-500 leading-tight">Active student agency modeling and academic literature for civic changes.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
