import React from 'react';
import { Sliders, Rocket, Check, ArrowRight } from 'lucide-react';
import Youtube from './YoutubeIcon';

export default function HowItWorks({ onLaunch }) {
  const steps = [
    {
      num: "01",
      icon: Youtube,
      title: "Grant 1-Click YouTube Access",
      desc: "Connect your channel with official Google OAuth. No passwords shared, strictly API compliant and safe.",
      tag: "Takes 20 seconds"
    },
    {
      num: "02",
      icon: Sliders,
      title: "Select Your Niche & Preferences",
      desc: "Choose Facts, Tech, Finance, Motivation, or let NeoShort auto-detect what's trending across YouTube today.",
      tag: "Fully Customizable"
    },
    {
      num: "03",
      icon: Rocket,
      title: "Turn On Autopilot & Relax",
      desc: "NeoShort creates, voices, edits, renders, and auto-uploads daily videos at your channel's peak traffic hour.",
      tag: "100% Autonomous"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#0c0c11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Simple 3-Step Setup
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3">
            How NeoShort Works
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Once set up, your channel operates like a fully autonomous TV network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div 
                key={i} 
                className="relative p-8 rounded-3xl bg-[#14141c] border border-white/10 shadow-card flex flex-col justify-between group hover:border-[#ff2d55]/40 transition"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-white/20 group-hover:text-[#ff2d55]/40 transition">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center text-[#ff2d55] shadow-neo group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    {step.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#181824] to-black border border-white/10 shadow-neo flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-white">Ready to Put Your YouTube Shorts On Autopilot?</h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Start completely free. No credit card required.</p>
          </div>
          <button
            onClick={onLaunch}
            className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#ff2d55] to-[#c70039] hover:from-[#ff4065] hover:to-[#e50914] text-white shadow-neo flex items-center gap-2 transition transform hover:scale-105"
          >
            <span>Launch NeoShort Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
