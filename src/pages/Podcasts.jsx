import { useEffect, useState } from "react";
import { getPodcasts } from "../services/mediaService";
import { useDispatch, useSelector } from "react-redux";
import { setTrack } from "../store/playerSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaPlay, FaPodcast, FaInfoCircle, FaChevronRight } from "react-icons/fa";
import Loader from "../components/Loader";

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.player.currentTrack);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const data = await getPodcasts();
        setPodcasts(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  if (loading) return <Loader fullScreen={true} />;

  return (
    <div className="max-w-[1400px] mx-auto pb-24 px-4 md:px-8">
      
      {/* 1. Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
           <FaMicrophone className="text-red-600 animate-pulse" size={20} />
           <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600">On Air</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
          Studio <span className="text-red-600">Sessions</span>
        </h1>
      </div>

      {/* 2. Featured Podcast (Big Banner Style) */}
      {podcasts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden mb-16 border border-white/5 shadow-2xl group"
        >
          <img 
            src={podcasts[0].image} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt="Featured" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Featured Episode</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 line-clamp-2">{podcasts[0].title}</h2>
            <p className="text-gray-300 max-w-xl mb-6 line-clamp-2 italic">Hosted by {podcasts[0].host}</p>
            <button 
              onClick={() => dispatch(setTrack(podcasts[0]))}
              className="bg-white text-black px-8 py-3 rounded-full font-black flex items-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95"
            >
              <FaPlay size={12} /> LISTEN NOW
            </button>
          </div>
        </motion.div>
      )}

      {/* 3. Podcasts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {podcasts.map((podcast) => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ y: -10 }}
            key={podcast.id}
            className={`relative group bg-white/5 p-5 rounded-[2rem] border border-white/5 transition-all hover:bg-white/10 hover:border-red-600/30 ${
              currentTrack?.id === podcast.id ? "ring-2 ring-red-600 ring-offset-4 ring-offset-black" : ""
            }`}
          >
            {/* Image Container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-5">
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
              />
              <button 
                onClick={() => dispatch(setTrack(podcast))}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="bg-red-600 p-4 rounded-full text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <FaPlay size={20} />
                </div>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1">
                  <FaPodcast /> Episode
                </span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">45 Min</span>
              </div>
              <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-red-500 transition-colors">
                {podcast.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium">with {podcast.host}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. Explore More Label */}
      <div className="mt-20 flex justify-center">
        <button className="flex items-center gap-3 text-gray-500 hover:text-white font-bold tracking-widest uppercase text-xs transition">
          View All Podcast Series <FaChevronRight size={10} />
        </button>
      </div>
    </div>
  );
}

export default Podcasts;