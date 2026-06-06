import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import { Sparkles, Send, Trash2, HelpCircle, AlertCircle, RefreshCw, Cpu, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am G.H. Mohiuddin Ahmad Munna's Virtual AI Portfolio Assistant, powered by Google Gemini. You can ask me anything about his research manuscripts, technical qualifications, Power BI skills, international conference papers, climate project contributions, or references! How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Tell me about his climate ecology research in Haors.",
    "Is Mohiuddin certified in Google Gemini?",
    "What qualitative research tools is he proficient in?",
    "Can you provide his contact and reference details?"
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setErrorMessage(null);
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        throw new Error("Failed to receive a response from the virtual representative server.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong while connecting to Gemini.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello again! I've cleared our chat history. Feel free to ask me anything else about G.H. Mohiuddin's qualifications, professional drive, or certifications."
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
      
      {/* Informational Column (4 cols) */}
      <div className="lg:col-span-4 space-y-6 animate-fade-in">
        <div className="bg-[#0f172a] text-slate-100 rounded-[2rem] p-6 sm:p-8 space-y-6 border border-slate-800 shadow-[0_15px_35px_rgba(15,23,42,0.12)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
            <BrainCircuit className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-widest text-[#3b82f6] font-bold uppercase block">
              Agent Capabilities
            </span>
            <h3 className="font-sans font-black text-lg mt-1.5 tracking-tight">
              Talk with G.H.M. AI Agent
            </h3>
            <p className="text-xs text-slate-350 leading-relaxed font-sans text-justify mt-2.5">
              This interactive conversational environment leverages a secure server-side proxy connected to <strong>Google Gemini</strong>. 
            </p>
          </div>

          <div className="space-y-4 pt-3.5 border-t border-slate-800/80 text-xs">
            <div className="flex items-center space-x-2 text-slate-200">
              <Cpu className="w-4 h-4 text-[#3b82f6]" />
              <span className="font-sans font-bold">Gemini Certified Knowledge</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans -mt-2 pl-6 text-justify">
              Answers are backed by official credentials and references without fabrications or guessing.
            </p>

            <div className="flex items-center space-x-2 text-slate-200">
              <Sparkles className="w-4 h-4 text-[#3b82f6]" />
              <span className="font-sans font-bold">Context-Aware Responses</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans -mt-2 pl-6 text-justify">
              Ask detailed questions regarding his roles at SUST Research projects, or his 17+ academic qualifications.
            </p>
          </div>
        </div>

        {/* Suggestion Prompt list */}
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200/60 shadow-[0_12px_45px_rgb(0,0,0,0.012)] space-y-4">
          <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-400 flex items-center space-x-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#3b82f6]/70" />
            <span>Suggested Queries</span>
          </h4>
          
          <div className="flex flex-col gap-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                disabled={isLoading}
                className="text-left text-xs font-sans font-semibold text-slate-705 bg-slate-50 hover:bg-blue-50/30 hover:border-[#3b82f6]/30 p-3.5 rounded-2xl border border-slate-200/50 transition duration-200 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Terminal Column (8 cols) */}
      <div className="lg:col-span-8 bg-white border border-slate-200/50 rounded-[2rem] shadow-[0_15px_45px_rgba(0,0,0,0.015)] flex flex-col h-[560px] overflow-hidden">
        
        {/* Terminal Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <span className="h-3 w-3 rounded-full bg-slate-200"></span>
              <span className="h-3 w-3 rounded-full bg-slate-200"></span>
              <span className="h-3 w-3 rounded-full bg-slate-200"></span>
            </div>
            <span className="text-xs font-mono text-slate-400 pl-2">ghm-agent-cli-v1.0.3</span>
          </div>

          <button
            onClick={handleClear}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-rose-600 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="font-sans font-bold">Clear Chat</span>
          </button>
        </div>

        {/* Chat message logs */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3.5 max-w-[85%] ${
                m.role === "user" ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center p-1.5 ${
                  m.role === "user"
                    ? "bg-[#0f172a] text-white"
                    : "bg-blue-50 border border-blue-100 text-[#3b82f6]"
                }`}
              >
                {m.role === "user" ? (
                  <span className="font-mono font-bold text-[10px] uppercase">My</span>
                ) : (
                  <Sparkles className="w-4 h-4 animate-pulse" />
                )}
              </div>

              <div
                className={`p-4 rounded-3xl border shadow-3xs ${
                  m.role === "user"
                    ? "bg-[#0f172a] text-slate-150 border-[#0f172a] rounded-tr-none"
                    : "bg-slate-50 text-slate-800 border-slate-200/50 rounded-tl-none font-sans"
                }`}
              >
                <div className="markdown-body text-xs sm:text-sm leading-relaxed">
                  <Markdown>{m.content}</Markdown>
                </div>
              </div>
            </div>
          ))}

          {/* Loading typing state */}
          {isLoading && (
            <div className="flex items-start space-x-3 mr-auto max-w-[80%] animate-pulse">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-50 border border-blue-105 text-[#3b82f6] flex items-center justify-center p-1.5 animate-spin-slow">
                <Sparkles className="w-4 h-4 text-[#3b82f6]" />
              </div>
              <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/50 rounded-tl-none">
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#3b82f6] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="h-2 w-2 rounded-full bg-[#3b82f6] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="h-2 w-2 rounded-full bg-[#3b82f6] animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Error fallback boxes */}
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-xs font-sans font-bold text-rose-800">Connection Interrupted</h5>
                <p className="text-xs text-rose-650 leading-relaxed font-sans">{errorMessage}</p>
                <button
                  onClick={() => handleSend(messages[messages.length - 1].content)}
                  className="flex items-center space-x-1 text-[11px] font-sans font-bold text-rose-800 hover:underline pt-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry sending last instruction</span>
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-4 bg-white border-t border-slate-100 flex items-center gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask anything about Mohiuddin's career or research..."
            className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#3b82f6]/40 focus:bg-white focus:outline-hidden px-4.5 py-3 rounded-2xl text-sm font-sans placeholder-slate-400 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-[#3b82f6] hover:bg-blue-600 text-white rounded-2xl p-3 shadow-md shadow-blue-500/10 transition-all duration-200 flex items-center justify-center shrink-0 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
