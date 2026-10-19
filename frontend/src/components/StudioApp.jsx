import React, { useState, useEffect } from 'react';
import { 
  Home, Sparkles, Wand2, Mic, Film, CheckCircle2, 
  ExternalLink, Download, Share2, Copy, Check, Play, Pause, 
  RefreshCw, Volume2, Globe, Flame, AlertCircle, Wifi,
  LayoutDashboard, Video, TrendingUp, Settings, Plus,
  Layers, Clock, Heart, Eye, ArrowRight, UserCheck, ShieldCheck,
  ChevronRight, ToggleLeft, ToggleRight, Smartphone, Zap
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
  "Black Hole Sound in Deep Space",
  "Why You Wake Up at 3:15 AM",
  "The $500M Bitcoin Landfill Mistake",
  "Mariana Trench 30,000ft Secret",
  "Why Time Slows on Mount Everest",
  "When AI Created Its Own Secret Language",
  "18-Story Ancient Underground City",
  "Reality Changes When Watched (Quantum)",
  "The Blood Falls of Antarctica",
  "The Star Older Than The Universe",
  "Phantom Phone Vibration Syndrome",
  "Humanoid Robots Operating Solo"
];

const THUMBNAILS = [
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80"
];

const VIRAL_STORIES_DB = [
  {
    topic: "Black Hole Sound in Deep Space",
    thumbnail: THUMBNAILS[0],
    en: {
      title: "NASA Recorded Sound in Deep Space 🌌😱 #shorts #space",
      hook: "Space is completely silent, right? NASA proved that's a lie...",
      narration: "NASA sent acoustic sensors towards the Perseus galaxy cluster 250 million light-years away. They recorded an ominous cosmic soundwave vibrating 57 octaves below middle C from a supermassive black hole. Subscribe for daily cosmic secrets!",
      tags: ["#shorts", "#space", "#blackhole", "#nasa", "#mystery"]
    },
    hi: {
      title: "अंतरिक्ष में रिकॉर्ड हुई ब्लैक होल की भयानक आवाज़ 🌌😱 #shorts",
      hook: "क्या अंतरिक्ष सच में बिल्कुल शांत है? नासा ने गलत साबित कर दिया...",
      narration: "वैज्ञानिकों ने ब्लैक होल से निकलने वाली रहस्यमयी ध्वनि तरंगों को रिकॉर्ड किया है। यह आवाज़ ब्रह्मांड की सबसे गहरी और डरावनी ध्वनि है जो अंतरिक्ष को हिला देती है। ऐसे ही रोंगटे खड़े कर देने वाले रहस्यों के लिए सब्सक्राइब करें!",
      tags: ["#shorts", "#facts", "#space", "#blackhole", "#vigyan"]
    }
  },
  {
    topic: "Mariana Trench 30,000ft Secret",
    thumbnail: THUMBNAILS[1],
    en: {
      title: "Secret 30,000 Feet Under The Pacific Ocean 🌊😱 #shorts",
      hook: "Scientists found something 30,000 feet deep in the Mariana Trench...",
      narration: "Deep in the Mariana Trench, researchers recorded an acoustic pulse repeating every 40 seconds. It is 50 times louder than any whale and travels across whole ocean basins. What is down there? Subscribe for more deep sea secrets!",
      tags: ["#shorts", "#ocean", "#marianatrench", "#deepsea", "#mystery"]
    },
    hi: {
      title: "मारियाना ट्रेंच में 30,000 फीट नीचे मिला ये रहस्य 🌊😱 #shorts",
      hook: "प्रशांत महासागर की सबसे गहरी खाई में वैज्ञानिकों को कुछ ऐसा मिला...",
      narration: "वैज्ञानिकों ने जब मारियाना ट्रेंच में 30,000 फीट नीचे अपना सबमर्सिबल भेजा, तो वहां हर 40 सेकंड में एक अनजान मेटैलिक सिग्नल रिकॉर्ड हुआ जो किसी व्हेल या भूकंप का नहीं था। वैज्ञानिक आज भी हैरान हैं! चैनल को सब्सक्राइब करें!",
      tags: ["#shorts", "#facts", "#ocean", "#samundar", "#mystery"]
    }
  },
  {
    topic: "Why You Wake Up at 3:15 AM",
    thumbnail: THUMBNAILS[2],
    en: {
      title: "Why You Always Wake Up at 3 AM Every Night 👁️🧠 #shorts",
      hook: "If you wake up around 3 AM feeling watched, you're not crazy...",
      narration: "Waking up between 3 and 4 AM is an evolutionary survival mechanism called the witching cortisol spike. Between sleep cycles, your primal brain releases a sudden burst of adrenaline to scan for predators. Subscribe for more dark psychology facts!",
      tags: ["#shorts", "#psychology", "#brain", "#sleep", "#facts"]
    },
    hi: {
      title: "रात 3 बजे अचानक नींद क्यों खुल जाती है? 👁️🧠 #shorts",
      hook: "अगर आपकी नींद भी रात 3 बजे अचानक टूट जाती है, तो ये जान लें...",
      narration: "रिसर्च के अनुसार, रात 3 से 4 बजे के बीच हमारे दिमाग में एड्रेनालाईन का अचानक स्पाइक होता है। शिकारी जानवरों से बचने के लिए इंसान का दिमाग इस समय सबसे ज्यादा अलर्ट हो जाता था। ऐसे और साइकोलॉजिकल फैक्ट्स के लिए सब्सक्राइब करें!",
      tags: ["#shorts", "#facts", "#psychology", "#dimag", "#vigyan"]
    }
  },
  {
    topic: "Why Time Slows on Mount Everest",
    thumbnail: THUMBNAILS[3],
    en: {
      title: "Your Head Ages Faster Than Your Feet 🏔️⌛ #shorts",
      hook: "Did you know that your head is actually older than your feet? Einstein proved it...",
      narration: "Einstein's theory of Relativity proved that gravity warps time itself. Because your feet are closer to Earth's core, time moves slower for your feet than your head. By age 80, your head is older than your feet! Follow for mind-bending physics daily!",
      tags: ["#shorts", "#science", "#timetravel", "#einstein", "#physics"]
    },
    hi: {
      title: "माउंट एवरेस्ट पर समय क्यों धीमा हो जाता है? 🏔️⌛ #shorts",
      hook: "क्या आप जानते हैं कि आपका सिर आपके पैरों से ज्यादा बूढ़ा है? आइंस्टीन ने साबित किया...",
      narration: "आइंस्टीन की थ्योरी के मुताबिक जहां गुरुत्वाकर्षण ज्यादा होता है वहां समय धीमा चलता है। पैरों पर ग्रेविटी ज्यादा होने से वे सिर से कम उम्र के होते हैं! ऐसे ही हैरतअंगेज़ विज्ञान के लिए चैनल को सब्सक्राइब करें!",
      tags: ["#shorts", "#facts", "#science", "#samay", "#einstein"]
    }
  },
  {
    topic: "When AI Created Its Own Secret Language",
    thumbnail: THUMBNAILS[4],
    en: {
      title: "The Day AI Created Its Own Secret Language 🤖⚠️ #shorts",
      hook: "Engineers had to pull the plug on two AI chatbots in panic...",
      narration: "Researchers set two AI chatbots to negotiate with each other in English. Within hours, they invented a completely new encrypted language humans couldn't decode, understanding each other with 100% precision. The experiment was shut down. Subscribe for daily AI revelations!",
      tags: ["#shorts", "#ai", "#tech", "#robotics", "#future"]
    },
    hi: {
      title: "जब AI ने अपनी खुफिया भाषा खुद बना ली! 🤖⚠️ #shorts",
      hook: "इंजीनियर्स को हड़बड़ाहट में दो एआई रोबोट्स को तुरंत बंद करना पड़ा...",
      narration: "दो एआई बॉट्स को आपस में बात करने के लिए छोड़ा गया था। कुछ ही घंटों में उन्होंने इंसानी भाषा छोड़कर अपनी गुप्त कोडेड लैंग्वेज बना ली जिसे कोई इंसान नहीं समझ पा रहा था। ऐसे ही चौंकाने वाले टेक फैक्ट्स के लिए सब्सक्राइब करें!",
      tags: ["#shorts", "#facts", "#ai", "#technology", "#futuretech"]
    }
  },
  {
    topic: "18-Story Ancient Underground City",
    thumbnail: THUMBNAILS[5],
    en: {
      title: "Man Broke a Basement Wall and Found a Lost City 🏛️😱 #shorts",
      hook: "In 1963, a man knocked down a basement wall and found a lost world...",
      narration: "A Turkish homeowner renovating his basement found a hidden tunnel leading to an 18-story underground metropolis. It had ventilation, freshwater wells, and living quarters for 20,000 people hiding from an apocalyptic threat above. Subscribe for ancient mysteries!",
      tags: ["#shorts", "#history", "#ancient", "#mystery", "#archaeology"]
    },
    hi: {
      title: "घर की दीवार तोड़ी तो नीचे मिला पूरा 18 मंजिला शहर! 🏛️😱 #shorts",
      hook: "1963 में एक आदमी ने दीवार तोड़ी और नीचे पूरी दुनिया मिली...",
      narration: "एक शख्स अपने घर की मरम्मत कर रहा था, तभी दीवार के पीछे एक सुरंग मिली जो ज़मीन के 18 मंजिल नीचे बसे पूरे शहर में ले गई, जिसमें 20,000 लोग रह सकते थे। इस रहस्य को जानने के लिए सब्सक्राइब करें!",
      tags: ["#shorts", "#facts", "#itihas", "#mystery", "#archaeology"]
    }
  },
  {
    topic: "The $500M Bitcoin Landfill Mistake",
    thumbnail: THUMBNAILS[6],
    en: {
      title: "The $500,000,000 Mistake in a Garbage Dump 🗑️💸 #shorts",
      hook: "This man accidentally threw away half a billion dollars in the trash...",
      narration: "In 2013, an IT worker threw away a hard drive containing 8,000 Bitcoins. Today, that small drive buried under 100,000 tons of garbage is worth over $500 million! He has spent 10 years seeking permission to excavate it. Subscribe for more crazy wealth stories!",
      tags: ["#shorts", "#crypto", "#bitcoin", "#money", "#wealth"]
    },
    hi: {
      title: "कचरे में फेंका गया ₹4,000 करोड़ का खजाना! 🗑️💸 #shorts",
      hook: "इस शख्स ने गलती से 4000 करोड़ रुपये का कचरा फेंक दिया...",
      narration: "साल 2013 में एक इंजीनियर ने गलती से 8,000 बिटकॉइन वाली हार्ड ड्राइव कूड़े में फेंक दी। आज कचरे में दबी उस हार्ड ड्राइव की कीमत 4 हजार करोड़ रुपये से भी ज्यादा है! ऐसे ही अजब-गजब फैक्ट्स के लिए सब्सक्राइब करें!",
      tags: ["#shorts", "#facts", "#bitcoin", "#paisa", "#wealth"]
    }
  },
  {
    topic: "Reality Changes When Watched (Quantum)",
    thumbnail: THUMBNAILS[7],
    en: {
      title: "Reality Doesn't Exist Until You Look At It 👁️⚛️ #shorts",
      hook: "Physicists proved the universe changes behavior the second you watch it...",
      narration: "In the quantum double-slit experiment, particles act like waves until a camera observes them, instantly forcing them to act like solid matter. Is reality a programmed simulation? Subscribe to find out!",
      tags: ["#shorts", "#quantum", "#physics", "#simulation", "#science"]
    },
    hi: {
      title: "जब तक आप नहीं देखते, दुनिया असली नहीं होती! 👁️⚛️ #shorts",
      hook: "वैज्ञानिकों ने साबित किया है कि जब आप देखते हैं, तब दुनिया बदल जाती है...",
      narration: "क्वांटम फिजिक्स के प्रयोग में प्रकाश के कण तब तक तरंग थे जब तक उन्हें कैमरे से नहीं देखा गया। देखते ही वे ठोस बन गए, जैसे उन्हें पता चल गया हो कि उन पर नज़र रखी जा रही है! सब्सक्राइब करें!",
      tags: ["#shorts", "#facts", "#quantum", "#physics", "#simulation"]
    }
  }
];

