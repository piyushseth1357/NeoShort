import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// In-memory / JSON persistent storage for development
const DB_FILE = path.join(__dirname, 'database.json');

const defaultData = {
  users: [
    {
      id: "usr_demo",
      name: "Demo Creator",
      email: "creator@neoshort.ai",
      password: "password123",
      connectedChannels: [
        {
          id: "UC_demo_987654321",
          title: "NeoFacts Official",
          handle: "@neofactsofficial",
          subscribers: "12.4K",
          avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
          niche: "Mind-Blowing Facts & Science",
          status: "Connected",
          autoMode: true,
          bestPostingTime: "18:45 IST (Peak Engagement)",
          dailyUploadLimit: 2,
          lastUploaded: "Today, 18:45 IST",
          totalUploads: 28
        }
      ],
      settings: {
        theme: "dark",
        notifications: true,
        autoApprove: true
      }
    }
  ],
  videos: [
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
      scheduledFor: "2026-09-27T18:45:00Z",
      uploadedAt: "2026-09-27T18:45:10Z",
      retentionScore: "87%",
      duration: "0:42",
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-mount-everest-during-sunrise-41712-large.mp4",
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
      views: "0",
      likes: "0",
      comments: "0",
      scheduledFor: "Today, 18:45 IST",
      retentionScore: "94% (Predicted)",
      duration: "0:38",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-31911-large.mp4",
      scriptHook: "Quantum computers just simulated something that shouldn't exist in our universe...",
      tags: ["#shorts", "#ai", "#technology", "#futuretech", "#quantum"]
    }
  ]
};

function getDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return defaultData;
  }
}

function saveDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ---------------- ROUTES ----------------

// Root Welcome Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'NeoShort AI Autonomous YouTube Shorts Engine is Active & Running 24x7!',
    endpoints: {
      health: '/api/health',
      trends: '/api/trends/detect',
      videos: '/api/videos'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NeoShort Autonomous Backend', time: new Date() });
});

// Auth: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = getDb();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) {
    // For convenience in testing, auto-allow or return demo
    return res.status(401).json({ success: false, message: 'Invalid credentials. Use creator@neoshort.ai / password123' });
  }
  res.json({
    success: true,
    token: 'jwt_mock_token_' + user.id,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      connectedChannels: user.connectedChannels,
      settings: user.settings
    }
  });
});

// Auth: Signup
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  const db = getDb();
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }
  const newUser = {
    id: "usr_" + Date.now(),
    name: name || "Creator",
    email,
    password: password || "password123",
    connectedChannels: [],
    settings: {
      theme: "dark",
      notifications: true,
      autoApprove: true
    }
  };
  db.users.push(newUser);
  saveDb(db);
  res.json({
    success: true,
    token: 'jwt_mock_token_' + newUser.id,
    user: newUser
  });
});

// YouTube Connect Flow (Mock + Live support)
app.post('/api/youtube/connect', (req, res) => {
  const { channelName, niche, handle } = req.body;
  const db = getDb();
  const user = db.users[0]; // Active user

  const newChannel = {
    id: "UC_" + Math.random().toString(36).substring(2, 11),
    title: channelName || "My YouTube Shorts Hub",
    handle: handle || "@" + (channelName ? channelName.toLowerCase().replace(/\s+/g, '') : "shortscreator"),
    subscribers: "0 (New Channel)",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    niche: niche || "Mind-Blowing Facts & Science",
    status: "Connected & Active",
    autoMode: true,
    bestPostingTime: "19:00 IST (Calculated Peak)",
    dailyUploadLimit: 1,
    lastUploaded: "Never",
    totalUploads: 0
  };

  user.connectedChannels.push(newChannel);
  saveDb(db);
  res.json({ success: true, channel: newChannel, message: 'YouTube channel connected successfully to NeoShort Autopilot!' });
});

