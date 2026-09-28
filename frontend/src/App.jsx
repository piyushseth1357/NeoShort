import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShortsPreview from './components/ShortsPreview';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DownloadSection from './components/DownloadSection';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import ConnectChannelModal from './components/ConnectChannelModal';
import GenerateVideoModal from './components/GenerateVideoModal';
import Youtube from './components/YoutubeIcon';
import { Heart, Smartphone, Monitor, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  // User state
  const [user, setUser] = useState({
    id: "usr_demo",
    name: "Aarav Creator",
    email: "creator@neoshort.ai"
  });

  const [channels, setChannels] = useState([
    {
      id: "UC_demo_987654321",
      title: "NeoFacts Official",
      handle: "@neofactsofficial",
      subscribers: "12.4K",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
      niche: "Mind-Blowing Facts & Science",
      status: "Connected & Active",
      autoMode: true,
      bestPostingTime: "18:45 IST (Peak Engagement)",
      dailyUploadLimit: 2,
      lastUploaded: "Today, 18:45 IST",
      totalUploads: 28
    }
  ]);

  const [activeChannel, setActiveChannel] = useState(channels[0]);

  const [videos, setVideos] = useState([
    {
      id: "vid_101",
      title: "Why Time Moves Slower on Mount Everest 🏔️⌛ #shorts #facts #science",
      channelId: "UC_demo_987654321",
      channelName: "NeoFacts Official",
      niche: "Mind-Blowing Facts & Science",
      status: "Uploaded",
      views: "184.2K",
      likes: "14.3K",
      comments: "492",
      scheduledFor: "Today, 18:45 IST",
      uploadedAt: "Today, 18:45 IST",
      retentionScore: "89% (High Retention)",
      duration: "0:42",
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
      scriptHook: "Did you know that your head ages faster than your feet? Einstein proved it...",
      tags: ["#shorts", "#facts", "#science", "#timetravel", "#mindblown", "#trending"]
    },
    {
      id: "vid_102",
      title: "The Bizarre AI Discovery Nobody Talks About 🤖🤯 #shorts #ai #tech",
      channelId: "UC_demo_987654321",
      channelName: "NeoFacts Official",
      niche: "AI & Tech News",
      status: "Scheduled",
      views: "Queued",
      likes: "-",
      comments: "-",
      scheduledFor: "Tomorrow, 18:45 IST (Peak Window)",
      uploadedAt: null,
      retentionScore: "94% (Predicted Retention)",
      duration: "0:38",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
      scriptHook: "Quantum computers just simulated something that shouldn't exist in our universe...",
      tags: ["#shorts", "#ai", "#technology", "#futuretech", "#quantum"]
    }
  ]);

  const handleChannelConnected = (newChannel) => {
    setChannels(prev => [newChannel, ...prev]);
    setActiveChannel(newChannel);
  };

  const handleVideoCreated = (newVideo) => {
    setVideos(prev => [newVideo, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-white flex flex-col font-sans selection:bg-[#ff2d55]/30 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDashboard={() => setCurrentView('dashboard')}
        isLoggedIn={true}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <>
            <Hero 
              onOpenDashboard={() => setCurrentView('dashboard')} 
              onOpenAuth={() => setIsAuthOpen(true)} 
            />
            <ShortsPreview />
            <Features />
            <HowItWorks onLaunch={() => setCurrentView('dashboard')} />
            <DownloadSection />
          </>
        ) : (
          <Dashboard 
            user={user}
            channels={channels}
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
            videos={videos}
            onOpenConnectChannel={() => setIsConnectOpen(true)}
            onOpenGenerate={() => setIsGenerateOpen(true)}
          />
        )}
      </main>

      {/* Modern Minimal Dark Footer */}
      <footer className="bg-[#050508] border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="NeoShort Logo" className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <span className="text-white font-black tracking-tight text-lg">Neo<span className="text-[#ff2d55]">Short</span></span>
              <p className="text-[11px] text-gray-500">Autonomous YouTube Shorts Growth Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="#features" onClick={() => setCurrentView('landing')} className="hover:text-white transition">Features</a>
            <a href="#how-it-works" onClick={() => setCurrentView('landing')} className="hover:text-white transition">How it Works</a>
            <a href="#downloads" onClick={() => setCurrentView('landing')} className="hover:text-white transition">Downloads</a>
            <button onClick={() => setCurrentView('dashboard')} className="hover:text-[#ff2d55] transition font-semibold">Web Dashboard</button>
          </div>

          <div className="text-xs text-gray-500 text-center md:text-right">
            <p>© 2026 NeoShort AI. Built for automated YouTube channel scalability.</p>
            <p className="text-[10px] text-gray-600 mt-0.5">Complies with YouTube Data API v3 Terms of Service.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(usr) => {
          setUser(usr);
          setCurrentView('dashboard');
        }}
      />

      <ConnectChannelModal 
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
        onChannelConnected={handleChannelConnected}
      />

      <GenerateVideoModal 
        isOpen={isGenerateOpen}
        onClose={() => setIsGenerateOpen(false)}
        channel={activeChannel}
        onVideoCreated={handleVideoCreated}
      />

    </div>
  );
}
