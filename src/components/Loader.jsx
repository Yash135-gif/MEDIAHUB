function Loader({ fullScreen = false }) {
  return (
    <div 
      className={`flex flex-col items-center justify-center transition-all duration-500 ${
        fullScreen ? "fixed inset-0 bg-black z-[200] h-screen" : "h-64 w-full bg-transparent"
      }`}
    >
      {/* 1. Main Visual: Concentric Pulsing Circles */}
      <div className="relative flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div className="absolute w-20 h-20 border-2 border-red-600/20 rounded-full animate-ping"></div>
        
        {/* Middle Rotating Segment */}
        <div className="w-16 h-16 border-4 border-transparent border-t-red-600 border-l-red-600 rounded-full animate-spin duration-700"></div>
        
        {/* Inner Hub Logo/Pulse */}
        <div className="absolute w-8 h-8 bg-red-600 rounded-sm rotate-45 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.8)]"></div>
      </div>

      {/* 2. Text Branding */}
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-white font-black tracking-[0.2em] text-sm uppercase opacity-80">
          Media<span className="text-red-600">Hub</span>
        </h2>
        
        {/* Animated Loading Bar */}
        <div className="mt-3 w-32 h-[2px] bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-red-600 to-transparent w-full animate-shimmer"></div>
        </div>
      </div>

      {/* Custom Keyframe for Shimmer in Tailwind Config or Style tag */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}

export default Loader;