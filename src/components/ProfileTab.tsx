import React, { useState, useRef } from "react";
import { cvData } from "../data";
import { Mail, Phone, MapPin, Linkedin, GraduationCap, Code, Database, Globe, Brain, TrendingUp, BarChart3, CheckCircle, Camera, Upload, Trash2, ShieldCheck, Users } from "lucide-react";
import { motion } from "motion/react";

export default function ProfileTab() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Dynamic Photo State with localStorage persistence
  const [profilePic, setProfilePic] = useState<string | null>(() => {
    return localStorage.getItem("local_profile_pic");
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image must be smaller than 2MB for storage performance.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem("local_profile_pic", base64String);
        setProfilePic(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    localStorage.removeItem("local_profile_pic");
    setProfilePic(null);
  };

  // Custom data categories for the SVG interactive stats chart
  const competencyData = [
    { name: "Qualitative Fieldwork & FGDs", score: 95, color: "from-[#3b82f6] to-blue-500", desc: "Expert in deep interviewing, participant observations, and rapport building in remote ecologies." },
    { name: "Academic Coding & ATLAS.ti", score: 90, color: "from-blue-500 to-emerald-500", desc: "Advanced thematic qualitative analysis, systematic node coding, and literature cataloging." },
    { name: "Data Visualisation & Power BI", score: 85, color: "from-emerald-500 to-cyan-500", desc: "Fitted with professional Microsoft and Analytics Vidhya training to design enterprise-grade report dashboards." },
    { name: "CRM & Project Management", score: 80, color: "from-cyan-500 to-[#3b82f6]", desc: "Process automation, lead pipeline tracking, and workstream visual mapping in Monday/HubSpot." },
    { name: "AI Productivity & Prompting", score: 92, color: "from-[#1e40af] to-purple-500", desc: "Google & Gemini Certified Professional designing Copilot and LLM strategies for education and research workflows." },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Box & Quick Contact */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200/60 p-8 sm:p-12 shadow-[0_12px_45px_rgb(0,0,0,0.02)]"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3b82f6]/3 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1e40af]/3 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">
          
          {/* Professional Avatar / Photograph Block */}
          <div className="relative shrink-0 mx-auto lg:mx-0 text-center space-y-3.5">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-[2rem] bg-linear-to-tr from-[#3b82f6] via-blue-600 to-[#1e40af] p-1 relative overflow-hidden group shadow-[0_15px_35px_rgba(59,130,246,0.15)] transition-all duration-500 hover:scale-[1.02]">
              {profilePic ? (
                <img 
                  src={profilePic}
                  alt="Mohiuddin Ahmad"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[27px]"
                />
              ) : (
                <div className="w-full h-full bg-[#f8fafc] rounded-[27px] flex flex-col items-center justify-center p-3 text-center border border-white/40 relative">
                  {/* High Quality Fallback Vector Illustration representing Mohiuddin */}
                  <svg viewBox="0 0 100 100" className="w-[110px] h-[110px] text-slate-400">
                    <circle cx="50" cy="50" r="48" fill="#f1f5f9" />
                    <path d="M28,45 C28,25 72,25 72,45 C72,50 28,50 28,45 Z" fill="#1e293b" />
                    <circle cx="50" cy="46" r="18" fill="#e0ac69" />
                    <path d="M35,78 L65,78 L60,61 L40,61 Z" fill="#ffffff" />
                    <path d="M48,64 L52,64 L53,78 L47,78 Z" fill="#1e40af" />
                    <path d="M36,65 L43,78 L35,78 Z" fill="#1e293b" />
                    <path d="M64,65 L57,78 L65,78 Z" fill="#1e293b" />
                    <path d="M32,41 Q40,30 54,32 Q65,28 68,39 Q55,27 41,37 Z" fill="#0f172a" />
                    <rect x="39" y="42" width="9" height="6" rx="2" fill="none" stroke="#000000" strokeWidth="0.8" />
                    <rect x="52" y="42" width="9" height="6" rx="2" fill="none" stroke="#000000" strokeWidth="0.8" />
                    <line x1="48" y1="45" x2="52" y2="45" stroke="#000000" strokeWidth="0.8" />
                    <line x1="36" y1="44" x2="39" y2="44" stroke="#000000" strokeWidth="0.8" />
                    <line x1="61" y1="44" x2="64" y2="44" stroke="#000000" strokeWidth="0.8" />
                  </svg>
                  
                  <span className="font-serif italic font-extrabold text-lg text-[#0f172a] block -mt-1">G.M.</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#3b82f6] font-extrabold block">
                    Researcher & Analyst
                  </span>
                </div>
              )}

              {/* Upload Overlay Action on Hover */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center text-white cursor-pointer rounded-[27px] space-y-1"
              >
                <Camera className="w-5 h-5 text-teal-300" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider">Change Photo</span>
              </div>
            </div>

            {/* Hidden Input field */}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            <div className="flex items-center justify-center space-x-2.5">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#64748b] hover:text-[#3b82f6] transition flex items-center space-x-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
              {profilePic && (
                <>
                  <span className="text-gray-300 text-xs">|</span>
                  <button 
                    onClick={handleRemovePhoto}
                    className="text-[10px] font-sans font-bold uppercase tracking-widest text-rose-500 hover:underline transition flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Intro Information */}
          <div className="flex-1 space-y-5">
            <div className="space-y-1.5 text-center lg:text-left">
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#0f172a] tracking-tight leading-tight">
                {cvData.fullName}
              </h2>
            </div>

            <p className="text-[#334155] text-sm sm:text-base leading-relaxed text-justify max-w-4xl font-sans font-normal">
              {cvData.profileSummary}
            </p>

            {/* Quick Contacts Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
              <a 
                href={`mailto:${cvData.email}`}
                className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200/50 shadow-2xs hover:border-[#3b82f6]/35 hover:bg-white transition duration-200"
              >
                <div className="p-2 rounded-xl bg-blue-50 text-[#3b82f6]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">Email Me</span>
                  <span className="text-xs font-sans font-bold text-slate-800 truncate block">{cvData.email}</span>
                </div>
              </a>

              <a 
                href={`tel:${cvData.phone}`}
                className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200/50 shadow-2xs hover:border-[#3b82f6]/35 hover:bg-white transition duration-200"
              >
                <div className="p-2 rounded-xl bg-blue-50 text-[#3b82f6]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">Call Phone</span>
                  <span className="text-xs font-sans font-bold text-slate-800 block">{cvData.phone}</span>
                </div>
              </a>

              <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200/50 shadow-2xs">
                <div className="p-2 rounded-xl bg-blue-50 text-[#3b82f6]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">Location</span>
                  <span className="text-xs font-sans font-bold text-slate-800 block">{cvData.location}</span>
                </div>
              </div>

              <a 
                href={cvData.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200/50 shadow-2xs hover:border-[#3b82f6]/35 hover:bg-white transition duration-200"
              >
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">LinkedIn Profile</span>
                  <span className="text-xs font-sans font-bold text-slate-800 block">@anthrowebs-m..</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two-Column Core Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Core Competencies Analysis - 7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Core Competencies Box */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200/60 shadow-[0_12px_45px_rgb(0,0,0,0.015)] space-y-4">
            <h3 className="font-sans font-black text-lg text-brand-dark tracking-tight flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-[#3b82f6]" />
              <span>Core Competencies</span>
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {cvData.coreCompetencies.map((comp, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-sans font-medium text-slate-705 bg-linear-to-b from-slate-50 to-slate-100/70 border border-slate-200/50 shadow-3xs hover:border-[#3b82f6]/35 hover:bg-slate-50 transition cursor-default"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Academic Qualifications & Technical Skills - 5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Academic Qualifications Timeline Card */}
          <div className="bg-[#0f172a] text-slate-100 rounded-[2rem] p-6 sm:p-8 border border-slate-800/80 shadow-[0_15px_35px_rgba(15,23,42,0.12)] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-white/10 text-emerald-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-lg tracking-tight">Academic Credentials</h3>
            </div>

            <div className="space-y-6 relative border-l border-white/10 pl-4 ml-2">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="relative space-y-1">
                  {/* Timeline bullet */}
                  <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#3b82f6] border-2 border-[#0f172a] ring-4 ring-blue-500/10"></span>
                  
                  <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-md">
                    {edu.year}
                  </span>
                  
                  <h4 className="font-sans font-bold text-sm text-white pt-1">
                    {edu.qualification}
                  </h4>
                  
                  <p className="text-xs text-slate-350 font-sans leading-tight">
                    {edu.institution}
                  </p>
                  
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-400">
                    <span>{edu.boardOrUniversity}</span>
                    <span className="font-sans italic text-emerald-400">Result: {edu.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Catalog Cards */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200/60 shadow-[0_12px_45px_rgb(0,0,0,0.015)] space-y-6">
            <h3 className="font-sans font-black text-xl text-[#0f172a] tracking-tight flex items-center space-x-2">
              <Code className="w-5 h-5 text-[#3b82f6]" />
              <span>Technical Skills Matrix</span>
            </h3>

            <div className="space-y-5">
              {cvData.technicalSkills.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400 flex items-center space-x-1.5">
                    {cat.category === "AI & Emerging Tech" && <Brain className="w-3 h-3 text-purple-500" />}
                    {cat.category === "Research & Data Analysis" && <Database className="w-3 h-3 text-brand-teal" />}
                    {cat.category === "Design & Web" && <Globe className="w-3 h-3 text-blue-500" />}
                    <span>{cat.category}</span>
                  </h4>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => {
                      const isGemini = skill.includes("Gemini") || skill.includes("Power BI");
                      return (
                        <span 
                          key={sIdx}
                          className={`px-3 py-1 rounded-xl text-xs font-sans font-medium transition ${
                            isGemini 
                              ? "bg-blue-50 text-[#3b82f6] border border-blue-100" 
                              : "bg-slate-50 text-slate-650 hover:bg-slate-100 border border-slate-200/40"
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Skills Analytics */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200/60 shadow-[0_12px_45px_rgb(0,0,0,0.015)] space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <h3 className="font-sans font-black text-xl text-[#0f172a] tracking-tight flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-[#3b82f6]" />
                  <span>Skills Strength & Domain Insights</span>
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Interactive indicator representing Munna&#39;s practical field research, analytics modeling, and AI competency levels. Click any gauge to expand contextual insights.
                </p>
              </div>
            </div>

            {/* Custom SVG Gauges & Progress list */}
            <div className="space-y-4">
              {competencyData.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedCategory(selectedCategory === item.name ? null : item.name)}
                  className={`p-4.5 rounded-2xl border text-left transition duration-200 cursor-pointer ${
                    selectedCategory === item.name 
                      ? "bg-blue-50/45 border-[#3b82f6]/20 shadow-xs" 
                      : "bg-slate-50/40 border-slate-200/50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-sm font-sans font-bold text-slate-800">{item.name}</span>
                    <span className="text-xs font-mono font-bold text-[#3b82f6] bg-white border border-blue-100 px-2.5 py-0.5 rounded-full shadow-3xs">
                      {item.score}%
                    </span>
                  </div>
                  
                  {/* Custom progress HTML bar */}
                  <div className="w-full h-2 bg-slate-100/80 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                    />
                  </div>

                  {/* Expandable text description */}
                  {selectedCategory === item.name && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs text-slate-600 mt-3 leading-relaxed font-sans pt-2.5 border-t border-slate-200/30"
                    >
                      {item.desc}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center space-x-3.5">
              <div className="h-2 w-2 rounded-full bg-[#3b82f6] animate-ping shrink-0"></div>
              <span className="text-xs text-slate-605 font-sans leading-relaxed">
                <strong>Data Synergy:</strong> G.H.M. merges qualitative field anthropologists&#39; methodologies with strict quantitative data modeling workflows.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

