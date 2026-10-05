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
import { apiFetchUserProfile, apiFetchVideos } from './api';

const STORAGE_KEYS = {
  CHANNELS: 'neoshort_v1_channels',
  ACTIVE_CHANNEL: 'neoshort_v1_active_channel',
  VIDEOS: 'neoshort_v1_videos',
  CURRENT_VIEW: 'neoshort_v1_current_view',
  USER: 'neoshort_v1_user',
  HAS_CUSTOM: 'neoshort_v1_has_custom'
};

const defaultChannels = [
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
];

const defaultVideos = [
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
];

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  // Permanent Persistent User
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : {
        id: "usr_creator",
        name: "Creator",
        email: "creator@neoshort.ai"
      };
    } catch {
      return { id: "usr_creator", name: "Creator", email: "creator@neoshort.ai" };
    }
  });

  // Permanent Persistent Channels
  const [channels, setChannels] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHANNELS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return defaultChannels;
    } catch {
      return defaultChannels;
    }
  });

  // Permanent Persistent Active Channel
  const [activeChannel, setActiveChannel] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_CHANNEL);
      if (saved) return JSON.parse(saved);
      return channels[0] || defaultChannels[0];
    } catch {
      return channels[0] || defaultChannels[0];
    }
  });

  // Permanent Persistent Videos
  const [videos, setVideos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return defaultVideos;
    } catch {
      return defaultVideos;
    }
  });

  // Permanent View (If user already connected a channel, open Dashboard directly!)
  const [currentView, setCurrentView] = useState(() => {
    try {
      const hasCustom = localStorage.getItem(STORAGE_KEYS.HAS_CUSTOM);
      const savedView = localStorage.getItem(STORAGE_KEYS.CURRENT_VIEW);
      if (hasCustom === 'true') {
        return 'dashboard';
      }
      return savedView || 'landing';
    } catch {
      return 'landing';
    }
  });

  // Save changes to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(channels));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, [channels]);

  useEffect(() => {
    try {
      if (activeChannel) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_CHANNEL, JSON.stringify(activeChannel));
      }
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, [activeChannel]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, [videos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, currentView);
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, [currentView]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, [user]);

  // Background Cloud Sync: syncs cloud-generated videos or channels
  useEffect(() => {
    async function syncCloudData() {
      try {
        const backendProfile = await apiFetchUserProfile();
        if (backendProfile && backendProfile.user && Array.isArray(backendProfile.user.connectedChannels) && backendProfile.user.connectedChannels.length > 0) {
          const cloudChannels = backendProfile.user.connectedChannels;
          setChannels(prev => {
            // merge keeping unique ids
            const map = new Map();
            cloudChannels.forEach(c => map.set(c.id, c));
            prev.forEach(c => { if (!map.has(c.id)) map.set(c.id, c); });
            const merged = Array.from(map.values());
            localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(merged));
            return merged;
          });
        }

        const backendVideos = await apiFetchVideos();
        if (backendVideos && Array.isArray(backendVideos.videos) && backendVideos.videos.length > 0) {
          setVideos(prev => {
            const map = new Map();
            backendVideos.videos.forEach(v => map.set(v.id, v));
            prev.forEach(v => { if (!map.has(v.id)) map.set(v.id, v); });
            const merged = Array.from(map.values()).slice(0, 5); // 5-video rolling buffer
            localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(merged));
            return merged;
          });
        }
      } catch (err) {
        console.log("Offline mode or cloud sync skipped:", err.message);
      }
    }
    syncCloudData();
  }, []);

  // Handle Google OAuth Redirect Return
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('channel_connected') === 'true') {
        const id = urlParams.get('channel_id') || ('UC_' + Date.now());
        const title = urlParams.get('channel_title') || 'Fact & Mistery';
        const handle = urlParams.get('channel_handle') || '@MisteryFact-01';
        const avatar = urlParams.get('channel_avatar') || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150';
        const subscribers = urlParams.get('channel_subs') || '1 (Google Verified)';
        const niche = urlParams.get('channel_niche') || 'Mind-Blowing Facts & Science';

        const connectedChan = {
          id,
          title,
          handle,
          subscribers,
          avatar,
          niche,
          status: 'Connected & Verified (Google OAuth)',
          autoMode: true,
          bestPostingTime: '18:45 IST (Peak Engagement)',
          dailyUploadLimit: 1,
          lastUploaded: 'Pending first daily batch',
          totalUploads: 0
        };

        handleChannelConnected(connectedChan);

        // Clean up URL query parameters cleanly
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (e) {
      console.warn("OAuth redirect param parse error:", e);
    }
  }, []);

  const handleChannelConnected = (newChannel) => {
    setChannels(prev => {
      // Put user's new channel at the top
      const filtered = prev.filter(c => c.id !== newChannel.id && c.id !== "UC_demo_987654321");
      const updated = [newChannel, ...filtered];
      localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(updated));
      return updated;
    });
    setActiveChannel(newChannel);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CHANNEL, JSON.stringify(newChannel));
    localStorage.setItem(STORAGE_KEYS.HAS_CUSTOM, 'true');
    setCurrentView('dashboard');
    localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'dashboard');
  };

  const handleVideoCreated = (newVideo) => {
    setVideos(prev => {
      const updated = [newVideo, ...prev].slice(0, 5); // strictly keep latest 5
      localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-white flex flex-col font-sans selection:bg-[#ff2d55]/30 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDashboard={() => {
          setCurrentView('dashboard');
          localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'dashboard');
        }}
        isLoggedIn={true}
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, view);
        }}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <>
            <Hero 
              onOpenDashboard={() => {
                setCurrentView('dashboard');
                localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'dashboard');
              }} 
              onOpenAuth={() => setIsAuthOpen(true)} 
            />
            <ShortsPreview />
            <Features />
            <HowItWorks onLaunch={() => {
              setCurrentView('dashboard');
              localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'dashboard');
            }} />
            <DownloadSection />
          </>
        ) : (
          <Dashboard 
            user={user}
            channels={channels}
            activeChannel={activeChannel}
            setActiveChannel={(ch) => {
              setActiveChannel(ch);
              localStorage.setItem(STORAGE_KEYS.ACTIVE_CHANNEL, JSON.stringify(ch));
            }}
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
            <button onClick={() => {
              setCurrentView('dashboard');
              localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'dashboard');
            }} className="hover:text-[#ff2d55] transition font-semibold">Web Dashboard</button>
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
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(usr));
          setCurrentView('dashboard');
          localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'dashboard');
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
