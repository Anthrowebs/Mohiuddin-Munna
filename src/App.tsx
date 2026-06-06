import React, { useState, useEffect } from "react";
import Navigation, { TabId } from "./components/Navigation";
import ProfileTab from "./components/ProfileTab";
import ExperienceTab from "./components/ExperienceTab";
import EngagementTab from "./components/EngagementTab";
import CertificationsTab from "./components/CertificationsTab";
import AIChatTab from "./components/AIChatTab";
import { cvData } from "./data";
import { Mail, Phone, Calendar, ArrowUpRight, Award, MessageSquare, Linkedin, Sparkles, Star, Check, Copy, ExternalLink, MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll helper for menu tabs
  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      // Find offset to prevent header from truncating card tops
      const yOffset = -90; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Native Intersection Observer ScrollSpy for one-page website highlight synchronization
  useEffect(() => {
    const sections = ["profile", "research", "engagement", "certifications", "chat"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as TabId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    jobType: "Full-Time Position",
    message: ""
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(cvData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(cvData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", org: "", jobType: "Full-Time Position", message: "" });
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] bg-grid-pattern text-slate-800 flex flex-col font-sans selection:bg-[#3b82f6]/15 selection:text-slate-900">
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#3b82f6] via-indigo-500 to-emerald-400 z-[10000] origin-left transform-gpu transition-all duration-75 ease"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-indicator"
      />

      {/* Dynamic Header Banner announcing Chat Assist */}
      <div className="bg-[#0f172a] text-white px-4 py-2.5 text-center text-xs font-sans tracking-wide border-b border-white/5 flex items-center justify-center space-x-2.5 flex-wrap z-50">
        <span className="inline-flex items-center space-x-1.5 font-bold text-emerald-400">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="tracking-wide uppercase text-[10px] font-mono">REPRESENTATIVE DISPATCH:</span>
        </span>
        <span className="text-slate-350 font-medium">Have questions for Ahmad Munna? Query his background with his automated Gemini voice agent!</span>
        <button 
          onClick={() => handleTabClick("chat")}
          className="ml-2 px-3 py-0.5 rounded-full bg-[#3b82f6] hover:bg-[#3b82f6]/85 text-[10px] font-black uppercase tracking-wider text-white transition-all transform hover:scale-105 active:scale-95 duration-150 cursor-pointer"
        >
          Ping Agent
        </button>
      </div>

      {/* Main Layout Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={handleTabClick} />

      {/* Primary Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-28 sm:space-y-40 bg-dot-glow">
        
        {/* About & Core Section */}
        <section id="profile" className="scroll-mt-36 relative">
          <div className="flex items-center space-x-3 mb-8">
            <span className="font-mono text-xs font-black tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-lg">01</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-450 font-black uppercase">CORE IDENTITY & DOSSIER</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ProfileTab />
          </motion.div>
        </section>

        {/* Research & Presentations Section */}
        <section id="research" className="scroll-mt-36 relative">
          <div className="flex items-center space-x-3 mb-8">
            <span className="font-mono text-xs font-black tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-lg">02</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-450 font-black uppercase">ACADEMIC RESEARCH & CONFERENCES</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ExperienceTab />
          </motion.div>
        </section>

        {/* Leadership & Careers Section */}
        <section id="engagement" className="scroll-mt-36 relative">
          <div className="flex items-center space-x-3 mb-8">
            <span className="font-mono text-xs font-black tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-lg">03</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-450 font-black uppercase">LEADERSHIP COHORTS & IMPACT</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <EngagementTab />
          </motion.div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="scroll-mt-36 relative">
          <div className="flex items-center space-x-3 mb-8">
            <span className="font-mono text-xs font-black tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-lg">04</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-450 font-black uppercase">CREDENTIAL INTELLIGENCE</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CertificationsTab />
          </motion.div>
        </section>

        {/* Ask Munna AI Chatbot Section */}
        <section id="chat" className="scroll-mt-36 relative">
          <div className="flex items-center space-x-3 mb-8">
            <span className="font-mono text-xs font-black tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded-lg">05</span>
            <span className="text-[10px] font-mono tracking-widest text-slate-450 font-black uppercase">VIRTUAL LLM CONVERSATIONS</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
          </div>
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-slate-200/65 shadow-[0_12px_45px_rgb(0,0,0,0.02)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="mb-8 pb-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#3b82f6] font-black uppercase">
                    COGNITIVE PORTFOLIO INTERFACE
                  </span>
                  <h3 className="font-sans font-black text-2xl text-brand-dark tracking-tight mt-1">
                    Ask Munna AI — Realtime Intelligence Agent
                  </h3>
                  <p className="text-xs text-gray-550 font-sans mt-0.5">
                    Query credentials, research insights, target anthropologies, climate metrics or career highlights in real-time.
                  </p>
                </div>
              </div>
              <AIChatTab />
            </motion.div>
          </div>
        </section>

        {/* Unified Direct Contact & Recruitment Inquiry Panel */}
        <section id="contact" className="scroll-mt-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="pt-12 border-t border-gray-250/50 space-y-8"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#3b82f6] font-extrabold uppercase">
                HIRING & COLLABORATION
              </span>
              <h3 className="font-sans font-extrabold text-2xl text-brand-dark tracking-tight">
                Get In Touch & Hire Me
              </h3>
              <p className="text-sm text-gray-500 font-sans">
                Are you looking for an expert in qualitative field research, Power BI analytics, CRM management, or educational AI integration? Connect directly below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Direct Touch Channels (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-gray-400">
                  Direct Work Channels
                </h4>

                <div className="space-y-3">
                  {/* Email Channel */}
                  <div className="p-4 bg-white border border-gray-150 rounded-2xl flex items-center justify-between shadow-2xs group hover:border-[#3b82f6]/40 transition">
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="p-3 bg-blue-50 text-[#3b82f6] rounded-xl">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-mono uppercase text-gray-400">Professional Email</span>
                        <a href={`mailto:${cvData.email}`} className="text-xs sm:text-sm font-sans font-bold text-slate-800 hover:underline block truncate">
                          {cvData.email}
                        </a>
                      </div>
                    </div>
                    <button 
                      onClick={handleCopyEmail}
                      className="p-1 px-2 text-xs font-sans font-semibold text-slate-500 hover:text-[#3b82f6] bg-gray-50 hover:bg-[#3b82f6]/5 rounded-lg border border-gray-200 hover:border-[#3b82f6]/20 transition flex items-center space-x-1 shrink-0"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  {/* Cell Phone Channel */}
                  <div className="p-4 bg-white border border-gray-150 rounded-2xl flex items-center justify-between shadow-2xs group hover:border-[#3b82f6]/40 transition">
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-mono uppercase text-gray-400">Mobile Cell Line</span>
                        <a href={`tel:${cvData.phone}`} className="text-xs sm:text-sm font-sans font-bold text-slate-800 hover:underline block truncate">
                          {cvData.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <a
                        href={`https://wa.me/${cvData.phone.replace(/\s+/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg transition"
                        title="WhatsApp chat"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={handleCopyPhone}
                        className="p-1 px-2 text-xs font-sans font-semibold text-slate-500 hover:text-[#3b82f6] bg-gray-50 hover:bg-[#3b82f6]/5 rounded-lg border border-gray-200 hover:border-[#3b82f6]/20 transition flex items-center space-x-1"
                      >
                        {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPhone ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* LinkedIn Channel */}
                  <div className="p-4 bg-white border border-gray-150 rounded-2xl flex items-center justify-between shadow-2xs group hover:border-[#3b82f6]/40 transition">
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-mono uppercase text-gray-400">LinkedIn Networking</span>
                        <span className="text-xs sm:text-sm font-sans font-bold text-slate-800 block truncate">
                          @anthrowebs-mohiuddinmunna
                        </span>
                      </div>
                    </div>
                    <a 
                      href={cvData.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 px-2.5 text-xs font-sans font-semibold text-[#3b82f6] hover:text-white bg-blue-50 hover:bg-[#3b82f6] rounded-lg transition flex items-center space-x-1 shrink-0"
                    >
                      <span>Connect</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-gray-100/85">
                  <span className="text-[10px] font-mono block text-gray-400 uppercase font-bold tracking-wider mb-1">
                    Employment Availability
                  </span>
                  <p className="text-xs text-slate-650 leading-relaxed font-sans text-justify">
                    Currently open to <strong>Full-Time, Contract, Hybrid, and Remote</strong> Research Assistantships, CRM Data Structuring consultancies, or Project Management engagements worldwide.
                  </p>
                </div>
              </div>

              {/* Direct Job Inquiry Form (7 Cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border border-gray-150 shadow-xs flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#3b82f6]/2 rounded-full blur-xl"></div>
                
                <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-gray-400 mb-4 flex items-center space-x-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Immediate Recruitment Proposal</span>
                </h4>

                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block font-bold">Your Name / Scholar</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Dr. Sarah Jenkins"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-50 border border-gray-200 focus:bg-white focus:border-[#3b82f6]/55 focus:outline-hidden rounded-xl px-4 py-2.5 text-xs font-sans placeholder-gray-450 transition"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block font-bold">Your Email Address</label>
                          <input 
                            type="email" 
                            required
                            placeholder="sarah.j@university.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-slate-50 border border-gray-200 focus:bg-white focus:border-[#3b82f6]/55 focus:outline-hidden rounded-xl px-4 py-2.5 text-xs font-sans placeholder-gray-450 transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block font-bold">Organization / University</label>
                          <input 
                            type="text" 
                            placeholder="British Council / NGO"
                            value={formData.org}
                            onChange={(e) => setFormData({...formData, org: e.target.value})}
                            className="w-full bg-slate-50 border border-gray-200 focus:bg-white focus:border-[#3b82f6]/55 focus:outline-hidden rounded-xl px-4 py-2.5 text-xs font-sans placeholder-gray-450 transition"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block font-bold">Engagement Category</label>
                          <select 
                            value={formData.jobType}
                            onChange={(e) => setFormData({...formData, jobType: e.target.value})}
                            className="w-full bg-slate-50 border border-gray-200 focus:bg-white focus:border-[#3b82f6]/55 focus:outline-hidden rounded-xl px-4 py-2.5 text-xs font-sans transition"
                          >
                            <option>Full-Time Position</option>
                            <option>Research Collaboration</option>
                            <option>CRM / Web Consultancy</option>
                            <option>Project-based Contract</option>
                            <option>General Academic Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block font-bold">Proposal Details / Message</label>
                        <textarea 
                          required
                          rows={3}
                          placeholder="Tell me about the role, location, scope, and how we can work together..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-slate-50 border border-gray-200 focus:bg-white focus:border-[#3b82f6]/55 focus:outline-hidden rounded-xl px-4 py-2.5 text-xs font-sans placeholder-gray-450 transition resize-none"
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-3 px-4 bg-brand-dark hover:bg-slate-800 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition flex items-center justify-center space-x-2"
                      >
                        <Send className="w-3.5 h-3.5 text-teal-400" />
                        <span>Send Proposal to Mohiuddin</span>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      className="py-10 text-center space-y-4 flex flex-col items-center justify-center h-full"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                    >
                      <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 animate-bounce">
                        <Check className="w-6 h-6" />
                      </div>
                      <div className="space-y-1.5">
                        <h5 className="font-sans font-extrabold text-base text-slate-800">Proposal Dispatched!</h5>
                        <p className="text-xs text-gray-550 max-w-md font-sans leading-relaxed">
                          Thank you for your inquiry, <strong>{formData.name}</strong>. G.H. Mohiuddin Munna has been notified of your <strong>{formData.jobType}</strong> proposal from <strong>{formData.org || "your organization"}</strong>. Expect a formal reply shortly!
                        </p>
                      </div>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="text-[10px] font-mono uppercase text-[#3b82f6] hover:underline"
                      >
                        Submit another proposal
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Styled Footer Block */}
      <footer className="bg-brand-dark text-white border-t border-brand-teal/10 mt-auto py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-sm font-sans font-bold tracking-tight text-white">
              G.H. Mohiuddin Ahmad Munna &copy; {new Date().getFullYear()}
            </h4>
            <p className="text-xs text-slate-400 font-sans max-w-md">
              Anthropology & Cultural heritage. Certified Gemini Professional & Aspire Leaders USA alumnus.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a 
              href={`mailto:${cvData.email}`}
              className="p-2 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-brand-teal border border-white/10 flex items-center justify-center transition"
              title="Mail Me"
            >
              <Mail className="w-4 h-4" />
            </a>
            
            <a 
              href={`tel:${cvData.phone}`}
              className="p-2 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-brand-teal border border-white/10 flex items-center justify-center transition"
              title="Call Me"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a 
              href={cvData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 hover:text-brand-teal border border-white/10 flex items-center justify-center transition"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
