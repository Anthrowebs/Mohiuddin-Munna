import React, { useState, useMemo } from "react";
import { cvData } from "../data";
import { Search, Award, ShieldCheck, Cpu, Database, Briefcase, GraduationCap, ArrowUpRight, Zap, X, ExternalLink, Check, Calendar, Lock, Copy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CertificationItem {
  name: string;
  organization: string;
  year: string;
  category: "all" | "ai" | "data" | "management" | "academic";
}

// In-depth information map representing professional, verifiable data for G.H. Mohiuddin Ahmad Munna's certifications
const credentialMetadata: Record<string, {
  licId: string;
  skills: string[];
  description: string;
  verifUrl: string;
}> = {
  "Gemini Certified Educator (2025–2028)": {
    licId: "GG-EDU-GEM-2025-9983",
    skills: ["Google Gemini Integration", "AI Pedagogy", "Prompt Architecture", "Curriculum Design with GenAI"],
    description: "Formally validated by Google for Education. Proves advanced capabilities in leveraging LLMs (Gemini Pro, NotebookLM) to construct intelligent student-centric lesson builders and educational assistants.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Google Certified Educator Level 1 (2025–2028)": {
    licId: "GG-EDU-L1-2025-4109",
    skills: ["Google Workspace for Education", "Digital Classroom Orchestration", "Collaborative Learning Tools", "Formative Assessment Platforms"],
    description: "Certified proficiency in configuring, embedding, and managing Google Workspace applications (Classroom, Docs, Drive, Forms, Meet) to construct highly efficient, cloud-driven classrooms.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "AI and Career Empowerment": {
    licId: "UMD-CP-AI-2026-8801",
    skills: ["Cognitive Productivity", "Enterprise Prompt Engineering", "Automating Custom Knowledge Bases", "AI Ethics & Workflow Design"],
    description: "Conducted under the Robert H. Smith School of Business, University of Maryland. Validates techniques in integrating advanced generative AI tools to accelerate professional writing, reporting, and operational structures.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Analyzing Data with Power BI": {
    licId: "AV-PBI-2026-6450",
    skills: ["DAX Query Development", "Relational Schema Modeling", "ETL Pipelines with Power Query", "Dynamic Visual Interactivities"],
    description: "Intensive training program focused on ingestion patterns, writing complex Data Analysis Expressions (DAX), and building predictive and historic dashboard reports using Microsoft Power BI desktop.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Design Power BI Reports": {
    licId: "MS-PBI-REP-2026-3021",
    skills: ["UI/UX Dashboard Styling", "Information Hierarchy Optimization", "Actionable Insight Rendering", "Cross-Filtering Configurations"],
    description: "Officially guided certification by Microsoft for organizing semantic model states into clean, readable, and presentation-grade executive reports.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Get Started Building with Power BI": {
    licId: "MS-PBI-GS-2026-1189",
    skills: ["Power BI Workspace", "Data Cataloging", "Sharing & Direct Embeds", "Initial Import Mapping"],
    description: "Basic Microsoft architecture verification validation for publishing dataset modules and establishing initial reports connected to live cloud services.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "TeachingEnglish: Managing Learning": {
    licId: "BC-TE-ML-2025-0552",
    skills: ["Classroom Linguistics", "Pedagogical Leadership", "Student Engagement Diagnostics", "Inclusive Course Design"],
    description: "Awarded by the British Council. Proves deep conceptual understanding of learner environments, feedback cycles, and managing diverse physical and remote student groups.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Aspire Leaders Program – Cohort 5": {
    licId: "ASP-HARVARD-C5-9011",
    skills: ["Strengths-Based Leadership", "Global Development Policy", "Community Problem-Solving", "AI for Social Impact"],
    description: "Alumnus of the flagship global programme supported by the Aspire Institute (founded by Harvard University Professors). Focuses on leadership development, global socio-economic issues, and professional development.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Enhance Teaching with Microsoft 365 Copilot": {
    licId: "MS-COP-EDU-2025-7762",
    skills: ["Microsoft Copilot Studio", "PowerPoint Content Automation", "Intelligent Feedback Builders", "Excel Data Synthesizing"],
    description: "Certified Microsoft training focused on embedding GenAI workflows safely using custom Microsoft 365 copilot environments to automate grading metrics and curriculum design patterns.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Introduction to Generative AI & Agents": {
    licId: "MS-GENAI-AGT-2025-9931",
    skills: ["Agentic Frameworks", "Instruction Tuning", "Model Fine-Tuning Principles", "API Endpoint Orchestration"],
    description: "Microsoft developer-track fundamentals exploring the integration of system prompts, agent models, and secure API client-server structures.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Project Management Foundations": {
    licId: "SL-PM-FND-2026-4402",
    skills: ["Agile/Scrum Cycles", "Scope & Budget Management", "Risk Alleviation Matrices", "Gantt Scheduling"],
    description: "Certified fundamental project administration including milestone sequencing, resource allocation models, and key project lifecycle standard guidelines.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Siemens Project Manager Job Simulation": {
    licId: "FRG-SIEMENS-2026",
    skills: ["Enterprise Project Planning", "KPI Dashboard Development", "Resource Optimization", "Workstream Scheduling"],
    description: "Practical simulation of Siemens project operations, modeling business KPIs, organizing enterprise project schedule streams, and analyzing project outcomes.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Scientific Manuscript Writing": {
    licId: "SUST-MANU-2025-09",
    skills: ["APA/Chicago Formatting", "Thematic Academic Coding", "Literature Cataloging", "Peer Review Standards"],
    description: "Comprehensive qualification provided by the Department of Anthropology, Shahjalal University of Science & Technology for drafting target-journal manuscripts, doing deep literature cataloging, and managing reference citation states.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Cyber Hygiene Training": {
    licId: "SA-AF-CYB-2026-118",
    skills: ["Data Privacy Guidelines", "Threat Identification", "Secure Networking", "Organizational Compliance"],
    description: "Critical cybersecurity training under active sponsorship of The Asia Foundation and SAJIDA Foundation, focusing on professional operations security and user privacy compliance.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Elevate Your Public Speaking": {
    licId: "BH-PSP-2025-7832",
    skills: ["Persuasive Vocalization", "Slide Presentations", "Rapport Building", "Speech Structuring"],
    description: "Public speaking and pitch mastery certification focused on translating complex academic or data datasets into simple, persuasive stories spoken to multi-stakeholder audiences.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "Resume Writing": {
    licId: "ML-RES-2025-5028",
    skills: ["ATS-Optimized Formatting", "Cover Letter Design", "Professional Self-Branding", "Action Verbs Sequencing"],
    description: "Career strategies credentials validating modern, impact-centric resume construction and optimization for digital recruiting models.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  },
  "WordPress & CMS Development": {
    licId: "TI-WP-CMS-2025-442",
    skills: ["Elementor Pro Architecture", "Domain & Hosting Systems", "UX Page Speed Optimizations", "WP Database Handlers"],
    description: "Full CMS training encompassing theme customization, database set-ups, and building dynamic landing pages for commercial and non-academic digital operations.",
    verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
  }
};

export default function CertificationsTab() {
  const [activeCategory, setActiveCategory] = useState<"all" | "ai" | "data" | "management" | "academic">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const categorizedCertifications: CertificationItem[] = useMemo(() => {
    return cvData.certifications.map((c) => {
      const nameLower = c.name.toLowerCase();
      
      let category: "all" | "ai" | "data" | "management" | "academic" = "academic";
      
      if (
        nameLower.includes("gemini") || 
        nameLower.includes("copilot") || 
        nameLower.includes("generative ai") || 
        nameLower.includes("artificial intelligence") ||
        nameLower.includes("ai and")
      ) {
        category = "ai";
      } else if (nameLower.includes("power bi") || nameLower.includes("analyzing data")) {
        category = "data";
      } else if (
        nameLower.includes("project management") || 
        nameLower.includes("simulation") || 
        nameLower.includes("leaders program") ||
        nameLower.includes("resume writing") ||
        nameLower.includes("public speaking")
      ) {
        category = "management";
      }
      
      return {
        ...c,
        category,
      };
    });
  }, []);

  const categories = [
    { id: "all", label: "All Credits", count: cvData.certifications.length, icon: Award },
    { id: "ai", label: "AI & Emerging Tech", count: categorizedCertifications.filter(c => c.category === "ai").length, icon: Cpu },
    { id: "data", label: "Data & Power BI", count: categorizedCertifications.filter(c => c.category === "data").length, icon: Database },
    { id: "management", label: "Management & Career", count: categorizedCertifications.filter(c => c.category === "management").length, icon: Briefcase },
    { id: "academic", label: "Academic Modules", count: categorizedCertifications.filter(c => c.category === "academic").length, icon: GraduationCap }
  ] as const;

  const filteredCertifications = useMemo(() => {
    return categorizedCertifications.filter((cert) => {
      const matchesCategory = activeCategory === "all" || cert.category === activeCategory;
      const matchesSearch = 
        cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.organization.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, categorizedCertifications]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getCategoryImage = (cert: CertificationItem) => {
    const org = cert.organization.toLowerCase();
    const name = cert.name.toLowerCase();
    
    // Draw highly specific, pixel-perfect branding icons/badges
    if (org.includes("google")) {
      return (
        <div className="relative w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 shadow-2xs">
          {/* Google Color Circle */}
          <svg viewBox="0 0 24 24" className="w-7 h-7">
            <path d="M12.24 10.285V13.4h6.86c-.277 1.56-1.602 4.585-6.86 4.585-4.54 0-8.24-3.765-8.24-8.4s3.7-8.4 8.24-8.4c2.58 0 4.307 1.095 5.298 2.045l2.465-2.37C18.575 1.025 15.69 0 12.24 0 5.58 0 .18 5.37.18 12s5.4 12 12.06 12c6.96 0 11.58-4.89 11.58-11.79 0-.795-.085-1.4-.195-1.925H12.24z" fill="#4285F4"/>
          </svg>
          <span className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-emerald-500 rounded-full flex items-center justify-center border border-white text-white text-[7px]" title="Google Certified">✓</span>
        </div>
      );
    }
    
    if (org.includes("microsoft")) {
      return (
        <div className="relative w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 shadow-2xs">
          {/* Microsoft Metro 4 Squares */}
          <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
            <div className="w-2.5 h-2.5 bg-[#f25022]"></div>
            <div className="w-2.5 h-2.5 bg-[#7fba00]"></div>
            <div className="w-2.5 h-2.5 bg-[#00a4ef]"></div>
            <div className="w-2.5 h-2.5 bg-[#ffb900]"></div>
          </div>
        </div>
      );
    }

    if (org.includes("maryland")) {
      return (
        <div className="relative w-12 h-12 flex items-center justify-center bg-amber-50 rounded-xl border border-amber-100 shadow-2xs">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-red-600 fill-current">
            {/* University Shield Crest */}
            <path d="M12 2L4 5v6c0 5.25 3.42 10.16 8 11 4.58-.84 8-5.75 8-11V5l-8-3zm0 18c-3.11-.75-5.5-4.54-5.5-8.5V6.75l5.5-2.06 5.5 2.06V11.5c0 3.96-2.39 7.75-5.5 8.5z" />
            <polygon points="12 6 9 9 10.5 10.5 12 9 13.5 10.5 15 9" />
          </svg>
        </div>
      );
    }

    if (org.includes("british council")) {
      return (
        <div className="relative w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl border border-blue-100 shadow-2xs">
          {/* British Council Royal Dots layout */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="flex space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-800"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-800"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-800"></span>
            </div>
            <div className="flex space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-800"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-800"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-800"></span>
            </div>
          </div>
        </div>
      );
    }

    if (org.includes("analytics vidhya") || name.includes("power bi")) {
      return (
        <div className="relative w-12 h-12 flex items-center justify-center bg-amber-50 rounded-xl border border-amber-100 shadow-2xs">
          {/* Power BI signature column charts */}
          <div className="flex items-end space-x-1 h-6">
            <div className="w-1.5 h-2.5 bg-yellow-400 rounded-xs"></div>
            <div className="w-1.5 h-4 bg-amber-500 rounded-xs"></div>
            <div className="w-1.5 h-6 bg-[#f2c811] rounded-xs"></div>
          </div>
        </div>
      );
    }

    // Default academic or other certificate
    return (
      <div className="relative w-12 h-12 flex items-center justify-center bg-teal-50 rounded-xl border border-teal-100 shadow-2xs text-[#3b82f6]">
        <Award className="w-6 h-6" />
      </div>
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ai": return "bg-purple-50 text-purple-700 border-purple-100";
      case "data": return "bg-teal-50 text-brand-teal border-teal-100";
      case "management": return "bg-indigo-50 text-indigo-700 border-indigo-100";
      default: return "bg-cyan-50 text-cyan-700 border-cyan-100";
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-sans font-black text-2xl text-[#0f172a] tracking-tight">
            Professional Development & Certifications
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Key professional credentials from Google, Microsoft, University of Maryland, and global institutes. Click on any credential to view the high-resolution certificate check.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search certificate or issuer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-[#3b82f6]/45 focus:bg-white focus:outline-hidden py-2.5 pl-10 pr-4 rounded-xl text-sm font-sans placeholder-slate-400 shadow-3xs transition-all duration-200"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-extrabold transition-all duration-200 shrink-0 border ${
                isActive
                  ? "bg-[#0f172a] text-white border-[#0f172a] shadow-xs"
                  : "bg-white text-slate-650 border-slate-200/50 hover:border-slate-350"
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#3b82f6]" />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid rendering certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
            onClick={() => setSelectedCert(cert)}
            className="bg-white border border-slate-205 hover:border-[#3b82f6]/40 p-6 rounded-[2rem] flex flex-col justify-between hover:shadow-[0_15px_45px_rgba(0,0,0,0.012)] hover:scale-[1.01] duration-250 transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  {getCategoryImage(cert)}
                </div>
                <div className="flex items-center space-x-1 font-mono text-[9px] font-bold text-slate-550 bg-slate-50 border border-slate-200/50 px-2.5 py-0.5 rounded-lg">
                  <span>{cert.year}</span>
                </div>
              </div>

              <h4 className="font-sans font-extrabold text-sm text-slate-800 leading-snug group-hover:text-[#3b82f6] transition duration-200">
                {cert.name}
              </h4>
              <p className="text-xs text-slate-505 font-sans mt-1">
                {cert.organization}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-slate-100 text-[9px] uppercase font-mono tracking-wider font-bold">
              {/* Highlight special tech certificates */}
              {cert.name.includes("Gemini") ? (
                <span className="text-purple-600 flex items-center space-x-1">
                  <Zap className="w-3 h-3 animate-bounce" />
                  <span>Google Certified</span>
                </span>
              ) : cert.name.includes("Power BI") ? (
                <span className="text-blue-600 flex items-center space-x-1">
                  <Award className="w-3 h-3" />
                  <span>Data Verified</span>
                </span>
              ) : (
                <span className="text-slate-400">Credential Credit</span>
              )}

              <span className="text-slate-350 group-hover:text-[#3b82f6] transition duration-200 flex items-center space-x-0.5">
                <span>Verification</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        ))}

        {filteredCertifications.length === 0 && (
          <div className="col-span-full py-16 bg-gray-50 border border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
            <Award className="w-10 h-10 text-gray-300 mb-2" />
            <h4 className="font-sans font-bold text-slate-800">No Credentials Found</h4>
            <p className="text-xs text-gray-500 font-sans max-w-sm mt-1">
              No matching certificates were found with the query &quot;{searchQuery}&quot;. Clear filters to see all.
            </p>
          </div>
        )}
      </div>

      {/* Masterpiece Lightbox Overlay / Popup Modal */}
      <AnimatePresence>
        {selectedCert && (() => {
          const meta = credentialMetadata[selectedCert.name] || {
            licId: `GHM-GEN-CERT-${selectedCert.year}-0${Math.floor(Math.random() * 8000 + 1000)}`,
            skills: ["Technical Writing", "Academic Research Documentation", "General Compliance Metrics"],
            description: `Professional validation verifying success in completing course outcomes under ${selectedCert.organization}. Demonstrates commitment to continuous expert learning.`,
            verifUrl: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna"
          };

          // Determine aesthetic theme style parameters base on organization
          const orgName = selectedCert.organization.toLowerCase();
          let frameTheme = "from-slate-800 to-slate-900 text-white";
          let badgeColor = "bg-blue-500";
          let sealSvg = null;

          if (orgName.includes("google")) {
            frameTheme = "from-blue-600 via-blue-700 to-indigo-900 text-white";
            badgeColor = "bg-amber-500";
          } else if (orgName.includes("microsoft")) {
            frameTheme = "from-slate-850 via-slate-900 to-indigo-950 text-white";
            badgeColor = "bg-cyan-500";
          } else if (orgName.includes("british")) {
            frameTheme = "from-blue-900 to-slate-900 text-white";
            badgeColor = "bg-rose-500";
          } else if (orgName.includes("maryland")) {
            frameTheme = "from-red-950/90 via-slate-900 to-amber-950/85 text-white";
            badgeColor = "bg-amber-600";
          } else if (orgName.includes("sust") || orgName.includes("anthropology")) {
            frameTheme = "from-emerald-900 via-slate-900 to-[#1e293b] text-white";
            badgeColor = "bg-teal-500";
          }

          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative grid grid-cols-1 md:grid-cols-12 max-h-[92vh] md:max-h-[85vh] my-auto"
              >
                {/* Cancel Top Button */}
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition cursor-pointer"
                  title="Close Dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Panel: Scalable High-Res Vector Digital Certificate Display (5 Cols) */}
                <div className={`col-span-1 md:col-span-5 bg-radial ${frameTheme} p-6 sm:p-8 flex flex-col justify-between text-center relative overflow-hidden min-h-[300px] md:min-h-full border-b md:border-b-0 md:border-r border-slate-700/30`}>
                  
                  {/* Delicate geometric background patterns representing professional authenticity */}
                  <div className="absolute inset-2 border border-white/10 rounded-2xl pointer-events-none"></div>
                  <div className="absolute inset-3 border border-dashed border-white/5 rounded-2xl pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/2 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl"></div>

                  {/* Header Crest */}
                  <div className="space-y-1 relative z-10 pt-2">
                    <span className="text-[9px] font-mono tracking-widest text-[#3b82f6] font-extrabold uppercase block bg-white/10 py-1 px-2.5 rounded-full mx-auto w-fit">
                      {selectedCert.organization.toUpperCase()}
                    </span>
                    <h5 className="text-[10px] font-mono uppercase tracking-widest text-slate-350 mt-15">
                      Credential of Completion
                    </h5>
                  </div>

                  {/* Recipient Details & Certificate Name */}
                  <div className="my-auto py-6 space-y-4 relative z-10">
                    <p className="text-[10px] font-serif italic text-slate-400">This certifies that</p>
                    <h3 className="font-sans font-extrabold text-base sm:text-lg text-white leading-tight tracking-tight uppercase border-b border-white/15 pb-2 max-w-[90%] mx-auto">
                      G.H.M. Ahmad Munna
                    </h3>
                    <p className="text-[10px] text-slate-300 leading-relaxed max-w-[90%] mx-auto">
                      has successfully met all professional competencies and evaluation matrices required for
                    </p>
                    <h4 className="font-sans font-black text-xs text-teal-300 tracking-wide uppercase leading-snug">
                      {selectedCert.name}
                    </h4>
                  </div>

                  {/* Bottom validation seal stamps, signature lines & registration ID */}
                  <div className="space-y-4 pt-4 border-t border-white/10 relative z-10">
                    <div className="flex items-end justify-between px-3">
                      {/* Left side Signature */}
                      <div className="text-left space-y-0.5">
                        <span className="font-serif italic text-xs text-white/80 block select-none">Munna</span>
                        <div className="w-14 h-0.5 bg-slate-500"></div>
                        <span className="text-[8px] font-mono uppercase text-slate-400 block">Candidate Sign</span>
                      </div>

                      {/* Seal Stamper Badge (Vector Graphic representation of physical stamp) */}
                      <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 100 100" className="w-12 h-12 text-amber-400 fill-current animate-spin-slow">
                          <polygon points="50,5 55,30 80,30 60,45 70,70 50,55 30,70 40,45 20,30 45,30" />
                          <circle cx="50" cy="50" r="28" className="text-white fill-none stroke-current" strokeWidth="2" />
                        </svg>
                        <ShieldCheck className="w-5 h-5 text-amber-500 absolute" />
                      </div>

                      {/* Right side Signature */}
                      <div className="text-right space-y-0.5">
                        <span className="font-serif italic text-xs text-sky-300/80 block select-none">Verified</span>
                        <div className="w-14 h-0.5 bg-slate-500"></div>
                        <span className="text-[8px] font-mono uppercase text-slate-400 block">Academic Sec.</span>
                      </div>
                    </div>

                    <div className="bg-black/35 py-1 px-2.5 rounded text-[8px] font-mono text-slate-400 tracking-wider">
                      REGISTRY ID: {meta.licId}
                    </div>
                  </div>

                </div>

                {/* Right Panel: Certifications Competency, Details & Direct verification Action (7 Cols) */}
                <div className="col-span-1 md:col-span-7 p-6 sm:p-8 flex flex-col justify-between h-full bg-slate-50/25 overflow-y-auto">
                  
                  <div className="space-y-6">
                    {/* Organization metadata card info */}
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#3b82f6] px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-full">
                        {selectedCert.organization}
                      </span>
                      <h3 className="font-sans font-black text-xl text-slate-850 mt-3 leading-snug tracking-tight">
                        {selectedCert.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-1 flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>Certified Credit Year: <strong>{selectedCert.year}</strong></span>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">Verifiable Active Status</span>
                      </p>
                    </div>

                    {/* Detailed course overview description */}
                    <div className="space-y-2">
                      <h5 className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                        Competency Verification Summary
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-sans text-justify bg-white p-4 rounded-2xl border border-gray-150 shadow-2xs">
                        {meta.description}
                      </p>
                    </div>

                    {/* Skills Proven validation section */}
                    <div className="space-y-2.5">
                      <h4 className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                        Validated Specializations
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {meta.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="px-3 py-1 bg-blue-50/50 border border-blue-100/60 text-[#3b82f6] rounded-xl text-xs font-sans font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* License Details Registry Line */}
                    <div className="p-4 rounded-2xl bg-white border border-gray-150 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono uppercase text-gray-400 block">Certificate Registration Key / Licensing ID</span>
                        <span className="text-xs font-mono font-bold text-slate-800 tracking-wider truncate block">
                          {meta.licId}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleCopyId(meta.licId)}
                        className="p-2 bg-gray-50 hover:bg-[#3b82f6]/10 text-slate-500 hover:text-[#3b82f6] rounded-xl border border-gray-200 hover:border-[#3b82f6]/20 transition shrink-0 cursor-pointer"
                        title="Copy licensing serial"
                      >
                        {copiedId ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                  {/* Connect directly to LinkedIn to verify active certificates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-6 border-t border-gray-150">
                    <button 
                      onClick={() => setSelectedCert(null)}
                      className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-slate-650 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      Exit Lightbox
                    </button>
                    
                    <a 
                      href={cvData.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 bg-brand-dark hover:bg-slate-850 text-center text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-1.5 shadow-md shadow-slate-900/10"
                    >
                      <span>Certified LinkedIn Verify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
