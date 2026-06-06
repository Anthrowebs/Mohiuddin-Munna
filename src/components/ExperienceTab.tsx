import React, { useState } from "react";
import { cvData } from "../data";
import { Briefcase, MapPin, Calendar, BookOpen, Quote, Shield, Award, Sparkles, Filter, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function ExperienceTab() {
  const [filterType, setFilterType] = useState<"all" | "research" | "presentation">("all");

  // Map custom tags to each experience to show methodology depth
  const experienceTags: Record<string, string[]> = {
    "Conceptualizing “Pedagogical Competence”": ["Qualitative Studies", "FGDs", "In-depth Interviews", "Manuscript Drafting", "Ethical Practice"],
    "The Interpretation of the Itna-Mithamoin-Austogram Highway": ["Climate Security", "Ecology Studies", "Field Fieldwork", "Thematic Analysis", "Field Reports"],
    "A Qualitative Exploration of the Perception": ["Healthcare Outreach", "Semi-structured Interviews", "Informed Consent", "Qualitative Coding"],
    "Disabled Lives, Disabled Rights": ["Multisite Fieldwork", "Disable Rights Studies", "Large Dataset Coding", "Transcriptions", "Literature Review"],
    "End-line Study of Gender Transformative": ["NGO End-line", "Microfinance Studies", "Primary Transcriptions"]
  };

  const getTagsForProject = (project: string) => {
    for (const key of Object.keys(experienceTags)) {
      if (project.includes(key)) {
        return experienceTags[key];
      }
    }
    return ["Anthropology", "Qualitative Analysis"];
  };

  return (
    <div className="space-y-12">
      
      {/* Tab Filter Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/50">
        <div>
          <h2 className="font-sans font-black text-2xl text-[#0f172a] tracking-tight">
            Research & Academic Achievements
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Detailed chronological record of field research, qualitative analysis, and publications.
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-100/65 p-1 rounded-xl shrink-0 border border-slate-200/50">
          <button 
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-extrabold transition-all duration-200 ${
              filterType === "all" 
                ? "bg-white text-slate-800 shadow-xs border border-slate-200/10" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Show All
          </button>
          <button 
            onClick={() => setFilterType("research")}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-extrabold transition-all duration-200 ${
              filterType === "research" 
                ? "bg-white text-slate-800 shadow-xs border border-slate-200/10" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Research Roles
          </button>
          <button 
            onClick={() => setFilterType("presentation")}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-extrabold transition-all duration-200 ${
              filterType === "presentation" 
                ? "bg-white text-slate-800 shadow-xs border border-slate-200/10" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Conferences
          </button>
        </div>
      </div>

      {/* Grid containing timeline blocks */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Main Feed Column (8 cols in broad screens) */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* RESEARCH ASSISTANT TIMELINE */}
          {(filterType === "all" || filterType === "research") && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-[#3b82f6]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-black text-lg text-brand-dark">Research Affiliations</h3>
              </div>
              
              <div className="space-y-6 pl-4 border-l border-slate-200 ml-4">
                {cvData.researchExperience.map((exp, idx) => {
                  const tags = getTagsForProject(exp.project);
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="group relative bg-white border border-slate-200/60 hover:border-slate-300/80 shadow-[0_12px_45px_rgb(0,0,0,0.012)] hover:shadow-[0_15px_45px_rgba(59,130,246,0.04)] p-6 sm:p-7 rounded-[2rem] transition-all duration-300"
                    >
                      {/* Timeline Dot */}
                      <span className="absolute -left-[24.5px] top-[26px] h-3 w-3 rounded-full bg-white border-[3px] border-[#3b82f6] group-hover:bg-[#3b82f6] transition-colors"></span>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div className="space-y-0.5">
                          <h4 className="font-sans font-extrabold text-slate-800 group-hover:text-[#3b82f6] transition duration-150">
                            {exp.role}
                          </h4>
                          <p className="text-xs text-[#3b82f6] font-sans font-bold">
                            {exp.institution}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-500 font-mono text-[9px] bg-slate-50 border border-slate-250/50 px-2.5 py-1 rounded-lg self-start sm:self-center font-bold">
                          <Calendar className="w-3" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Project title block */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-205/50 mb-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#3b82f6]/3 rounded-full blur-xl pointer-events-none"></div>
                        <span className="block text-[9px] font-mono uppercase tracking-widest text-[#3b82f6] font-black mb-1">
                          Research Project Scope
                        </span>
                        <p className="text-xs font-serif italic text-slate-700 leading-relaxed font-semibold">
                          {exp.project}
                        </p>
                      </div>

                      {/* Role Breakdown Bullets */}
                      <ul className="space-y-2 mb-4 text-xs font-sans text-slate-600">
                        {exp.details.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start space-x-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0"></span>
                            <span className="leading-relaxed text-justify">{b}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Methodology Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                        {tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="px-2.5 py-0.5 rounded-lg text-[9px] font-mono text-slate-500 bg-slate-50 border border-slate-200/50 hover:bg-slate-100 transition cursor-default"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* INTERNATIONAL CONFERENCES */}
          {(filterType === "all" || filterType === "presentation") && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-[#3b82f6]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-black text-lg text-brand-dark">Conferences & Speaking</h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {cvData.presentations.map((p, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border border-slate-200/60 hover:border-slate-300/80 hover:shadow-[0_15px_45px_rgba(0,0,0,0.02)] p-6 rounded-[2rem] relative overflow-hidden transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/3 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="flex justify-between items-start flex-col sm:flex-row gap-2 mb-4">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#3b82f6] bg-blue-500/10 px-2.5 py-1 rounded-full font-black">
                          {p.location.includes("Nepal") ? "Nepal Presenter" : "Presenting Author"}
                        </span>
                        <h4 className="font-sans font-extrabold text-base text-brand-dark mt-2.5 leading-snug">
                          {p.conference}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500 font-sans">
                          <span className="flex items-center space-x-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{p.location}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{p.date}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Paper Title Box */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/40 border-l-[3.5px] border-l-[#3b82f6] mb-4 shadow-3xs">
                      <Quote className="w-5 h-5 text-[#3b82f6]/40 mb-1" />
                      <p className="font-sans text-sm font-extrabold text-slate-800 leading-relaxed block">
                        &ldquo;{p.title}&rdquo;
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs font-sans text-slate-600">
                      {p.details.map((det, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2">
                          <ChevronRight className="w-4 h-4 text-[#3b82f6]/60 mt-0.5 shrink-0" />
                          <span className="leading-relaxed text-justify">{det}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Spotlight Details (4 cols in broad screens) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Methodology Spotlight Panel */}
          <div className="bg-[#0f172a] text-slate-100 rounded-[2rem] p-6 sm:p-8 border border-slate-850 shadow-[0_15px_35px_rgba(15,23,42,0.12)] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <Sparkles className="w-8 h-8 text-[#3b82f6]/40 animate-pulse" />
            <div className="space-y-2">
              <h4 className="font-sans font-bold text-lg leading-snug">Field & Research Methodologies</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans text-justify">
                Mohiuddin Munna specializes heavily in conducting challenging field studies and designing contextual analytical queries.
              </p>
            </div>

            <div className="space-y-5 pt-2 border-t border-slate-800/80">
              <div className="flex items-start space-x-3.5">
                <div className="p-1 px-1.5 rounded-md bg-white/10 text-white text-[9px] font-bold mt-0.5 font-mono uppercase tracking-wider">BCCT</div>
                <div>
                  <h5 className="text-xs font-sans font-bold text-[#3b82f6]">Haor Ecologies Climate Project</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans leading-relaxed text-justify">
                    Conducted exhaustive qualitative interviews in remote Haor populations under extreme wetland settings.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-1 px-1.5 rounded-md bg-white/10 text-white text-[9px] font-bold mt-0.5 font-mono uppercase tracking-wider">SRH</div>
                <div>
                  <h5 className="text-xs font-sans font-bold text-[#3b82f6]">Pedagogical Competence Analysis</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans leading-relaxed text-justify">
                    Ethical qualitative focus groups and discursive barriers evaluation for sex-education syllabus models.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-1 px-1.5 rounded-md bg-white/10 text-white text-[9px] font-bold mt-0.5 font-mono uppercase tracking-wider">DLD</div>
                <div>
                  <h5 className="text-xs font-sans font-bold text-[#3b82f6]">Disabled Lives Multisite Study</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans leading-relaxed text-justify">
                    Spearheaded interviews spanning multiple university premises across Bangladesh to map accessibility limitations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Publications Note Box */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200/60 shadow-[0_12px_45px_rgb(0,0,0,0.015)] space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400">
              Manuscript Contributions
            </h4>
            <p className="text-xs text-slate-650 leading-relaxed font-sans text-justify">
              Due to his writing credentials, Munna has drafting experience and co-authorship pipelines on four principal topics, which are in active peer-reviewed reviews for sociological, public health, and environmental policy journals.
            </p>
            <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-xl space-y-2">
              <span className="text-[9px] font-mono uppercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-black tracking-wide">
                Status
              </span>
              <p className="text-[11px] font-sans text-slate-700 italic font-bold leading-relaxed text-justify">
                "Consensual data coding procedures built with ATLAS.ti have successfully reached internal team approvals."
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
