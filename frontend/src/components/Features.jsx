import React from 'react';
import { TrendingUp, Wand2, Mic, Video, Clock, ShieldCheck, Sliders, Layers, Sparkles } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: TrendingUp,
      color: "text-[#ff2d55]",
      bg: "bg-[#ff2d55]/10",
      border: "border-[#ff2d55]/20",
      title: "Viral Trend Detective",
      description: "Constantly scours YouTube search metrics, Google Trends, and viral velocity to pinpoint topics guaranteed to hook audiences."
    },
    {
      icon: Wand2,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      title: "3-Second Hook AI Scriptwriter",
      description: "Generates psychological hooks and fast-paced narratives designed to maintain 85%+ retention throughout the entire 45-second duration."
    },
    {
      icon: Mic,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      title: "Human-Quality Voice Narration",
      description: "Studio-mastered voices with natural breathing, expressive cadence, and tailored pacing for documentary, tech, or energetic storytelling."
    },
    {
      icon: Video,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      title: "9:16 Video Rendering & Dynamic Subtitles",
      description: "Pulls royalty-free 4K vertical footage, adds kinetic animated subtitles word-by-word, and mixes mood-matched background music."
    },
    {
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      title: "Peak Watch-Hour Auto-Scheduler",
      description: "Identifies the exact time your target audience is most active (e.g. 18:30 - 20:30 IST) and automatically publishes at peak CTR."
    },
    {
      icon: ShieldCheck,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      title: "Copyright & Repetitive Safety",
      description: "Built-in anti-duplicate algorithms ensure every video is unique in visuals, audio, and pacing, keeping your YouTube channel monetized."
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/30 text-xs font-bold text-[#ff2d55] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built For Extreme YouTube Automation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Everything Needed to Run a Faceless YouTube Empire
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Say goodbye to spending 4 hours writing, recording, editing, and uploading every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-[#111117] border border-white/5 hover:border-white/20 transition-all duration-300 shadow-card hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.bg} border ${feat.border} flex items-center justify-center ${feat.color} mb-5 group-hover:scale-110 transition`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
