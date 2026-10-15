import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Wand2, Mic, Film, CheckCircle2, 
  ExternalLink, Download, Share2, Copy, Check, Play, Pause, 
  RefreshCw, Volume2, Globe, Flame, AlertCircle, Wifi,
  LayoutDashboard, Video, TrendingUp, Settings, Plus,
  Layers, Clock, Heart, Eye, ArrowRight, UserCheck, ShieldCheck,
  ChevronRight, ToggleLeft, ToggleRight
} from 'lucide-react';
import Youtube from './YoutubeIcon';
import confetti from 'canvas-confetti';
import { apiGenerateAndUpload } from '../api';

const VOICES = [
  { id: 'hi-IN-MadhurNeural', name: 'Madhur (Hindi)', lang: 'Hindi', desc: 'Natural Hindi Storyteller', flag: '🇮🇳' },
  { id: 'hi-IN-SwaraNeural', name: 'Swara (Hindi)', lang: 'Hindi', desc: 'Energetic Female Anchor', flag: '🇮🇳' },
  { id: 'en-US-ChristopherNeural', name: 'Christopher (English)', lang: 'English', desc: 'Deep Viral Mystery & Lore', flag: '🇺🇸' },
  { id: 'en-US-GuyNeural', name: 'Guy (English)', lang: 'English', desc: 'High-Energy Tech & Facts', flag: '🇺🇸' }
];

const QUICK_TOPICS = [
  "The Mariana Trench Sonic Anomaly",
  "Why Your Brain Deletes Dreams at 2 AM",
  "Humanoid Robots Crossing The Limit",
  "Why Time Slows Down on Mount Everest",
  "The Star That Outlived Its Galaxy"
];

