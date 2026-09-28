import React from 'react';
import { Smartphone, Monitor, Sparkles, LogIn, LayoutDashboard } from 'lucide-react';
import Youtube from './YoutubeIcon';

export default function Navbar({ onOpenAuth, onOpenDashboard, isLoggedIn, currentView, setCurrentView }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <div 
          onClick={() => setCurrentView('landing')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-[#ff2d55]/40 rounded-xl blur-sm group-hover:bg-[#ff2d55]/70 transition"></div>
            <img 
              src="/logo.png" 
              alt="NeoShort Logo" 
              className="relative w-11 h-11 rounded-xl object-cover border border-white/20 shadow-neo"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-white">Neo<span className="text-[#ff2d55]">Short</span></span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#ff2d55]/20 text-[#ff2d55] border border-[#ff2d55]/40 rounded-full uppercase tracking-wider">AI</span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium -mt-1 hidden sm:block">Autonomous YouTube Shorts Engine</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button 
            onClick={() => { setCurrentView('landing'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
            className="hover:text-white transition"
          >
            Features
          </button>
          <button 
            onClick={() => { setCurrentView('landing'); setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
            className="hover:text-white transition"
          >
            How It Works
          </button>
          <button 
            onClick={() => { setCurrentView('landing'); setTimeout(() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
            className="hover:text-white transition"
          >
            Live Shorts Demo
          </button>
          <button 
            onClick={() => { setCurrentView('landing'); setTimeout(() => document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <Smartphone className="w-4 h-4 text-[#ff2d55]" />
            Download App
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {currentView === 'landing' ? (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition shadow-card"
            >
              <LayoutDashboard className="w-4 h-4 text-[#ff2d55]" />
              Open Dashboard
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition"
            >
              Home Page
            </button>
          )}

          <button
            onClick={() => {
              if (isLoggedIn) {
                setCurrentView('dashboard');
              } else {
                onOpenAuth('login');
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#ff2d55] to-[#c70039] hover:from-[#ff4065] hover:to-[#e50914] text-white shadow-neo transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoggedIn ? (
              <>
                <Youtube className="w-4 h-4" />
                <span>My Channels</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In / Connect</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
