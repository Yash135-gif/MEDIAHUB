import { useSelector, useDispatch } from "react-redux";
import { togglePlay,clearTrack } from "../store/playerSlice";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

function AudioPlayer() {
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Playback error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  // Time formatting helper (00:00)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setCurrentTime(current);
    setProgress((current / dur) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioRef.current.volume = val;
    setIsMuted(val === 0);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 px-6 flex items-center justify-between z-[100] shadow-2xl">
      
      {/* 1. Track Info Section */}
      <div className="flex items-center gap-4 w-1/4">
        <div className="relative group overflow-hidden rounded-lg shadow-lg shadow-red-600/20">
          <img src={currentTrack.image} className="w-14 h-14 object-cover group-hover:scale-110 transition duration-500" alt="" />
          <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
             <div className="w-1 h-3 bg-red-600 animate-bounce mx-0.5"></div>
             <div className="w-1 h-5 bg-red-600 animate-bounce mx-0.5" style={{animationDelay: '0.2s'}}></div>
             <div className="w-1 h-3 bg-red-600 animate-bounce mx-0.5"></div>
          </div>
        </div>
        <div className="flex items-center gap-3 overflow-hidden">

  <div className="overflow-hidden">
    <h4 className="font-bold text-sm text-white truncate hover:text-red-500 transition cursor-pointer">
      {currentTrack.title}
    </h4>
    <p className="text-xs text-gray-400 truncate">
      {currentTrack.artist || currentTrack.host}
    </p>
  </div>

  {/* Close Button */}
  <button
    onClick={() => dispatch(clearTrack())}
    className="text-gray-400 hover:text-red-500 transition"
  >
    <FaTimes size={14}/>
  </button>

</div>
      </div>

        

      {/* 2. Controls & Progress Section */}
      <div className="flex flex-col items-center flex-1 max-w-2xl px-8">
        {/* Buttons */}
        <div className="flex items-center gap-6 mb-2">
          <button className="text-gray-400 hover:text-white transition"><FaStepBackward size={18}/></button>
          <button 
            onClick={() => dispatch(togglePlay())}
            className="bg-white text-black p-3.5 rounded-full hover:scale-110 active:scale-90 transition shadow-lg shadow-white/10"
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} className="ml-1" />}
          </button>
          <button className="text-gray-400 hover:text-white transition"><FaStepForward size={18}/></button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-[10px] text-gray-500 w-8 text-right font-mono">{formatTime(currentTime)}</span>
          <div className="relative flex-1 group h-6 flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-red-600 group-hover:h-1.5 transition-all z-10"
              style={{
                background: `linear-gradient(to right, #dc2626 ${progress}%, #374151 ${progress}%)`
              }}
            />
          </div>
          <span className="text-[10px] text-gray-500 w-8 font-mono">{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Volume Section */}
      <div className="flex items-center justify-end gap-3 w-1/4 group">
        <button onClick={() => {
            const newMute = !isMuted;
            setIsMuted(newMute);
            audioRef.current.volume = newMute ? 0 : volume;
        }}>
          {isMuted || volume === 0 ? <FaVolumeMute className="text-red-600" /> : <FaVolumeUp className="text-gray-400 group-hover:text-white" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-white hover:accent-red-600 transition"
        />
      </div>

      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src={currentTrack.audio} 
      />
    </div>
  );
}

export default AudioPlayer;