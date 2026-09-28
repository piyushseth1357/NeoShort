import React from 'react';
import { Play, Sparkles, ArrowRight, ShieldCheck, TrendingUp, Clock, Download, CheckCircle2 } from 'lucide-react';
import Youtube from './YoutubeIcon';

export default function Hero({ onOpenDashboard, onOpenAuth }) {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
      {/* Background glow ambient effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#ff2d55]/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-red-950/25 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Viral Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-semibold text-gray-300 shadow-card backdrop-blur-md mb-8 hover:border-[#ff2d55]/50 transition">
            <span className="w-2 h-2 rounded-full bg-[#ff2d55] animate-ping"></span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff2d55]" />
            <span>AI Autonomous YouTube Growth Engine 2.0</span>
            <span className="text-white/40">|</span>
            <span className="text-white font-bold">100% Hands-Free</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Autonomous Shorts That
            <span className="block mt-2 bg-gradient-to-r from-[#ff2d55] via-[#ff6b8b] to-white bg-clip-text text-transparent shadow-text-glow">
              Rank, Go Viral & Upload
            </span>
            While You Sleep.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
            Connect your YouTube channel once. <strong className="text-white">NeoShort</strong> detects trending topics, writes viral scripts, produces high-retention 9:16 videos with AI voices, and uploads them automatically at your channel's <span className="text-[#ff2d55] font-semibold">peak audience hours</span>.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-[#ff2d55] to-[#c70039] hover:from-[#ff4065] hover:to-[#e50914] text-white shadow-neo flex items-center justify-center gap-3 transition transform hover:scale-105 active:scale-95 group"
            >
              <Youtube className="w-5 h-5 text-white group-hover:scale-110 transition" />
              <span>Launch NeoShort Autopilot</span>
              <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition" />
            </button>

            <a
              href="#downloads"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-bold bg-[#14141c]/90 hover:bg-[#1a1a24] text-gray-200 border border-white/10 hover:border-white/20 shadow-card flex items-center justify-center gap-3 transition"
            >
              <Download className="w-5 h-5 text-[#ff2d55]" />
              <span>Get Mobile & Desktop App</span>
            </a>
          </div>

          {/* Trust Metrics / Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5 text-left">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#ff2d55]" />
                <span>Viral Trend Detective</span>
              </div>
              <p className="text-xl font-black text-white">Daily Fresh</p>
              <p className="text-[11px] text-gray-500">Auto-scanned topics</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Smart Peak Hours</span>
              </div>
              <p className="text-xl font-black text-white">18:30 - 20:00</p>
              <p className="text-[11px] text-gray-500">Max viewer retention</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>YouTube Safe</span>
              </div>
              <p className="text-xl font-black text-white">100% OAuth v3</p>
              <p className="text-[11px] text-gray-500">Official API compliance</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Multi-User SaaS</span>
              </div>
              <p className="text-xl font-black text-white">Multi-Channel</p>
              <p className="text-[11px] text-gray-500">Manage unlimited channels</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