// Trend Detective Engine
app.get('/api/trends/detect', (req, res) => {
  const niche = req.query.niche || "Mind-Blowing Facts & Science";
  
  const trendDatabase = {
    "Mind-Blowing Facts & Science": [
      { topic: "The Ocean Abyss Phenomenon", viralScore: 98, searches: "4.8M/mo", estimatedViews: "500K - 1.2M", hook: "There is a place in the Pacific where no living thing should exist..." },
      { topic: "Why Brain Remembers Random Embarrassing Memories", viralScore: 95, searches: "3.2M/mo", estimatedViews: "350K - 800K", hook: "Your brain does this at 2 AM for a terrifying evolutionary reason..." },
      { topic: "The Black Hole That Sings in B-Flat", viralScore: 92, searches: "2.1M/mo", estimatedViews: "200K - 600K", hook: "NASA recorded sound in deep space, and it's 57 octaves below middle C..." }
    ],
    "AI & Tech News": [
      { topic: "Humanoid Robots Doing Backflips & Cooking", viralScore: 99, searches: "6.5M/mo", estimatedViews: "700K - 2M", hook: "In the last 24 hours, robotics just crossed the uncanny valley forever..." },
      { topic: "Quantum Breakthrough Disproves Classical Physics Rule", viralScore: 93, searches: "3.9M/mo", estimatedViews: "400K - 900K", hook: "Scientists just teleported information with zero lag..." }
    ],
    "Finance & Crypto": [
      { topic: "The 72-Hour Rule of Wealth Builders", viralScore: 94, searches: "3.5M/mo", estimatedViews: "300K - 750K", hook: "If you have \$1,000 in your bank account, watch this before touching it..." },
      { topic: "How One Forgotten Crypto Wallet Woke Up After 14 Years", viralScore: 97, searches: "5.1M/mo", estimatedViews: "600K - 1.5M", hook: "A dormant wallet with 5,000 Bitcoin just moved today..." }
    ],
    "Motivation & Mindset": [
      { topic: "The Dark Psychology of Hyper-Focus", viralScore: 96, searches: "4.2M/mo", estimatedViews: "450K - 1M", hook: "The reason you can't focus isn't ADHD, it's dopamine hijack..." }
    ]
  };

  const trends = trendDatabase[niche] || trendDatabase["Mind-Blowing Facts & Science"];
  res.json({
    success: true,
    niche,
    detectedTrends: trends,
    peakUploadWindow: "18:30 - 20:00 IST (High Viral Probability)",
    recommendedTags: ["#shorts", "#viral", "#trending", "#fyp", niche.toLowerCase().replace(/[^a-z0-9]/g, '')]
  });
});

// Autonomous Pipeline: Generate & Upload
app.post('/api/pipeline/generate-and-upload', (req, res) => {
  const { channelId, niche, topic, uploadNow } = req.body;
  const db = getDb();
  
  const videoId = "vid_" + Date.now();
  const selectedNiche = niche || "Mind-Blowing Facts & Science";
  const chosenTopic = topic || "The Unsolved Mystery of the Baltic Sea Anomaly";

  const newVideo = {
    id: videoId,
    title: `${chosenTopic} 😱🌊 #shorts #mystery #${selectedNiche.split(' ')[0].toLowerCase()}`,
    channelId: channelId || "UC_demo_987654321",
    channelName: "NeoShort Channel",
    niche: selectedNiche,
    status: uploadNow ? "Uploaded" : "Scheduled",
    views: uploadNow ? "1.2K (Freshly Live)" : "0 (Ready for Peak Hour)",
    likes: uploadNow ? "89" : "0",
    comments: uploadNow ? "7" : "0",
    scheduledFor: uploadNow ? new Date().toISOString() : "Today, 19:15 IST (Optimized Peak)",
    uploadedAt: uploadNow ? new Date().toISOString() : null,
    retentionScore: "95% (Optimized Hook)",
    duration: "0:44",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42442-large.mp4",
    scriptHook: `Did you know that 300 feet below the surface lies something radar can't explain? Here is what divers uncovered...`,
    tags: ["#shorts", "#viral", "#facts", "#mysteries", "#trending", "#neoshort"]
  };

  db.videos.unshift(newVideo);
  saveDb(db);

  res.json({
    success: true,
    message: uploadNow ? "Video generated & auto-uploaded directly to YouTube Channel!" : "Video generated and scheduled for peak viewing time!",
    video: newVideo
  });
});

// Get Videos List
app.get('/api/videos', (req, res) => {
  const db = getDb();
  res.json({ success: true, videos: db.videos });
});

// Get User Profile & Channels
app.get('/api/user/profile', (req, res) => {
  const db = getDb();
  const user = db.users[0];
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      connectedChannels: user.connectedChannels,
      totalChannels: user.connectedChannels.length,
      settings: user.settings
    }
  });
});

app.listen(PORT, () => {
  console.log(`NeoShort Autonomous Backend running on http://localhost:${PORT}`);
});
