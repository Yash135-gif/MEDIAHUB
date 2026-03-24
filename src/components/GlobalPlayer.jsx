import { useSelector, useDispatch } from "react-redux";
import { togglePlay } from "../store/playerSlice";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaExpand } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

function GlobalPlayer() {
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Sync Audio with Redux State
  useEffect(() => {
    if (currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Update Progress Bar
  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100);
  };

  if (!currentTrack) return null; // Player tabhi dikhega jab kuch select ho

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-3 z-[100] transition-all animate-slide-up">
      <audio 
        ref={audioRef} 
        src={currentTrack.audio} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => dispatch(togglePlay())}
      />
      
      <div className="max-w-screen-2xl mx-auto grid grid-cols-3 items-center">
        
        {/* 1. Track Info */}
        <div className="flex items-center gap-4">
          <img 
            src={currentTrack.image} 
            className={`w-14 h-14 rounded-lg object-cover shadow-lg shadow-red-600/20 ${isPlaying ? 'animate-pulse' : ''}`} 
            alt="" 
          />
          <div className="hidden sm:block">
            <h4 className="text-white font-bold text-sm line-clamp-1">{currentTrack.title}</h4>
            <p className="text-gray-400 text-xs">{currentTrack.artist || currentTrack.host}</p>
          </div>
        </div>

        {/* 2. Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition"><FaStepBackward /></button>
            <button 
              onClick={() => dispatch(togglePlay())}
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
            </button>
            <button className="text-gray-400 hover:text-white transition"><FaStepForward /></button>
          </div>
          
          {/* Seek Bar */}
          <div className="w-full max-w-md bg-gray-800 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-red-600 h-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 3. Extra Options */}
        <div className="flex items-center justify-end gap-4 text-gray-400">
          <div className="hidden md:flex items-center gap-2">
            <FaVolumeUp size={14} />
            <div className="w-20 bg-gray-800 h-1 rounded-full">
              <div className="bg-white h-full w-2/3"></div>
            </div>
          </div>
          <button className="hover:text-white transition"><FaExpand size={14} /></button>
        </div>

      </div>
    </div>
  );
}

export default GlobalPlayer;