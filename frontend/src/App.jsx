import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShortsPreview from './components/ShortsPreview';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DownloadSection from './components/DownloadSection';
import Dashboard from './components/Dashboard';
import StudioApp from './components/StudioApp';
import AuthModal from './components/AuthModal';
import ConnectChannelModal from './components/ConnectChannelModal';
import GenerateVideoModal from './components/GenerateVideoModal';
import Youtube from './components/YoutubeIcon';
import { Heart, Smartphone, Monitor, Shield, Sparkles } from 'lucide-react';
import { apiFetchUserProfile, apiFetchVideos, apiCheckAndCatchup } from './api';

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
    id: "UC_misteryfact01",
    title: "Fact & Mistery",
    handle: "@MisteryFact-01",
    subscribers: "1.2K (Verified)",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    niche: "Mind-Blowing Facts & Science",
    status: "Connected & Active",
    autoMode: true,
    bestPostingTime: "18:45 IST (Peak Engagement)",
    dailyUploadLimit: 1,
    lastUploaded: "Today, 18:45 IST",
    totalUploads: 4
  }
];

const defaultVideos = [
  {
    id: "vid_101",
    title: "The Mariana Trench Mystery Nobody Talks About 🌊😱 #shorts #facts",
    channelId: "UC_misteryfact01",
    channelName: "Fact & Mistery",
    niche: "Mind-Blowing Facts & Science",
    status: "Uploaded",
    views: "184.2K",
    likes: "14.3K",
    comments: "492",
    scheduledFor: "Today, 18:45 IST",
    uploadedAt: "Today, 18:45 IST",
    retentionScore: "96% (High Retention)",
    duration: "0:42",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    videoUrl: "/demo-short.mp4",
    audioUrl: "/demo-audio.mp3",
    scriptHook: "Deep in the ocean abyss, scientists captured a frequency that shouldn't exist...",
    narration: "Scientists sent an autonomous submarine 30,000 feet into the Mariana Trench. At first, all they saw was pitch-black darkness. But suddenly, strange acoustic frequencies registered on their sonars. What they captured wasn't a whale or volcanic rumble—it was an artificial pattern repeated every 40 seconds. To this day, oceanographers cannot explain what created it. Follow for more mind-bending ocean mysteries!",
    tags: ["#shorts", "#facts", "#science", "#mystery", "#mindblown", "#trending"]
  },
  {
    id: "vid_102",
    title: "Why Time Moves Slower on Mount Everest 🏔️⌛ #shorts #facts #science",
    channelId: "UC_misteryfact01",
    channelName: "Fact & Mistery",
    niche: "Mind-Blowing Facts & Science",
    status: "Scheduled",
    views: "Queued",
    likes: "-",
    comments: "-",
    scheduledFor: "Tomorrow, 18:45 IST (Peak Window)",
    uploadedAt: null,
    retentionScore: "94% (Predicted Retention)",
    duration: "0:38",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
    videoUrl: "/demo-short.mp4",
    audioUrl: "/demo-audio.mp3",
    scriptHook: "Did you know that your head ages faster than your feet? Einstein proved it...",
    narration: "Did you know that your head ages faster than your feet? Einstein proved that gravity bends time itself. On top of Mount Everest, time moves measurably faster than at sea level. Subscribe for daily universe secrets!",
    tags: ["#shorts", "#facts", "#science", "#timetravel", "#mindblown"]
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
        name: "Fact & Mistery Creator",
        email: "misteryfact01@gmail.com"
      };
    } catch {
      return { id: "usr_creator", name: "Fact & Mistery Creator", email: "misteryfact01@gmail.com" };
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

  // View Mode: Installed APK/PWA opens Native App directly; Web browser opens Landing Page
  const [currentView, setCurrentView] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      // Query parameters from APK / shortcut / launch
      if (
        urlParams.get('source') === 'app' || 
        urlParams.get('mode') === 'studio' || 
        urlParams.get('mode') === 'app' || 
        urlParams.get('source') === 'apk' ||
        urlParams.get('view') === 'app' ||
        urlParams.get('channel_connected') === 'true'
      ) {
        localStorage.setItem('neoshort_preferred_view', 'app');
        return 'app';
      }

      // Check standalone PWA / TWA / Android WebView / Installed APK environment
      const isStandaloneApp = typeof window !== 'undefined' && (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://') ||
        /(wv|WebView|AppsGeyser)/i.test(navigator.userAgent || '')
      );
      if (isStandaloneApp) {
        localStorage.setItem('neoshort_preferred_view', 'app');
        return 'app';
      }

      // User preference
      const savedView = localStorage.getItem('neoshort_preferred_view') || localStorage.getItem(STORAGE_KEYS.CURRENT_VIEW);
      if (savedView === 'app') return 'app';

      return 'landing';
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

  // Offline-to-Online Catchup: When phone internet turns on, check if scheduled upload was missed
  useEffect(() => {
    async function triggerOverdueCatchup() {
      if (!activeChannel?.id) return;
      try {
        console.log("[Catch-Up] Checking for overdue scheduled uploads on channel:", activeChannel.title);
        const res = await apiCheckAndCatchup(activeChannel.id);
        if (res && res.catchupExecuted && res.video) {
          handleVideoCreated(res.video);
        }
      } catch (err) {
        console.log("Catchup check idle:", err.message);
      }
    }

    triggerOverdueCatchup();
    window.addEventListener('online', triggerOverdueCatchup);
    return () => window.removeEventListener('online', triggerOverdueCatchup);
  }, [activeChannel?.id]);

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
      {currentView === 'landing' ? (
        <>
          {/* Top Navbar for Landing Page */}
          <Navbar 
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenDashboard={() => {
              setCurrentView('app');
              localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'app');
            }}
            isLoggedIn={true}
            currentView={currentView}
            setCurrentView={(view) => {
              setCurrentView(view);
              localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, view);
            }}
          />

          {/* Landing Page Content */}
          <main className="flex-1">
            <Hero 
              onOpenDashboard={() => {
                setCurrentView('app');
                localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'app');
              }} 
              onOpenAuth={() => setIsAuthOpen(true)} 
            />
            <ShortsPreview />
            <Features />
            <HowItWorks onLaunch={() => {
              setCurrentView('app');
              localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'app');
            }} />
            <DownloadSection />
          </main>

          {/* Minimal Dark Footer for Website */}
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
                <a href="#features" className="hover:text-white transition">Features</a>
                <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
                <a href="#downloads" className="hover:text-white transition">Downloads</a>
                <button onClick={() => {
                  setCurrentView('app');
                  localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'app');
                }} className="hover:text-[#ff2d55] transition font-semibold">Open Studio App</button>
              </div>

              <div className="text-xs text-gray-500 text-center md:text-right">
                <p>© 2026 NeoShort AI. Designed & Built by Piyush Seth.</p>
                <p className="text-[10px] text-gray-600 mt-0.5">Complies with YouTube Data API v3 Terms of Service.</p>
              </div>
            </div>
          </footer>
        </>
      ) : (
        /* Dedicated Multi-Page Studio Mobile/Desktop Application */
        <StudioApp
          user={user}
          channels={channels}
          activeChannel={activeChannel}
          setActiveChannel={(ch) => {
            setActiveChannel(ch);
            localStorage.setItem(STORAGE_KEYS.ACTIVE_CHANNEL, JSON.stringify(ch));
          }}
          videos={videos}
          onVideoCreated={handleVideoCreated}
          onOpenConnectChannel={() => setIsConnectOpen(true)}
          onExitApp={() => {
            setCurrentView('landing');
            localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, 'landing');
          }}
        />
      )}

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
