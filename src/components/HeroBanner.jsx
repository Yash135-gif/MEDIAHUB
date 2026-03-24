import { useDispatch, useSelector } from "react-redux";
import { addToWatchlistThunk } from "../store/mediaSlice";
import { upsertContinueWatching } from "../services/mediaService";
import { FaPlay, FaPlus, FaInfoCircle, FaCheck } from "react-icons/fa";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import toast from "react-hot-toast";

function HeroBanner({ movie }) {
  const dispatch = useDispatch();
  const [showPlayer, setShowPlayer] = useState(false);
  
  // Watchlist status check karne ke liye
  const { watchlist } = useSelector((state) => state.media);
  const isAdded = movie ? watchlist.some((m) => m.id === movie.id) : false;

  if (!movie) return null;

  const handleWatch = async () => {
    await upsertContinueWatching(movie);
    setShowPlayer(true);
  };

  const handleAddClick = () => {
    if (!isAdded) {
      dispatch(addToWatchlistThunk(movie));
      toast.success(`${movie.title} added to list!`);
    }
  };

  return (
    <div className="relative h-[85vh] w-full overflow-hidden mb-10 group">
      {/* 1. Background Video with Premium Vignette */}
<div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
  
  <video
    src={movie.videoUrl}
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  />

  {/* Gradients for Cinematic Look */}
  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

</div>


      {/* 2. Content Section */}
      <div className="relative h-full flex flex-col justify-center px-6 md:px-16 max-w-3xl space-y-6">
        {/* Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-sm">TOP 10</span>
          <span className="text-white font-bold text-sm tracking-widest uppercase">Popular This Week</span>
        </div>

        {/* Title with Glow */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-none drop-shadow-2xl">
          {movie.title}
        </h1>

        {/* Description (Truncated) */}
        <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed line-clamp-3 drop-shadow-md">
          {movie.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            onClick={handleWatch}
            className="flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-md font-black hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            <FaPlay size={20} /> WATCH NOW
          </button>

          <button 
            onClick={handleAddClick}
            disabled={isAdded}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-md font-black transition-all active:scale-95 border-2 ${
              isAdded 
              ? "bg-black/40 border-green-500 text-green-500" 
              : "bg-gray-500/30 border-gray-400 text-white hover:bg-gray-500/50"
            }`}
          >
            {isAdded ? <><FaCheck size={18}/> IN LIST</> : <><FaPlus size={18}/> MY LIST</>}
          </button>

          <button className="flex items-center gap-3 bg-gray-500/30 text-white px-5 py-3.5 rounded-md font-black hover:bg-gray-500/50 transition border border-white/10">
            <FaInfoCircle size={20}/>
          </button>
        </div>
      </div>

      {/* 3. Bottom Gradient for Smooth Transition to Rows */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>

      {/* Video Player Integration */}
      {showPlayer && (
        <VideoPlayer 
          url={movie.videoUrl} 
          title={movie.title} 
          onClose={() => setShowPlayer(false)} 
        />
      )}
    </div>
  );
}

export default HeroBanner;