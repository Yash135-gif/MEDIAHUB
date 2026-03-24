import { useEffect, useState } from "react";
import { getMusic } from "../services/mediaService";
import { useDispatch, useSelector } from "react-redux";
import { setTrack } from "../store/playerSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaMusic, FaClock, FaMicrophone } from "react-icons/fa";
import Loader from "../components/Loader";

function Music() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useSelector((state) => state.search.query);
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getMusic();
        setSongs(data);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <Loader fullScreen={true} />;

  return (
    <div className="max-w-7xl mx-auto pb-32">
      {/* 1. Header with Glassmorphism */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end gap-6 bg-gradient-to-b from-red-900/20 to-transparent p-8 rounded-3xl border border-white/5">
        <div className="w-48 h-48 shadow-2xl rounded-2xl overflow-hidden bg-gray-800 flex items-center justify-center">
           {filteredSongs.length > 0 ? (
             <img src={filteredSongs[0].image} className="w-full h-full object-cover" alt="Playlist" />
           ) : (
             <FaMusic className="text-4xl text-gray-600" />
           )}
        </div>
        <div className="flex-1">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-red-500 mb-2">Playlist</p>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">Discover <span className="text-red-600">Audio</span></h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
            <span className="text-white">MediaHub Music</span> • {filteredSongs.length} Songs • 2026
          </div>
        </div>
      </header>

      {/* 2. Track List Header (Table Style) */}
      <div className="hidden md:grid grid-cols-[50px_1fr_1fr_100px] gap-4 px-6 py-3 border-b border-white/5 text-gray-500 text-xs font-black uppercase tracking-widest mb-4">
        <span>#</span>
        <span>Title</span>
        <span>Artist</span>
        <span className="flex justify-end"><FaClock /></span>
      </div>

      {/* 3. Song Rows */}
      <div className="space-y-1">
        <AnimatePresence>
          {filteredSongs.map((song, index) => {
            const isPlaying = currentTrack?.id === song.id;
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={song.id}
                onClick={() => dispatch(setTrack(song))}
                className={`group grid grid-cols-[60px_1fr_100px] md:grid-cols-[50px_1fr_1fr_100px] gap-4 items-center px-4 md:px-6 py-3 rounded-xl transition-all cursor-pointer ${
                  isPlaying ? "bg-red-600/10" : "hover:bg-white/5"
                }`}
              >
                {/* Number / Play Icon */}
                <div className="text-sm font-bold flex items-center justify-center">
                  {isPlaying ? (
                    <div className="flex gap-0.5 items-end h-3">
                      <div className="w-1 bg-red-500 animate-[music-bar_0.6s_ease-in-out_infinite]"></div>
                      <div className="w-1 bg-red-500 animate-[music-bar_0.8s_ease-in-out_infinite_0.1s]"></div>
                      <div className="w-1 bg-red-500 animate-[music-bar_1s_ease-in-out_infinite_0.2s]"></div>
                    </div>
                  ) : (
                    <span className="group-hover:hidden text-gray-600">{index + 1}</span>
                  )}
                  <FaPlay className={`${isPlaying ? "hidden" : "hidden group-hover:block"} text-white text-xs`} />
                </div>

                {/* Title & Image */}
                <div className="flex items-center gap-4 overflow-hidden">
                  <img src={song.image} className="w-12 h-12 rounded-lg object-cover shadow-lg" alt="" />
                  <div className="truncate">
                    <h3 className={`font-bold text-sm md:text-base truncate ${isPlaying ? "text-red-500" : "text-white"}`}>
                      {song.title}
                    </h3>
                    <p className="text-xs text-gray-500 md:hidden flex items-center gap-1">
                      <FaMicrophone size={10} /> {song.artist}
                    </p>
                  </div>
                </div>

                {/* Artist (Desktop Only) */}
                <div className="hidden md:flex items-center gap-2 text-gray-400 font-medium group-hover:text-gray-200 transition">
                   <FaMicrophone size={12} className="text-red-900/50" />
                   <span className="truncate">{song.artist}</span>
                </div>

                {/* Duration */}
                <div className="text-right text-xs font-bold text-gray-500 group-hover:text-gray-300">
                  {song.duration || "3:45"}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredSongs.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-gray-600 font-black text-xl uppercase tracking-tighter">No tracks found for "{query}"</p>
        </div>
      )}
    </div>
  );
}

export default Music;