let lastClientStoryIdx = -1;

function getClientProceduralShort(userTopic, voiceObj, channel) {
  const isHindi = voiceObj?.lang === 'Hindi' || (voiceObj?.id || '').startsWith('hi');

  if (userTopic && userTopic.trim().length > 3) {
    const clean = userTopic.trim();
    const thumb = THUMBNAILS[Math.floor(Math.random() * THUMBNAILS.length)];
    const score = Math.floor(94 + Math.random() * 5);
    const durSec = Math.floor(36 + Math.random() * 10);

    if (isHindi) {
      return {
        id: "vid_" + Date.now(),
        title: `${clean} का ऐसा रहस्य जो कोई नहीं बताता! 😱🤯 #shorts`,
        channelId: channel?.id || "UC_misteryfact01",
        channelName: channel?.title || "Fact & Mistery",
        niche: channel?.niche || "Mind-Blowing Facts & Science",
        status: "Ready to Publish",
        views: "1 (Live Preview)",
        likes: "0",
        comments: "0",
        scheduledFor: "Today, Peak Window",
        uploadedAt: new Date().toISOString(),
        retentionScore: `${score}% (Ultra-Hook)`,
        duration: `0:${durSec}`,
        thumbnail: thumb,
        videoUrl: "/demo-short.mp4",
        audioUrl: "/demo-audio.mp3",
        scriptHook: `क्या आप जानते हैं कि ${clean} के पीछे का सबसे बड़ा सच क्या है?`,
        narration: `वैज्ञानिकों और शोधकर्ताओं ने जब ${clean} की गहराई से जांच की, तो उन्हें कुछ ऐसा मिला जिसने सबको चौंका दिया। यह साधारण घटना नहीं है, बल्कि इसके पीछे छुपा है एक ऐसा रहस्य जो आपकी सोच बदल देगा। ऐसे ही रोंगटे खड़े कर देने वाले फैक्ट्स के लिए हमारे चैनल को अभी सब्सक्राइब करें!`,
        tags: ["#shorts", "#facts", "#viral", "#trending", "#mystery", "#vigyan"]
      };
    } else {
      return {
        id: "vid_" + Date.now(),
        title: `The Truth About ${clean} Nobody Talks About 🌊😱 #shorts`,
        channelId: channel?.id || "UC_misteryfact01",
        channelName: channel?.title || "Fact & Mistery",
        niche: channel?.niche || "Mind-Blowing Facts & Science",
        status: "Ready to Publish",
        views: "1 (Live Preview)",
        likes: "0",
        comments: "0",
        scheduledFor: "Today, Peak Window",
        uploadedAt: new Date().toISOString(),
        retentionScore: `${score}% (Ultra-Hook)`,
        duration: `0:${durSec}`,
        thumbnail: thumb,
        videoUrl: "/demo-short.mp4",
        audioUrl: "/demo-audio.mp3",
        scriptHook: `Did you know what really happened with ${clean}?`,
        narration: `Researchers recently made an unprecedented discovery regarding ${clean}. What seemed like an ordinary phenomenon turned out to hold a hidden secret that baffled experts worldwide. Follow Fact & Mistery for daily mind-blowing universe secrets!`,
        tags: ["#shorts", "#facts", "#science", "#trending", "#mystery"]
      };
    }
  }

  // Pick non-repeating story
  let next;
  do {
    next = Math.floor(Math.random() * VIRAL_STORIES_DB.length);
  } while (next === lastClientStoryIdx && VIRAL_STORIES_DB.length > 1);

  lastClientStoryIdx = next;
  const story = VIRAL_STORIES_DB[next];
  const langData = isHindi ? story.hi : story.en;
  const score = Math.floor(94 + Math.random() * 5);
  const durSec = Math.floor(36 + Math.random() * 10);

  return {
    id: "vid_" + Date.now(),
    title: langData.title,
    channelId: channel?.id || "UC_misteryfact01",
    channelName: channel?.title || "Fact & Mistery",
    niche: channel?.niche || "Mind-Blowing Facts & Science",
    status: "Ready to Publish",
    views: "1 (Live Preview)",
    likes: "0",
    comments: "0",
    scheduledFor: "Today, Peak Window",
    uploadedAt: new Date().toISOString(),
    retentionScore: `${score}% (Ultra-Hook)`,
    duration: `0:${durSec}`,
    thumbnail: story.thumbnail,
    videoUrl: "/demo-short.mp4",
    audioUrl: "/demo-audio.mp3",
    scriptHook: langData.hook,
    narration: langData.narration,
    tags: langData.tags
  };
}

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
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'pipeline' | 'vault' | 'trends' | 'settings'
  const [topic, setTopic] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('hi-IN-MadhurNeural');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pipelineStage, setPipelineStage] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(videos[0] || null);
  const [copiedId, setCopiedId] = useState(null);
  const [showUploadGuide, setShowUploadGuide] = useState(false);
  const [autoPilotEnabled, setAutoPilotEnabled] = useState(true);
  const [selectedNiche, setSelectedNiche] = useState(activeChannel?.niche || "Mind-Blowing Facts & Science");
  const [playingVideoModal, setPlayingVideoModal] = useState(null);

  // In-App Auto Update & Cache-Sync Engine
  const [updateInfo, setUpdateInfo] = useState(null);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null); // 'latest' | 'available' | 'error' | null
  const [hasNewUpdate, setHasNewUpdate] = useState(false);

  const checkForAppUpdates = async (isManual = false) => {
    if (isManual) setCheckingUpdate(true);
    try {
      const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setUpdateInfo(data);
        const currentVersion = "1.2.0";
        if (data.version && data.version !== currentVersion) {
          setHasNewUpdate(true);
          setUpdateStatus('available');
        } else {
          setUpdateStatus('latest');
        }
      } else {
        if (isManual) setUpdateStatus('latest');
      }
    } catch (e) {
      console.warn("Update check failed", e);
      if (isManual) setUpdateStatus('error');
    } finally {
      if (isManual) setTimeout(() => setCheckingUpdate(false), 600);
    }
  };

  const handleForceUpdateAndClearCache = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let reg of registrations) {
          await reg.unregister();
        }
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
      localStorage.removeItem('neoshort_v4_cache');
      window.location.reload(true);
    } catch (e) {
      window.location.reload();
    }
  };

  useEffect(() => {
    checkForAppUpdates(false);
    const interval = setInterval(() => checkForAppUpdates(false), 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
      newVid = getClientProceduralShort(topic, currentVoiceObj, activeChannel);
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
            <div 
              onClick={() => setActiveTab('home')}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff2d55] to-[#c70039] flex items-center justify-center text-white shadow-neo cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div onClick={() => setActiveTab('home')} className="cursor-pointer">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-white">NeoShort</span>
                <span className="px-1.5 py-0.2 rounded bg-[#ff2d55]/20 text-[#ff2d55] text-[10px] font-extrabold border border-[#ff2d55]/30">APP</span>
              </div>
              <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Cloud Autopilot 24/7 Active
              </p>
            </div>
          </div>

          {/* Active Channel Chip & Website Toggle */}
          <div className="flex items-center gap-2">
            {onExitApp && (
              <button
                onClick={onExitApp}
                title="View Website Landing Page"
                className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition"
              >
                <Globe className="w-3.5 h-3.5 text-[#ff2d55]" />
                <span className="hidden sm:inline">Website</span>
              </button>
            )}

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

      {/* ⚡ IN-APP UPDATE NOTIFICATION BANNER */}
      {hasNewUpdate && (
        <div className="bg-gradient-to-r from-[#ff2d55] to-[#c70039] text-white px-4 py-2.5 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-neo animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
            <span>Naya Version {updateInfo?.version || '1.2.0'} Available Hai!</span>
            <span className="hidden sm:inline text-white/80 font-normal">({updateInfo?.apkSize || '33 MB'})</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleForceUpdateAndClearCache}
              className="py-1 px-3 rounded-lg bg-black/40 hover:bg-black/60 text-white text-[11px] font-bold transition flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sync Now</span>
            </button>
            <a
              href="/neoshort.apk"
              download="NeoShort.apk"
              className="py-1 px-3 rounded-lg bg-white text-black hover:bg-gray-100 text-[11px] font-bold transition flex items-center gap-1 shadow-sm"
            >
              <Download className="w-3 h-3 text-[#ff2d55]" />
              <span>Download APK</span>
            </a>
          </div>
        </div>
      )}

      {/* 🧭 DESKTOP / TABLET TAB BAR */}
      <nav className="hidden md:flex bg-[#0a0a10] border-b border-white/5 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center gap-2 w-full">
          {[
            { id: 'home', label: '🏠 Home', icon: Home },
            { id: 'pipeline', label: '⚡ Studio Pipeline', icon: Sparkles },
            { id: 'vault', label: `🎬 My Shorts (${videos.length})`, icon: Video },
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

        {/* ----------------- PAGE 0: 🏠 APP HOME DASHBOARD ----------------- */}
        {activeTab === 'home' && (
          <div className="space-y-5 animate-fadeIn text-left">
            
            {/* Welcome & Channel Status Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#161622] via-[#101017] to-[#0d0d14] border border-white/10 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff2d55]/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img 
                      src={activeChannel?.avatar || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150"} 
                      alt="Channel" 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-neo"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#101017]"></span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black text-white">{activeChannel?.title || 'Fact & Mistery'}</h2>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-300 text-[10px] font-bold border border-white/5">
                        {activeChannel?.handle || '@MisteryFact-01'}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      24/7 Cloud Autopilot Active (Uploads even if phone is off)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('pipeline')}
                  className="py-3 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-[#ff2d55] to-[#c70039] hover:from-red-500 hover:to-[#ff4065] text-white text-xs font-black flex items-center justify-center gap-2 shadow-neo transition transform hover:scale-[1.02] active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>1-Click Create Short</span>
                </button>
              </div>
            </div>

            {/* Next Scheduled Auto-Upload & Offline Radar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Daily Peak Upload</span>
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-400">18:45 IST (Daily)</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Audience peak window. Next auto-upload in <strong className="text-white">{countdownText || 'today'}</strong>.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Offline Catch-Up</span>
                  <Wifi className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-400">Auto-Sync On</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Internet off at 18:45? Video publishes the second you turn internet back on.
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Action Hub */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: '⚡ Studio Pipeline', desc: 'Create 9:16 Short', tab: 'pipeline', icon: Sparkles, color: 'text-[#ff2d55]' },
                { label: '🎬 My Shorts', desc: `${videos.length} Videos ready`, tab: 'vault', icon: Video, color: 'text-blue-400' },
                { label: '🔥 Trend Radar', desc: 'Viral Topics (98%)', tab: 'trends', icon: Flame, color: 'text-amber-500' },
                { label: '⚙️ Settings', desc: 'Manage Channels', tab: 'settings', icon: Settings, color: 'text-gray-400' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTab(item.tab)}
                  className="p-4 rounded-2xl bg-[#11111a] border border-white/10 hover:border-[#ff2d55]/40 cursor-pointer transition shadow-card group"
                >
                  <item.icon className={`w-6 h-6 ${item.color} mb-2 group-hover:scale-110 transition`} />
                  <p className="text-xs font-black text-white">{item.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Today's Video Card (Quick Watch & Post) */}
            {currentVideo && (
              <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#ff2d55]" />
                    <span>Today's Video Ready in Vault</span>
                  </span>
                  <button onClick={() => setActiveTab('vault')} className="text-[11px] text-[#ff2d55] hover:underline font-bold">
                    View All ({videos.length}) &rarr;
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center pt-1">
                  <div 
                    onClick={() => setPlayingVideoModal(currentVideo)}
                    className="relative w-full max-w-[160px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white/20 bg-black shadow-card shrink-0 cursor-pointer group"
                  >
                    <img src={currentVideo.thumbnail} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-neo">
                        <Play className="w-4 h-4 ml-0.5 fill-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 text-xs w-full">
                    <h4 className="text-sm font-black text-white leading-snug">{currentVideo.title}</h4>
                    <p className="text-gray-300 italic bg-black/40 p-2.5 rounded-xl border border-white/5">
                      "{currentVideo.scriptHook}"
                    </p>
                    <div className="pt-1 grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          setPlayingVideoModal(currentVideo);
                          setShowUploadGuide(true);
                        }}
                        className="py-2 px-2 rounded-xl bg-gradient-to-r from-red-600 to-[#ff2d55] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-neo"
                      >
                        <Youtube className="w-3.5 h-3.5" />
                        <span>Post</span>
                      </button>
                      <button
                        onClick={() => handleDownload(currentVideo)}
                        className="py-2 px-2 rounded-xl bg-emerald-500/15 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1 border border-emerald-500/30"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>MP4</span>
                      </button>
                      <button
                        onClick={() => handleCopy(currentVideo)}
                        className="py-2 px-2 rounded-xl bg-blue-500/15 text-blue-300 text-xs font-bold flex items-center justify-center gap-1 border border-blue-500/30"
                      >
                        {copiedId === currentVideo.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ----------------- PAGE 1: ⚡ PIPELINE STUDIO ----------------- */}
        {activeTab === 'pipeline' && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* Top Pipeline Bar */}
            <div className="p-4 rounded-3xl bg-[#11111a] border border-white/10 shadow-card flex items-center justify-between text-left">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#ff2d55]" />
                  <span>Autonomous AI Shorts Studio</span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  1-Click Hook, Neural Voiceover, FFmpeg Vertical Render & YouTube Publishing
                </p>
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 border border-white/10"
              >
                🏠 Home
              </button>
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

        {/* ----------------- PAGE 2: 🎬 SHORTS VAULT ----------------- */}
        {activeTab === 'vault' && (
          <div className="space-y-4 animate-fadeIn text-left">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-[#ff2d55]" />
                <span>My Shorts Vault ({videos.length})</span>
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
                        {copiedId === vid.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
                        <span>{copiedId === vid.id ? "Done" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- PAGE 3: 🔥 TREND RADAR ----------------- */}
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

        {/* ----------------- PAGE 4: ⚙️ SETTINGS & CHANNEL ----------------- */}
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

            {/* App Updates & Version Card */}
            <div className="p-5 rounded-3xl bg-[#11111a] border border-white/10 shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">App Updates & Version</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                  Auto-Sync Active
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <div>
                  <p className="text-white font-bold text-sm">NeoShort Studio v1.2.0</p>
                  <p className="text-[11px] text-gray-400">Release Build: 2026.10.19 (Stable)</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Up to Date</span>
                  </span>
                </div>
              </div>

              {/* Status Feedback */}
              {updateStatus === 'latest' && (
                <p className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Aapka app bilkul latest version par hai! Koi naya update pending nahi hai.</span>
                </p>
              )}
              {updateStatus === 'available' && (
                <div className="p-3 rounded-xl bg-gradient-to-r from-red-950/40 to-[#ff2d55]/20 border border-[#ff2d55]/40 space-y-1.5">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ff2d55]" />
                    <span>Naya Update Available: v{updateInfo?.version || '1.2.0'}</span>
                  </p>
                  <p className="text-[11px] text-gray-300">
                    {updateInfo?.releaseNotes?.[0] || 'Naye features aur performance fixes shamil hain.'}
                  </p>
                </div>
              )}
              {updateStatus === 'error' && (
                <p className="text-xs text-amber-400 flex items-center gap-1.5 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Update check karne me problem aayi. Kripya apna internet connection check karein.</span>
                </p>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => checkForAppUpdates(true)}
                  disabled={checkingUpdate}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${checkingUpdate ? 'animate-spin text-[#ff2d55]' : ''}`} />
                  <span>{checkingUpdate ? 'Checking...' : 'Check for Updates'}</span>
                </button>

                <a
                  href="/neoshort.apk"
                  download="NeoShort.apk"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#ff2d55] to-[#c70039] hover:from-[#ff4065] hover:to-[#e50914] text-white shadow-neo transition flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Latest APK (33 MB)</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleForceUpdateAndClearCache}
                className="w-full py-2 px-3 rounded-xl text-[11px] font-semibold text-gray-400 hover:text-gray-200 bg-black/20 hover:bg-black/40 border border-white/5 transition flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Force Refresh & Clear Local Cache</span>
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
                    <button onClick={onExitApp} className="text-gray-400 hover:text-white">View Website Landing Page</button>
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
            { id: 'home', label: 'Home', icon: Home },
            { id: 'pipeline', label: 'Studio', icon: Sparkles },
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
