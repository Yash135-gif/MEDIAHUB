import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWatchlist, removeFromWatchlistThunk } from "../store/mediaSlice";
import { getContinueWatching } from "../services/mediaService";
import MediaCard from "../components/MediaCard";
import { FaTrash, FaHistory, FaBookmark, FaLayerGroup } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function Library() {
  const dispatch = useDispatch();
  const { watchlist } = useSelector((state) => state.media);
  const [continueWatching, setContinueWatching] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchWatchlist());
      await loadHistory();
      setLoading(false);
    };
    init();
  }, [dispatch]);

  const loadHistory = async () => {
    const data = await getContinueWatching();
    setContinueWatching(data);
  };

  const handleRemove = (id, title) => {
    dispatch(removeFromWatchlistThunk(id));
    toast.error(`${title} removed from watchlist`);
  };

  if (loading) return null; // Section handles loading internally or via Layout

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1400px] mx-auto pb-20 space-y-16"
    >
      {/* 1. Page Header */}
      <header className="border-b border-white/5 pb-8">
        <h1 className="text-4xl font-black text-white flex items-center gap-4">
          <FaLayerGroup className="text-red-600" size={32} />
          Your <span className="text-red-600">Collection</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium italic">Everything you've saved and started, all in one place.</p>
      </header>

      {/* 2. Continue Watching Section */}
      <section className="relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-200 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_15px_#dc2626]"></div>
            Resume Playing
          </h2>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{continueWatching.length} Items</span>
        </div>

        {continueWatching.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {continueWatching.map((movie) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={movie.id} 
                className="relative group rounded-xl overflow-hidden"
              >
                <MediaCard {...movie} type={movie.genre || "Movie"} />
                {/* Visual Progress Bar Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-900/80">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${movie.progress || 35}%` }}
                    className="h-full bg-gradient-to-r from-red-800 to-red-500 shadow-[0_0_10px_#dc2626]"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState icon={<FaHistory />} message="No recent activity. Start exploring!" />
        )}
      </section>

      {/* 3. My Watchlist Section */}
      <section className="relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-200 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_15px_#dc2626]"></div>
            Your Watchlist
          </h2>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{watchlist.length} Saved</span>
        </div>

        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            <AnimatePresence>
              {watchlist.map((movie) => (
                <motion.div
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  key={movie.id}
                  className="relative group"
                >
                  <MediaCard {...movie} type={movie.genre || "Movie"} />
                  
                  {/* Premium Remove Button */}
                  <button
                    onClick={() => handleRemove(movie.id, movie.title)}
                    className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-md p-2.5 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 text-white shadow-xl translate-y-2 group-hover:translate-y-0"
                  >
                    <FaTrash size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState icon={<FaBookmark />} message="Your watchlist is waiting for some action." />
        )}
      </section>
    </motion.div>
  );
}

// Reusable Empty State Component
function EmptyState({ icon, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
      <div className="text-4xl text-gray-700 mb-4">{icon}</div>
      <p className="text-gray-500 font-medium tracking-wide">{message}</p>
    </div>
  );
}

export default Library;