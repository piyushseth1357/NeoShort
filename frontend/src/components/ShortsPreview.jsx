import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Eye, Heart, MessageCircle, Share2, Sparkles, Wand2, Check } from 'lucide-react';

export default function ShortsPreview() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeNiche, setActiveNiche] = useState('Facts');

  const sampleShorts = {
    Facts: {
      title: "Why Time Moves Slower on Mount Everest 🏔️⌛",
      hook: "Einstein proved your head is actually older than your feet...",
      tags: ["#shorts", "#facts", "#mindblown", "#science", "#timetravel"],
      views: "184.2K",
      likes: "14.3K",
      comments: "492",
      bgVideo: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-mount-everest-during-sunrise-41712-large.mp4",
      bgImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
      voiceStyle: "Deep American Documentary (Male)",
      retentionRate: "89% Watch Time"
    },
    Tech: {
      title: "The Bizarre AI Discovery Nobody Talks About 🤖🤯",
      hook: "Quantum computers just simulated something that breaks physics...",
      tags: ["#shorts", "#ai", "#tech", "#quantum", "#future"],
      views: "246.8K",
      likes: "21.6K",
      comments: "820",
      bgVideo: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-31911-large.mp4",
      bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
      voiceStyle: "Futuristic Tech Narrator (Dynamic)",
      retentionRate: "93% Watch Time"
    },
    Finance: {
      title: "The 72-Hour Rule of Wealth Builders 💵🚀",
      hook: "If you have $1,000 in your bank account, never do this...",
      tags: ["#shorts", "#money", "#finance", "#wealth", "#investing"],
      views: "312.5K",
      likes: "28.9K",
      comments: "1.1K",
      bgVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42442-large.mp4",
      bgImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80",
      voiceStyle: "High-Energy Business Voice (Crisp)",
      retentionRate: "91% Watch Time"
    }
  };

  const currentShort = sampleShorts[activeNiche];

  return (
    <section id="preview" className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-[#0d0d12] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#ff2d55] text-xs font-bold uppercase tracking-wider bg-[#ff2d55]/10 px-3 py-1 rounded-full border border-[#ff2d55]/30">
            Interactive Output Preview
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3">
            See What NeoShort Generates Automatically
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Every Short is crafted with high-impact visual hooks, dynamic synchronized captions, and studio-grade voice narration.
          </p>

          {/* Niche Selector Buttons */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {['Facts', 'Tech', 'Finance'].map((niche) => (
              <button
                key={niche}
                onClick={() => setActiveNiche(niche)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeNiche === niche
                    ? 'bg-[#ff2d55] text-white shadow-neo'
                    : 'bg-[#181822] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {niche} Niche
              </button>
            ))}
          </div>
        </div>

        {/* Mockup Showcase */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
          
          {/* Vertical Mobile Frame */}
          <div className="relative w-[300px] sm:w-[330px] h-[580px] sm:h-[620px] bg-black rounded-[42px] border-[6px] border-[#252530] shadow-deep p-3 overflow-hidden flex flex-col justify-between group">
            
            {/* Dynamic Background Media */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter brightness-[0.78]"
              style={{ backgroundImage: `url(${currentShort.bgImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90"></div>
            </div>

            {/* Mobile Top Bar */}
            <div className="relative z-10 flex items-center justify-between text-white text-xs pt-1 px-3">
              <span className="font-semibold tracking-wider">18:45</span>
              <div className="w-16 h-4 bg-[#1a1a24] rounded-full mx-auto"></div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="text-[10px]">5G</span>
                <span className="w-3.5 h-2 border border-gray-400 rounded-sm"></span>
              </div>
            </div>

            {/* Central Animated Captions */}
            <div className="relative z-10 my-auto text-center px-4">
              <div className="inline-block bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-card animate-pulse-slow">
                <p className="text-yellow-300 text-sm sm:text-base font-black tracking-wide uppercase drop-shadow-md">
                  "{currentShort.hook}"
                </p>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ff2d55]/80 text-white shadow-sm">AI Dynamic Captions</span>
              </div>
            </div>

            {/* Right Engagement Sidebar (YouTube Shorts Style) */}
            <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
              <button className="flex flex-col items-center gap-1 group/btn">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#ff2d55] transition shadow-card">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px] font-bold">{currentShort.likes}</span>
              </button>

              <button className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition shadow-card">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px] font-bold">{currentShort.comments}</span>
              </button>

              <button className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition shadow-card">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px] font-bold">Share</span>
              </button>
            </div>

            {/* Bottom Meta & Channel Info */}
            <div className="relative z-10 p-3 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-[34px]">
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src="/logo.png" 
                  alt="Channel Avatar" 
                  className="w-7 h-7 rounded-full border border-white/30 object-cover"
                />
                <span className="text-white text-xs font-bold">@NeoShortsOfficial</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">Subscribe</span>
              </div>
              
              <h3 className="text-white text-xs font-medium leading-tight mb-2">
                {currentShort.title}
              </h3>

              <div className="flex flex-wrap gap-1 text-[10px] text-[#ff6b8b] font-semibold">
                {currentShort.tags.map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Pipeline Inspection Details */}
          <div className="flex-1 space-y-5 max-w-md">
            <div className="p-6 rounded-2xl bg-[#12121a] border border-white/10 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-base font-bold flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-[#ff2d55]" />
                  Autonomous Pipeline Inspection
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                  Ready to Post
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Target Niche</span>
                  <span className="text-white font-semibold">{activeNiche} Category</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Viral Hook Score</span>
                  <span className="text-[#ff2d55] font-black">{currentShort.retentionRate}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Narration Voice</span>
                  <span className="text-white font-medium">{currentShort.voiceStyle}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Optimal Scheduled Post Time</span>
                  <span className="text-amber-400 font-semibold">Today @ 18:45 IST (Peak Traffic)</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-400">Direct YouTube Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Auto-Uploaded
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/20 to-black/40 border border-[#ff2d55]/20 shadow-neo">
              <p className="text-xs text-gray-300 leading-relaxed">
                💡 <strong className="text-white">NeoShort Intelligence</strong> tracks peak activity for Indian & International audiences. It renders your video 30 minutes before your peak traffic window and queues it directly via the official YouTube API v3.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
