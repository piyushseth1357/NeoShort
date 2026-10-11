import React, { useState, useEffect } from 'react';
import { 
  Plus, Sparkles, TrendingUp, Clock, CheckCircle2, 
  Settings, Play, Eye, Heart, MessageCircle, RefreshCw, 
  Layers, ArrowUpRight, Flame, ChevronRight, ToggleLeft, ToggleRight, 
  Radio, Download, Share2, Copy, Check, ExternalLink, Wifi
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
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' | 'trends'
  const [copiedId, setCopiedId] = useState(null);
  const [countdownText, setCountdownText] = useState('');

  // Live Countdown to 18:45 IST Peak Auto-Upload Window
  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      // Target: 18:45 IST (13:15 UTC)
      const targetToday = new Date(now);
      targetToday.setHours(18, 45, 0, 0);

      let diff = targetToday.getTime() - now.getTime();
      if (diff <= 0) {
        // Today's scheduled time has passed, target tomorrow 18:45 IST
        const targetTomorrow = new Date(now);
        targetTomorrow.setDate(targetTomorrow.getDate() + 1);
        targetTomorrow.setHours(18, 45, 0, 0);
        diff = targetTomorrow.getTime() - now.getTime();
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setCountdownText(`${hours}h ${minutes}m`);
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);
    return () => clearInterval(timer);
  }, []);

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

  const handleCopyVideo = (vid) => {
    const textToCopy = `${vid.title}\n\n${vid.narration || vid.scriptHook || ''}\n\n${(vid.tags || []).join(' ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(vid.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShareVideo = async (vid) => {
    const shareText = `${vid.title}\n\n${vid.narration || vid.scriptHook || ''}\n\n${(vid.tags || []).join(' ')}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: vid.title,
          text: shareText,
          url: vid.youtubeUrl || vid.videoUrl
        });
        return;
      } catch (err) {
        // dismissed
      }
    }
    window.open(vid.youtubeUrl || 'https://studio.youtube.com', '_blank');
  };

  const handleDownloadVideo = (vid) => {
    if (!vid.videoUrl) return;
    const link = document.createElement('a');
    link.href = vid.videoUrl;
    link.download = `${(vid.title || 'NeoShort').replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#09090e] pb-24 text-left">
      {/* Dashboard Subheader */}
      <div className="bg-[#101017] border-b border-white/5 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Channel Info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={activeChannel?.avatar || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150"} 
                alt="Channel Avatar" 
                className="w-12 h-12 rounded-2xl object-cover border border-white/20 shadow-neo"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#101017] flex items-center justify-center"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white text-base font-black tracking-tight">{activeChannel?.title || 'Fact & Mistery'}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-bold border border-white/5">
                  {activeChannel?.handle || '@MisteryFact-01'}
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Autopilot 24/7 Active • {activeChannel?.subscribers || '1.2K (Verified)'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onOpenConnectChannel}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5 text-[#ff2d55]" />
              Manage Channel
            </button>

            <button
              onClick={onOpenGenerate}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-red-600 via-[#ff2d55] to-[#c70039] hover:from-red-500 hover:to-[#ff4065] text-white shadow-neo flex items-center gap-2 transition transform hover:scale-[1.02] active:scale-95 animate-pulse-slow"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>⚡ 1-Click Generate & Upload to YouTube</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        
        {/* Offline-to-Online Catch-Up Engine Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#101017] to-black border border-emerald-500/25 shadow-card mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <Wifi className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white flex items-center gap-2">
                <span>📶 Smart Offline-to-Online Auto-Catchup Active</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold">24/7 CLOUD</span>
              </p>
              <p className="text-gray-400 mt-0.5 leading-relaxed">
                If your phone or mobile internet is OFF at the 18:45 IST upload time, NeoShort automatically publishes the pending daily Short the second your internet turns ON!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <span className="text-[11px] text-gray-400 font-semibold">Next Scheduled Batch:</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-black border border-emerald-500/30">
              in {countdownText || '18:45 IST'}
            </span>
          </div>
        </div>

        {/* Top 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          
          {/* Card 1: Autopilot Status */}
          <div className="p-6 rounded-3xl bg-[#12121b] border border-white/10 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cloud Engine</span>
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
              <p className="text-xs text-emerald-400 font-medium mt-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Runs 24/7 on Cloud (No phone battery/data wasted)</span>
              </p>
            </div>
          </div>

          {/* Card 2: Peak Post Hour Calculator */}
          <div className="p-6 rounded-3xl bg-[#12121b] border border-white/10 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Daily Peak Window</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-amber-400">18:45 IST (Daily)</p>
              <p className="text-xs text-gray-400 mt-1">
                Peak viewer engagement hour. Next auto-run in <strong className="text-white">{countdownText || 'today'}</strong>.
              </p>
            </div>
          </div>

          {/* Card 3: Total Reach & Retention */}
          <div className="p-6 rounded-3xl bg-[#12121b] border border-white/10 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Hook Retention</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">94.8%</p>
              <p className="text-xs text-gray-400 mt-1">
                Optimized by Gemini 1.5 3-second psychological curiosity hooks.
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
                Channel Content Focus
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Select category NeoShort monitors to create daily viral videos:</p>
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

        {/* Main Content Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('videos')}
            className={`text-sm font-bold flex items-center gap-2 pb-1 border-b-2 transition ${
              activeTab === 'videos' ? 'text-white border-[#ff2d55]' : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            <Youtube className="w-4 h-4 text-[#ff2d55]" />
            Generated & Uploaded Shorts ({videos.length})
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

        {/* Tab 1: Video Cards with Full Action Tools */}
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
                      {vid.duration || '0:42'} Shorts
                    </span>

                    <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${
                      vid.status === 'Uploaded' || vid.status === 'Live on YouTube' || vid.status === 'Uploaded & Live'
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
                    
                    <p className="text-xs text-gray-400 italic line-clamp-2 mb-3 bg-black/30 p-2.5 rounded-xl border border-white/5">
                      "{vid.scriptHook}"
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {(vid.tags || []).slice(0, 4).map(t => (
                        <span key={t} className="text-[10px] text-[#ff6b8b] font-medium bg-[#ff2d55]/10 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Instant Control Action Strip */}
                    <div className="pt-2 border-t border-white/5 grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => handleShareVideo(vid)}
                        title="Post / Share to YouTube"
                        className="py-1.5 px-2 rounded-lg bg-red-600/15 hover:bg-red-600/30 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition"
                      >
                        <Youtube className="w-3.5 h-3.5 text-red-500" />
                        <span>Post</span>
                      </button>

                      <button
                        onClick={() => handleDownloadVideo(vid)}
                        title="Download MP4 to Gallery"
                        className="py-1.5 px-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>MP4</span>
                      </button>

                      <button
                        onClick={() => handleCopyVideo(vid)}
                        title="Copy Title & Tags"
                        className="py-1.5 px-2 rounded-lg bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                      >
                        {copiedId === vid.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                        <span>{copiedId === vid.id ? "Done" : "Copy"}</span>
                      </button>
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
                    {vid.scheduledFor || 'Auto-Scheduled'}
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
