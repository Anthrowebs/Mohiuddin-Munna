import React from "react";
import { User, BookOpen, Award, FileText, Sparkles, MessageSquare } from "lucide-react";

export type TabId = "profile" | "research" | "engagement" | "certifications" | "chat";

interface NavigationProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  interface TabItem {
    id: TabId;
    name: string;
    icon: React.ComponentType<any>;
    highlight?: boolean;
  }

  const tabs: TabItem[] = [
    { id: "profile", name: "About & Core", icon: User },
    { id: "research", name: "Research & Presentations", icon: BookOpen },
    { id: "engagement", name: "Leadership & Careers", icon: FileText },
    { id: "certifications", name: "Certifications", icon: Award },
    { id: "chat", name: "Ask Munna AI", icon: Sparkles, highlight: true }
  ];

  return (
    <div className="sticky top-0 sm:top-4 z-50 w-full px-0 sm:px-6 py-0 sm:py-2">
      <nav className="w-full bg-white/70 backdrop-blur-xl border-b sm:border border-slate-200/55 sm:rounded-2xl shadow-[0_10px_35px_-8px_rgba(15,23,42,0.06)] px-4 py-3 sm:px-6 max-w-7xl mx-auto transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5 cursor-pointer group" onClick={() => setActiveTab("profile")}>
              <div className="h-10 w-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center border border-[#3b82f6]/20 transition-all duration-300 group-hover:bg-[#3b82f6] group-hover:text-white">
                <span className="text-[#3b82f6] font-sans font-extrabold text-base transition-colors duration-300 group-hover:text-white">M</span>
              </div>
              <div>
                <h1 className="text-brand-dark font-sans font-black text-sm tracking-tight leading-tight group-hover:text-[#3b82f6] transition-colors duration-200">
                  G.H. Mohiuddin Ahmad Munna
                </h1>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 relative flex">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  </span>
                  <span className="text-[9px] font-mono tracking-wider uppercase text-emerald-600 font-bold">
                    Available for Research & Data roles
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center overflow-x-auto pb-1 md:pb-0 scrollbar-none justify-start md:justify-end space-x-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              if (tab.highlight) {
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-sans font-bold transition-all duration-300 relative overflow-hidden shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-[#3b82f6] to-[#1e40af] text-white shadow-md shadow-blue-500/15 scale-105 border border-blue-400/20"
                        : "bg-[#3b82f6]/5 text-[#3b82f6] hover:bg-[#3b82f6]/10 border border-[#3b82f6]/10 hover:border-[#3b82f6]/20"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white animate-pulse" : "text-[#3b82f6]"}`} />
                    <span>{tab.name}</span>
                    <span className="absolute -right-3 -top-3 w-6 h-6 bg-white/20 rounded-full blur-sm"></span>
                  </button>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-sans font-bold tracking-tight transition-all duration-200 shrink-0 ${
                    isActive
                      ? "bg-[#1e293b] text-white shadow-[0_4px_12px_rgba(30,41,59,0.1)] border border-[#1e293b]"
                      : "text-slate-505 hover:text-[#1e293b] hover:bg-slate-100/60 border border-transparent"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