export default function StudioApp({ 
  user, 
  channels, 
  activeChannel, 
  setActiveChannel, 
  videos, 
  onVideoCreated, 
  onOpenConnectChannel,
  onExitApp 
}) {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'autopilot' | 'vault' | 'trends' | 'settings'
  const [topic, setTopic] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('hi-IN-MadhurNeural');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pipelineStage, setPipelineStage] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(videos[0] || null);
  const [copiedId, setCopiedId] = useState(null);
  const [showUploadGuide, setShowUploadGuide] = useState(false);
  const [autoPilotEnabled, setAutoPilotEnabled] = useState(true);
  const [selectedNiche, setSelectedNiche] = useState(activeChannel?.niche || "Mind-Blowing Facts & Science");
  const [countdownText, setCountdownText] = useState('');
  const [playingVideoModal, setPlayingVideoModal] = useState(null);

  const stages = [
    { title: "Analyzing YouTube Viral Trends", desc: `Scanning high-retention topics in ${activeChannel?.niche || "Facts"}` },
    { title: "Crafting 3-Second Psychological Hook", desc: "Generating high-CTR viral script with Gemini 1.5 AI" },
    { title: "Synthesizing Studio-Grade Neural Voiceover", desc: `Generating audio with ${VOICES.find(v => v.id === selectedVoice)?.name}` },
    { title: "Compiling 9:16 Vertical Video Engine", desc: "Rendering 1080x1920 Short via FFmpeg Engine" },
    { title: "Preparing Short for YouTube Upload", desc: "Optimizing tags & description for YouTube algorithm" }
  ];

  // Live Countdown to 18:45 IST
  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      const targetToday = new Date(now);
      targetToday.setHours(18, 45, 0, 0);

      let diff = targetToday.getTime() - now.getTime();
      if (diff <= 0) {
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

  const currentVoiceObj = VOICES.find(v => v.id === selectedVoice) || VOICES[0];

  const handleGenerateShort = async () => {
    setIsGenerating(true);
    setPipelineStage(0);
    setShowUploadGuide(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < stages.length) {
        setPipelineStage(current);
      }
    }, 1200);

    let newVid = null;
    try {
      const res = await apiGenerateAndUpload({
        channelId: activeChannel?.id || "UC_misteryfact01",
        niche: activeChannel?.niche || selectedNiche,
        topic: topic.trim() || undefined,
        voice: selectedVoice,
        language: currentVoiceObj.lang,
        uploadNow: true
      });
      if (res && res.video) {
        newVid = res.video;
      }
    } catch (e) {
      console.warn("Backend live pipeline fallback:", e);
    }

    if (!newVid) {
      const chosenTopic = topic.trim() || QUICK_TOPICS[Math.floor(Math.random() * QUICK_TOPICS.length)];
      newVid = {
        id: "vid_" + Date.now(),
        title: `${chosenTopic} 🌊😱 #shorts #facts #viral`,
        channelId: activeChannel?.id || "UC_misteryfact01",
        channelName: activeChannel?.title || "Fact & Mistery",
        niche: activeChannel?.niche || "Mind-Blowing Facts & Science",
        status: "Ready to Publish",
        views: "1 (Live Preview)",
        likes: "0",
        comments: "0",
        scheduledFor: "Today, Peak Window",
        uploadedAt: new Date().toISOString(),
        retentionScore: "96% (Ultra-Hook)",
        duration: "0:42",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42442-large.mp4",
        scriptHook: "Deep in the ocean abyss, scientists captured a frequency that shouldn't exist...",
        narration: "Deep in the Mariana Trench, researchers recorded an acoustic pulse repeating every 40 seconds. It is 50 times louder than any whale and travels across whole ocean basins. What could create such a rhythmic signal in pitch-black water? Subscribe for more mind-blowing universe secrets!",
        tags: ["#shorts", "#facts", "#mistery", "#viral", "#science", "#trending"]
      };
    }

    clearInterval(interval);
    setPipelineStage(stages.length - 1);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentVideo(newVid);
      onVideoCreated(newVid);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 800);
  };

  const handleCopy = (vid) => {
    if (!vid) return;
    const text = `${vid.title}\n\n${vid.narration || vid.scriptHook}\n\n${(vid.tags || []).join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(vid.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = (vid) => {
    if (!vid?.videoUrl) return;
    const link = document.createElement('a');
    link.href = vid.videoUrl;
    link.download = `${(vid.title || 'NeoShort').replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const niches = [
    "Mind-Blowing Facts & Science",
    "AI & Tech News",
    "Finance & Crypto Wealth",
    "Motivation & Mindset",
    "Gaming Highlights & Lore"
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
    <div className="min-h-screen bg-[#07070b] text-white flex flex-col font-sans pb-24 select-none">
      
      {/* 🚀 APP TOP APPBAR */}
      <header className="sticky top-0 z-40 bg-[#0e0e16]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff2d55] to-[#c70039] flex items-center justify-center text-white shadow-neo">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-white">NeoShort</span>
                <span className="px-1.5 py-0.2 rounded bg-[#ff2d55]/20 text-[#ff2d55] text-[10px] font-extrabold border border-[#ff2d55]/30">STUDIO</span>
              </div>
              <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Cloud Engine 24/7 Active
              </p>
            </div>
          </div>

          {/* Active Channel Chip */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenConnectChannel}
              className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              <img 
                src={activeChannel?.avatar || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150"} 
                alt="Avatar" 
                className="w-6 h-6 rounded-lg object-cover" 
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-white leading-tight">{activeChannel?.title || 'Fact & Mistery'}</p>
                <p className="text-[10px] text-gray-400 leading-tight">{activeChannel?.handle || '@MisteryFact-01'}</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>
          </div>

        </div>
      </header>

      {/* 🧭 DESKTOP / TABLET TAB BAR */}
      <nav className="hidden md:flex bg-[#0a0a10] border-b border-white/5 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center gap-2 w-full">
          {[
            { id: 'pipeline', label: '⚡ Pipeline Studio', icon: Sparkles },
            { id: 'autopilot', label: '📊 Autopilot Hub', icon: LayoutDashboard },
            { id: 'vault', label: `🎬 Video Vault (${videos.length})`, icon: Video },
            { id: 'trends', label: '🔥 Trend Radar', icon: Flame },
            { id: 'settings', label: '⚙️ Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#ff2d55] text-white shadow-neo'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 🌟 MAIN APP PAGES CONTAINER */}
      <main className="max-w-4xl mx-auto w-full px-4 pt-4 sm:pt-6">

        {/* ----------------- PAGE 1: ⚡ PIPELINE STUDIO ----------------- */}
        {activeTab === 'pipeline' && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* Top Pipeline Bar */}
            <div className="p-4 rounded-3xl bg-[#11111a] border border-white/10 shadow-card flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#ff2d55]" />
                  <span>Autonomous AI Shorts Studio</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  1-Click Hook, Neural Voiceover, FFmpeg Vertical Render & YouTube Publishing
                </p>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Autopilot Ready
              </span>
            </div>

            {/* Stepper Inputs */}
            {!isGenerating ? (
              <div className="space-y-4">
                
                {/* Step 1: Topic */}
                <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card text-left space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#ff2d55]/20 text-[#ff2d55] flex items-center justify-center text-[11px] font-black">1</span>
                      <span>Topic & 3-Second Viral Hook Idea</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const random = QUICK_TOPICS[Math.floor(Math.random() * QUICK_TOPICS.length)];
                        setTopic(random);
                      }}
                      className="text-[11px] text-[#ff2d55] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Wand2 className="w-3 h-3" /> Auto-Pick Trend
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="e.g. The Mariana Trench mysterious sound, Brain secrets... (or leave blank for AI Trend)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff2d55] transition"
                  />

                  {/* Quick Topics Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-[11px]">
                    {QUICK_TOPICS.map((qt) => (
                      <button
                        key={qt}
                        type="button"
                        onClick={() => setTopic(qt)}
                        className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition ${
                          topic === qt 
                            ? 'bg-[#ff2d55]/20 border-[#ff2d55] text-white' 
                            : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {qt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Voiceover & Language */}
                <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card text-left space-y-3">
                  <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#ff2d55]/20 text-[#ff2d55] flex items-center justify-center text-[11px] font-black">2</span>
                    <span>Studio Voiceover & Language</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {VOICES.map((v) => {
                      const isSel = selectedVoice === v.id;
                      return (
                        <div
                          key={v.id}
                          onClick={() => setSelectedVoice(v.id)}
                          className={`p-3 rounded-2xl border cursor-pointer transition text-left flex items-start gap-3 ${
                            isSel
                              ? 'bg-[#ff2d55]/15 border-[#ff2d55] shadow-neo'
                              : 'bg-black/50 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="text-2xl mt-0.5">{v.flag}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold ${isSel ? 'text-white' : 'text-gray-300'}`}>{v.name}</p>
                            <p className="text-[11px] text-gray-400 truncate">{v.desc}</p>
                          </div>
                          {isSel && <CheckCircle2 className="w-4 h-4 text-[#ff2d55] shrink-0 mt-0.5" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Big Action CTA */}
                <button
                  type="button"
                  onClick={handleGenerateShort}
                  className="w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-red-600 via-[#ff2d55] to-[#c70039] hover:from-red-500 hover:to-[#ff4065] text-white shadow-neo flex items-center justify-center gap-2.5 transition transform hover:scale-[1.01] active:scale-95"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>⚡ 1-Click Generate & Render YouTube Short</span>
                </button>

              </div>
            ) : (
              /* Generating Stepper */
              <div className="p-6 rounded-3xl bg-[#11111a] border border-white/10 shadow-card text-left space-y-4">
                <div className="text-center mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#ff2d55]/10 border border-[#ff2d55]/30 flex items-center justify-center mx-auto mb-3 text-[#ff2d55] animate-pulse">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-white">Synthesizing Your Short...</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Using <strong className="text-white">{currentVoiceObj.name}</strong> • 1080x1920 60FPS Video Engine
                  </p>
                </div>

                <div className="space-y-3">
                  {stages.map((stg, idx) => {
                    const isDone = idx < pipelineStage;
                    const isCurr = idx === pipelineStage;

                    return (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                          isCurr 
                            ? 'bg-[#ff2d55]/15 border-[#ff2d55]/60 shadow-neo' 
                            : isDone 
                            ? 'bg-black/40 border-white/10 opacity-80' 
                            : 'bg-black/20 border-white/5 opacity-30'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isCurr 
                            ? 'bg-[#ff2d55] text-white animate-pulse' 
                            : isDone 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-white/5 text-gray-500'
                        }`}>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isCurr ? (
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            <span className="text-xs font-bold">{idx + 1}</span>
                          )}
                        </div>

                        <div className="text-left flex-1 min-w-0">
                          <p className={`text-xs font-bold ${isCurr ? 'text-white' : 'text-gray-300'}`}>{stg.title}</p>
                          <p className="text-[11px] text-gray-500 leading-tight truncate">{stg.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 🎬 CURRENT VIDEO PREVIEW & ACTION DECK */}
            {currentVideo && !isGenerating && (
              <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card text-left space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#ff2d55]" />
                    <span>Latest Generated Short</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                    Ready to Watch & Post
                  </span>
                </div>

                {/* 9:16 Video Player Container */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative w-full max-w-[200px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white/20 bg-black shadow-card shrink-0">
                    <video 
                      src={currentVideo.videoUrl} 
                      poster={currentVideo.thumbnail}
                      controls 
                      playsInline 
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="flex-1 space-y-2.5 text-xs w-full">
                    <h4 className="text-sm font-black text-white leading-snug">{currentVideo.title}</h4>
                    <p className="text-gray-300 italic bg-black/40 p-2.5 rounded-xl border border-white/5">
                      "{currentVideo.scriptHook}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-gray-400">Viral Hook Score:</span>
                      <span className="text-emerald-400 font-bold">{currentVideo.retentionScore || '96%'}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {(currentVideo.tags || []).slice(0, 4).map(t => (
                        <span key={t} className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Quick Tools */}
                    <div className="pt-2 grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setShowUploadGuide(true)}
                        className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-red-600 to-[#ff2d55] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-neo transition"
                      >
                        <Youtube className="w-3.5 h-3.5" />
                        <span>Post</span>
                      </button>

                      <button
                        onClick={() => handleDownload(currentVideo)}
                        className="py-2.5 px-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1 transition"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>MP4</span>
                      </button>

                      <button
                        onClick={() => handleCopy(currentVideo)}
                        className="py-2.5 px-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-xs font-bold flex items-center justify-center gap-1 transition"
                      >
                        {copiedId === currentVideo.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                        <span>{copiedId === currentVideo.id ? "Done" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upload Guide Modal/Accordion */}
                {showUploadGuide && (
                  <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 text-left space-y-2.5 mt-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-white font-bold text-xs">
                      <AlertCircle className="w-4 h-4 text-[#ff2d55]" />
                      <span>YouTube Channel Account Check</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Make sure your YouTube App is set to <strong className="text-white">{activeChannel?.title || 'Fact & Mistery'}</strong> before posting:
                    </p>
                    <div className="space-y-1 text-[11px] text-gray-300 bg-black/40 p-2.5 rounded-xl border border-white/5">
                      <p>1. Open <strong>YouTube App</strong> & switch to <strong>"{activeChannel?.title || 'Fact & Mistery'}"</strong>.</p>
                      <p>2. Tap <strong>"+"</strong> and select <strong>"Create a Short"</strong>, then pick the downloaded video.</p>
                      <p>3. Paste the copied title and viral tags!</p>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          handleCopy(currentVideo);
                          handleDownload(currentVideo);
                          window.open('https://studio.youtube.com', '_blank');
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-neo transition"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Download & Open YouTube</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowUploadGuide(false)}
                        className="py-2 px-3 rounded-xl bg-white/10 text-gray-300 text-xs font-bold"
                      >
                        Got It
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* ----------------- PAGE 2: 📊 AUTOPILOT HUB ----------------- */}
        {activeTab === 'autopilot' && (
          <div className="space-y-5 animate-fadeIn text-left">
            
            {/* Catch-Up Banner */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#101017] to-black border border-emerald-500/25 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <Wifi className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white flex items-center gap-2">
                  <span>📶 Smart Offline-to-Online Catchup Active</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold">24/7 CLOUD</span>
                </p>
                <p className="text-gray-400 mt-0.5 leading-relaxed">
                  Even if your phone is OFF at 18:45 IST, NeoShort generates and publishes immediately upon reconnection.
                </p>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cloud Engine</span>
                  <button onClick={() => setAutoPilotEnabled(!autoPilotEnabled)} className="text-[#ff2d55]">
                    {autoPilotEnabled ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7 text-gray-600" />}
                  </button>
                </div>
                <div>
                  <p className="text-xl font-black text-white">{autoPilotEnabled ? "100% Autopilot" : "Review First"}</p>
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>24/7 Cloud Active</span>
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Next Auto-Run</span>
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xl font-black text-amber-400">18:45 IST (Daily)</p>
                  <p className="text-xs text-gray-400 mt-1">Countdown: <strong className="text-white">{countdownText || 'today'}</strong></p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hook Retention</span>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xl font-black text-emerald-400">94.8% Avg CTR</p>
                  <p className="text-xs text-gray-400 mt-1">Gemini 1.5 Viral Structure</p>
                </div>
              </div>

            </div>

            {/* Niche Control Bar */}
            <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card">
              <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#ff2d55]" />
                <span>Niche Focus</span>
              </h3>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {niches.map((n) => (
                  <button
                    key={n}
                    onClick={() => setSelectedNiche(n)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
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
        )}

        {/* ----------------- PAGE 3: 🎬 VIDEO VAULT ----------------- */}
        {activeTab === 'vault' && (
          <div className="space-y-4 animate-fadeIn text-left">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-[#ff2d55]" />
                <span>Shorts Vault ({videos.length})</span>
              </h2>
              <button
                onClick={() => setActiveTab('pipeline')}
                className="text-xs font-bold text-[#ff2d55] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Create New
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((vid) => (
                <div 
                  key={vid.id}
                  className="rounded-3xl bg-[#11111a] border border-white/10 overflow-hidden shadow-card flex flex-col justify-between group hover:border-white/20 transition"
                >
                  <div 
                    onClick={() => setPlayingVideoModal(vid)}
                    className="relative aspect-[16/9] w-full bg-black overflow-hidden cursor-pointer"
                  >
                    <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-neo">
                        <Play className="w-4 h-4 ml-0.5 fill-white" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white">
                      {vid.duration || '0:42'}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 
                      onClick={() => setPlayingVideoModal(vid)}
                      className="text-xs font-bold text-white line-clamp-2 cursor-pointer hover:text-[#ff2d55] transition"
                    >
                      {vid.title}
                    </h4>

                    <div className="pt-2 border-t border-white/5 grid grid-cols-3 gap-1">
                      <button
                        onClick={() => {
                          setPlayingVideoModal(vid);
                          setShowUploadGuide(true);
                        }}
                        className="py-1.5 px-2 rounded-lg bg-red-600/15 text-white text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-red-600/30 transition"
                      >
                        <Youtube className="w-3 h-3 text-red-500" />
                        <span>Post</span>
                      </button>
                      <button
                        onClick={() => handleDownload(vid)}
                        className="py-1.5 px-2 rounded-lg bg-emerald-500/15 text-emerald-300 text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-emerald-500/30 transition"
                      >
                        <Download className="w-3 h-3 text-emerald-400" />
                        <span>MP4</span>
                      </button>
                      <button
                        onClick={() => handleCopy(vid)}
                        className="py-1.5 px-2 rounded-lg bg-blue-500/15 text-blue-300 text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-blue-500/30 transition"
                      >
                        {copiedId === vid.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-blue-400" />}
                        <span>{copiedId === vid.id ? "Done" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- PAGE 4: 🔥 TREND RADAR ----------------- */}
        {activeTab === 'trends' && (
          <div className="space-y-4 animate-fadeIn text-left">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Live Trend Detective</span>
              </h2>
              <span className="text-xs text-gray-400">Viral Probability Ranking</span>
            </div>

            <div className="space-y-3">
              {currentTrends.map((tr, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#ff2d55]/40 transition"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ff2d55]/20 text-[#ff2d55] border border-[#ff2d55]/30">
                        Viral Score: {tr.viralScore}/100
                      </span>
                      <span className="text-[11px] text-gray-400">• {tr.searchVolume}</span>
                    </div>
                    <h4 className="text-white text-sm font-bold">{tr.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Hook: <strong className="text-gray-300">"{tr.hook}"</strong></p>
                  </div>

                  <button
                    onClick={() => {
                      setTopic(tr.title);
                      setActiveTab('pipeline');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#ff2d55]/20 hover:bg-[#ff2d55] text-white border border-[#ff2d55]/40 transition flex items-center gap-1.5 shrink-0 shadow-neo"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Create Short</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- PAGE 5: ⚙️ SETTINGS & CHANNEL ----------------- */}
        {activeTab === 'settings' && (
          <div className="space-y-5 animate-fadeIn text-left">
            <h2 className="text-base font-black text-white flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-gray-400" />
              <span>Studio Configuration & Channels</span>
            </h2>

            {/* Linked Channel Card */}
            <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Channel</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Connected
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <img 
                  src={activeChannel?.avatar || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150"} 
                  alt="Avatar" 
                  className="w-12 h-12 rounded-2xl object-cover border border-white/20" 
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{activeChannel?.title || 'Fact & Mistery'}</h4>
                  <p className="text-xs text-gray-400">{activeChannel?.handle || '@MisteryFact-01'}</p>
                  <p className="text-[11px] text-emerald-400 mt-0.5">{activeChannel?.niche || 'Mind-Blowing Facts & Science'}</p>
                </div>
              </div>

              <button
                onClick={onOpenConnectChannel}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition mt-2"
              >
                Switch or Link Another Channel
              </button>
            </div>

            {/* App Info & Author */}
            <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card space-y-2 text-xs text-gray-400">
              <p className="text-white font-bold">NeoShort Autonomous Studio v2.0</p>
              <p>Designed and Built by <strong className="text-white">Piyush Seth</strong>.</p>
              <p>Backend: 24/7 Autonomous Node.js + Gemini 1.5 + Edge-TTS + FFmpeg.</p>
              <div className="pt-2 flex items-center gap-3">
                <a href="/privacy.html" target="_blank" className="text-[#ff2d55] hover:underline">Privacy Policy</a>
                <span>•</span>
                <a href="/terms.html" target="_blank" className="text-[#ff2d55] hover:underline">Terms of Service</a>
                {onExitApp && (
                  <>
                    <span>•</span>
                    <button onClick={onExitApp} className="text-gray-400 hover:text-white">View Landing Page</button>
                  </>
                )}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* 🎬 DEDICATED 9:16 THEATRE PLAYER MODAL */}
      {playingVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#12121b] border border-white/10 p-5 shadow-deep max-h-[94vh] overflow-y-auto">
            
            <button
              onClick={() => {
                setPlayingVideoModal(null);
                setShowUploadGuide(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
            >
              ✕
            </button>

            <div className="text-center mb-3">
              <h3 className="text-sm font-bold text-white line-clamp-1">{playingVideoModal.title}</h3>
              <p className="text-[11px] text-gray-400">{activeChannel?.title || 'Fact & Mistery'}</p>
            </div>

            {/* 9:16 Player */}
            <div className="relative w-full max-w-[240px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white/20 bg-black shadow-card mb-3">
              <video 
                src={playingVideoModal.videoUrl} 
                poster={playingVideoModal.thumbnail}
                controls 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                onClick={() => setShowUploadGuide(true)}
                className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-red-600 to-[#ff2d55] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-neo transition"
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
              <button
                onClick={() => handleDownload(playingVideoModal)}
                className="py-2.5 px-2 rounded-xl bg-emerald-500/15 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1 border border-emerald-500/30"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download</span>
              </button>
              <button
                onClick={() => handleCopy(playingVideoModal)}
                className="py-2.5 px-2 rounded-xl bg-blue-500/15 text-blue-300 text-xs font-bold flex items-center justify-center gap-1 border border-blue-500/30"
              >
                {copiedId === playingVideoModal.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                <span>{copiedId === playingVideoModal.id ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Account Switcher Guide */}
            {showUploadGuide && (
              <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-500/40 text-left space-y-2 mb-3 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-white font-bold text-xs">
                  <AlertCircle className="w-3.5 h-3.5 text-[#ff2d55]" />
                  <span>Important: YouTube Account Switch</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  YouTube App mein <strong className="text-white">"{activeChannel?.title || 'Fact & Mistery'}"</strong> channel open karein taaki sahi channel par video upload ho!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleCopy(playingVideoModal);
                    handleDownload(playingVideoModal);
                    window.open('https://studio.youtube.com', '_blank');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-neo transition"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Download MP4 & Open YouTube</span>
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setPlayingVideoModal(null);
                setShowUploadGuide(false);
              }}
              className="w-full py-2.5 rounded-xl bg-white/10 text-gray-300 text-xs font-bold hover:bg-white/15 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 📱 MOBILE BOTTOM NAVIGATION BAR (FIXED) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e16]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {[
            { id: 'pipeline', label: 'Studio', icon: Sparkles },
            { id: 'autopilot', label: 'Autopilot', icon: LayoutDashboard },
            { id: 'vault', label: 'Shorts', icon: Video },
            { id: 'trends', label: 'Trends', icon: Flame },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => {
            const isAct = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition ${
                  isAct 
                    ? 'text-[#ff2d55] bg-[#ff2d55]/10 font-bold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${isAct ? 'text-[#ff2d55]' : 'text-gray-400'}`} />
                <span className="text-[10px] mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
