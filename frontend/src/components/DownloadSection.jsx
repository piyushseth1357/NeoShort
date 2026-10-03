import React, { useState } from 'react';
import { Smartphone, Monitor, Download, QrCode, CheckCircle2, ShieldCheck, Cpu, ArrowDownToLine, Globe } from 'lucide-react';

export default function DownloadSection() {
  const [downloading, setDownloading] = useState(null);

  const handleFakeDownload = (platform, filename) => {
    setDownloading(platform);
    setTimeout(() => {
      setDownloading(null);
      // Create a mock download trigger for user satisfaction
      const element = document.createElement("a");
      const file = new Blob([`NeoShort ${platform} Client Package - Version 1.2.0\nReady for installation.`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  return (
    <section id="downloads" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#ff2d55]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-3">
            <Download className="w-3.5 h-3.5 text-[#ff2d55]" />
            <span>Cross-Platform Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Download NeoShort Everywhere
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Manage your autonomous channels on the go from your Android smartphone, or keep it running in the background on your Desktop workstation.
          </p>
        </div>

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Android Mobile APK */}
          <div className="relative rounded-3xl bg-[#111118] border border-white/10 hover:border-[#ff2d55]/40 transition p-8 flex flex-col justify-between shadow-card group">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              v1.2.0 • Latest APK
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#ff2d55]/10 border border-[#ff2d55]/20 flex items-center justify-center text-[#ff2d55] mb-6 shadow-neo group-hover:scale-110 transition">
                <Smartphone className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Android Mobile App</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                Full-featured native mobile app. Receive instant push notifications whenever a new Short is rendered and uploaded to your channel.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff2d55]" />
                  <span>Android 8.0 to Android 15+ compatible</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff2d55]" />
                  <span>Real-time YouTube channel switcher</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff2d55]" />
                  <span>Direct 1-tap APK installation</span>
                </div>
              </div>
            </div>

            <div>
              <a
                href="/neoshort.apk"
                download="NeoShort.apk"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#ff2d55] to-[#c70039] hover:from-[#ff4065] hover:to-[#e50914] text-white shadow-neo flex items-center justify-center gap-2.5 transition active:scale-95 text-center"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Download Android APK (31.6 MB)</span>
              </a>
              <p className="text-[11px] text-gray-500 text-center mt-2.5">
                Safe & Verified APK • Direct Install for All Android Phones
              </p>
            </div>
          </div>

          {/* Card 2: Desktop Workstation App */}
          <div className="relative rounded-3xl bg-[#111118] border border-white/10 hover:border-[#ff2d55]/40 transition p-8 flex flex-col justify-between shadow-card group">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-bold">
              Windows • Mac • Linux
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 shadow-card group-hover:scale-110 transition">
                <Monitor className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Desktop Workstation</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                High-performance desktop suite with hardware-accelerated video compilation, local batch processing, and multi-channel scheduling.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Windows 10/11 (64-bit installer .exe)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Ultra-fast local FFmpeg video rendering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Runs silently in your system tray</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => handleFakeDownload('Windows', 'NeoShort-Desktop-Setup-v1.2.0.exe')}
                disabled={downloading === 'Windows'}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#1c1c28] hover:bg-[#252536] text-white border border-white/10 hover:border-white/20 shadow-card flex items-center justify-center gap-2.5 transition active:scale-95"
              >
                {downloading === 'Windows' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Preparing Windows Installer...
                  </span>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#ff2d55]" />
                    <span>Download for Windows (68 MB)</span>
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-3 text-[11px] text-gray-400 text-center mt-2.5">
                <span className="hover:text-white cursor-pointer" onClick={() => handleFakeDownload('macOS', 'NeoShort-Mac-v1.2.0.dmg')}>macOS (.dmg)</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer" onClick={() => handleFakeDownload('Linux', 'NeoShort-Linux.AppImage')}>Linux (.AppImage)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Cloud Web App (Universal) */}
          <div className="relative rounded-3xl bg-[#111118] border border-white/10 hover:border-[#ff2d55]/40 transition p-8 flex flex-col justify-between shadow-card group">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[11px] font-bold">
              Instant Cloud Access
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 shadow-card group-hover:scale-110 transition">
                <Globe className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Cloud Web Platform</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                No installation needed. Run NeoShort straight from Chrome, Safari, Edge or your mobile browser. Everything renders in the cloud.
              </p>

              <div className="space-y-2.5 mb-8 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>100% Cloud server rendering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Installable PWA for home screen icon</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Syncs automatically across all your devices</span>
                </div>
              </div>
            </div>

            <div>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow-card flex items-center justify-center gap-2.5 transition active:scale-95"
              >
                <span>Launch Cloud Web App</span>
              </a>
              <p className="text-[11px] text-gray-500 text-center mt-2.5">
                Always up-to-date • Zero storage footprint
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
