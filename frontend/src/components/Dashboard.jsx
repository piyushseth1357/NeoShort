import React, { useState } from 'react';
import { 
  Plus, Sparkles, TrendingUp, Clock, CheckCircle2, 
  Settings, Play, Eye, Heart, MessageCircle, RefreshCw, 
  Layers, ArrowUpRight, Flame, ChevronRight, ToggleLeft, ToggleRight, Radio
} from 'lucide-react';
import Youtube from './YoutubeIcon';

export default function Dashboard({ 
  user, 
  channels, 
  activeChannel, 
  setActiveChannel, 
  videos, 
  onOpenConnectChannel, 
  onOpenGenerate 
}) {
  const [autoPilotEnabled, setAutoPilotEnabled] = useState(true);
  const [selectedNiche, setSelectedNiche] = useState(activeChannel?.niche || "Mind-Blowing Facts & Science");
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' | 'trends' | 'settings'

  const niches = [
    "Mind-Blowing Facts & Science",
    "AI & Tech News",
    "Finance & Crypto Wealth",
    "Motivation & Mindset",
    "Gaming Highlights & Lore",
    "Cinema & Mystery Stories"
  ];

  const trendsForNiche = {
    "Mind-Blowing Facts & Science": [
      { title: "The Mariana Trench Sonic Anomaly", searchVolume: "4.8M searches/mo", viralScore: 98, hook: "35,000 feet down, something is emitting radio frequencies..." },
      { title: "Why Your Brain Deletes Sleep Memories", searchVolume: "3.2M searches/mo", viralScore: 95, hook: "You wake up forgetting your dream for a terrifying survival reason..." },
      { title: "The Star That Outlived Its Own Galaxy", searchVolume: "2.1M searches/mo", viralScore: 91, hook: "Astronomers found an immortal object travelling at 1,000 km/s..." }
    ],
    "AI & Tech News": [
      { title: "Humanoid Robots Crossing The Uncanny Valley", searchVolume: "6.5M searches/mo", viralScore: 99, hook: "In the last 24 hours, robotics changed forever..." },
      { title: "Quantum Teleportation Breakthrough", searchVolume: "3.9M searches/mo", viralScore: 94, hook: "Zero latency data transmission just became real..." }
    ],
    "Finance & Crypto Wealth": [
      { title: "The 72-Hour Rule of Extreme Savers", searchVolume: "3.5M searches/mo", viralScore: 94, hook: "Before you spend $100 today, remember this psychology trick..." },
      { title: "Dormant 2011 Bitcoin Wallet Activates", searchVolume: "5.1M searches/mo", viralScore: 97, hook: "5,000 Bitcoin untouched for 14 years just moved..." }
    ],
    "Motivation & Mindset": [
      { title: "The Dark Dopamine Detox Method", searchVolume: "4.2M searches/mo", viralScore: 96, hook: "Why you can't focus has nothing to do with willpower..." }
    ]
  };

  const currentTrends = trendsForNiche[selectedNiche] || trendsForNiche["Mind-Blowing Facts & Science"];

  return (
    <div className="min-h-screen bg-[#09090e] pb-24">
      {/* Dashboard Subheader */}
      <div className="bg-[#101017] border-b border-white/5 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Channel Selector */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={activeChannel?.avatar || "/logo.png"} 
                alt="Channel Avatar" 
                className="w-11 h-11 rounded-2xl object-cover border border-white/20 shadow-neo"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#101017] flex items-center justify-center"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white text-base font-black tracking-tight">{activeChannel?.title || 'Connect Channel'}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-bold border border-white/5">
                  {activeChannel?.handle || '@neocreator'}
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Autopilot Connected • {activeChannel?.subscribers || '0 subs'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onOpenConnectChannel}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5 text-[#ff2d55]" />
              Connect Another Channel
            </button>

            <button
              onClick={onOpenGenerate}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#ff2d55] to-[#c70039] hover:from-[#ff4065] text-white shadow-neo flex items-center gap-2 transition transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate & Upload Short Now</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        
        {/* Top 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          
          {/* Card 1: Autopilot Status */}
          <div className="p-6 rounded-3xl bg-[#12121b] border border-white/10 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Automation Mode</span>
              <button 
                onClick={() => setAutoPilotEnabled(!autoPilotEnabled)} 
                className="text-[#ff2d55] hover:opacity-80 transition"
              >
                {autoPilotEnabled ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7 text-gray-600" />}
              </button>
            </div>
            <div>
              <p className="text-2xl font-black text-white">
                {autoPilotEnabled ? "100% Autopilot" : "Review Before Post"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {autoPilotEnabled ? "Daily Shorts render and auto-upload at peak audience hours automatically." : "Shorts are queued for your 1-click preview and approval."}
              </p>
            </div>
          </div>

          {/* Card 2: Peak Post Hour Calculator */}
          <div className="p-6 rounded-3xl bg-[#12121b] border border-white/10 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Optimal Peak Window</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-amber-400">18:30 - 20:00 IST</p>
              <p className="text-xs text-gray-400 mt-1">
                Audience retention is 3.4x higher. NeoShort uploads precisely at <strong className="text-white">18:45 IST</strong>.
              </p>
            </div>
          </div>

          {/* Card 3: Total Reach & Retention */}
          <div className="p-6 rounded-3xl bg-[#12121b] border border-white/10 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg. Hook Retention</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">92.4%</p>
              <p className="text-xs text-gray-400 mt-1">
                Based on viral hook optimization and kinetic subtitle synchronization.
              </p>
            </div>
          </div>

        </div>

        {/* Niche Control Bar */}
        <div className="p-5 rounded-3xl bg-[#12121b] border border-white/10 shadow-card mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#ff2d55]" />
                Channel Niche Focus
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Select what topic category NeoShort should monitor and create for:</p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              {niches.map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedNiche(n)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedNiche === n 
                      ? 'bg-[#ff2d55] text-white shadow-neo' 
                      : 'bg-black/40 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Tabs: Videos / Live Trend Detective */}
        <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('videos')}
            className={`text-sm font-bold flex items-center gap-2 pb-1 border-b-2 transition ${
              activeTab === 'videos' ? 'text-white border-[#ff2d55]' : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            <Youtube className="w-4 h-4 text-[#ff2d55]" />
            Uploaded & Scheduled Shorts ({videos.length})
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`text-sm font-bold flex items-center gap-2 pb-1 border-b-2 transition ${
              activeTab === 'trends' ? 'text-white border-[#ff2d55]' : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            Live Trend Detective ({currentTrends.length})
          </button>
        </div>

        {/* Tab 1: Video List */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div 
                key={vid.id}
                className="rounded-3xl bg-[#12121b] border border-white/10 overflow-hidden shadow-card hover:border-white/20 transition flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
                    <img 
                      src={vid.thumbnail} 
                      alt={vid.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                    
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                      {vid.duration} Shorts
                    </span>

                    <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${
                      vid.status === 'Uploaded' 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}>
                      {vid.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h4 className="text-white text-sm font-bold line-clamp-2 leading-snug mb-2">
                      {vid.title}
                    </h4>
                    
                    <p className="text-xs text-gray-400 italic line-clamp-2 mb-4 bg-black/30 p-2.5 rounded-xl border border-white/5">
                      "{vid.scriptHook}"
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {vid.tags.slice(0, 4).map(t => (
                        <span key={t} className="text-[10px] text-[#ff6b8b] font-medium bg-[#ff2d55]/10 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="px-5 py-3.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-white">
                      <Eye className="w-3.5 h-3.5 text-gray-400" /> {vid.views}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-white">
                      <Heart className="w-3.5 h-3.5 text-[#ff2d55]" /> {vid.likes}
                    </span>
                  </div>

                  <span className="text-[11px] text-amber-400 font-semibold">
                    {vid.scheduledFor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Live Trend Detective */}
        {activeTab === 'trends' && (
          <div className="space-y-4">
            {currentTrends.map((tr, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-[#12121b] border border-white/10 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#ff2d55]/40 transition"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ff2d55]/20 text-[#ff2d55] border border-[#ff2d55]/40">
                      Viral Score: {tr.viralScore}/100
                    </span>
                    <span className="text-xs text-gray-400 font-medium">• {tr.searchVolume}</span>
                  </div>
                  <h4 className="text-white text-base font-bold">{tr.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">Suggested Hook: <strong className="text-gray-300">"{tr.hook}"</strong></p>
                </div>

                <button
                  onClick={onOpenGenerate}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#ff2d55]/20 hover:bg-[#ff2d55] text-white border border-[#ff2d55]/40 hover:border-transparent transition flex items-center gap-2 shrink-0 shadow-neo"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Create This Short</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
