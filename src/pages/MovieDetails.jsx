import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { upsertContinueWatching } from "../services/mediaService";
import { addToWatchlistThunk } from "../store/mediaSlice";
import MediaCard from "../components/MediaCard";
import Loader from "../components/Loader";
import VideoPlayer from "../components/VideoPlayer";
import { FaArrowLeft, FaPlay, FaPlus, FaStar, FaCheck, FaShareAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);

  const { watchlist } = useSelector((state) => state.media);
  const isAdded = watchlist.some((m) => m.id === id);

  useEffect(() => {
    const fetchMovieAndSimilar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/movies/${id}`);
        setMovie(res.data);

        const allMoviesRes = await axios.get(`http://localhost:5000/movies`);
        const filtered = allMoviesRes.data.filter(
          (m) => m.genre === res.data.genre && m.id !== id
        );
        setSimilarMovies(filtered);
      } catch (error) {
        console.error("Error fetching movie:", error);
        toast.error("Movie load nahi ho paayi!");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndSimilar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleAddToWatchlist = () => {
    if (!isAdded) {
      dispatch(addToWatchlistThunk(movie));
      toast.success(`${movie.title} added to watchlist!`, {
        style: { borderRadius: '10px', background: '#111', color: '#fff', border: '1px solid #333' },
      });
    }
  };

  const handleWatch = async () => {
    await upsertContinueWatching(movie);
    setShowPlayer(true);
  };

  if (loading) return <Loader fullScreen={true} />;
  if (!movie) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-[#050505] text-white relative"
    >
      {/* 1. Large Background Hero Backdrop */}
      <div className="absolute top-0 left-0 w-full h-[70vh] z-0 overflow-hidden">
        <img 
          src={movie.image} 
          className="w-full h-full object-cover opacity-20 blur-sm scale-110" 
          alt="backdrop" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-20">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 mb-10 text-gray-400 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-sm font-bold uppercase tracking-widest">Explore More</span>
        </button>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* 2. Poster Section */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-4"
          >
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl shadow-black/50 border border-white/10">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>

          {/* 3. Movie Info Section */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-8 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
               <span className="bg-red-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter">Premium 4K</span>
               <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
               <span className="text-gray-400 text-sm font-bold">{movie.year}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-sm mb-8 items-center bg-white/5 w-fit p-4 rounded-2xl border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-yellow-500">
                <FaStar className="drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" /> 
                <span className="font-black text-lg">{movie.rating}</span>
              </div>
              <div className="w-[1px] h-6 bg-white/10"></div>
              <span className="text-gray-300 font-bold uppercase tracking-widest">{movie.duration}</span>
              <div className="w-[1px] h-6 bg-white/10"></div>
              <span className="text-red-500 font-black uppercase tracking-widest">{movie.genre}</span>
            </div>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-3xl italic">
              "{movie.description}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleWatch}
                className="flex items-center gap-3 bg-red-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95 shadow-[0_10px_30px_rgba(220,38,38,0.3)]"
              >
                <FaPlay size={14} /> Watch Now
              </button>
              
              <button
                onClick={handleAddToWatchlist}
                disabled={isAdded}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest border-2 transition-all active:scale-95 ${
                  isAdded 
                  ? "border-green-500/50 text-green-500 bg-green-500/5" 
                  : "border-white/10 hover:bg-white hover:text-black hover:border-white text-white"
                }`}
              >
                {isAdded ? <><FaCheck /> In Watchlist</> : <><FaPlus /> Watchlist</>}
              </button>

              <button className="p-4 rounded-2xl border-2 border-white/10 hover:bg-white/10 transition-all text-gray-400 hover:text-white">
                 <FaShareAlt />
              </button>
            </div>
          </motion.div>
        </div>

        {/* 4. Similar Content Row */}
        {similarMovies.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-8 bg-red-600 rounded-full shadow-[0_0_20px_#dc2626]"></div>
              <h3 className="text-3xl font-black tracking-tighter">More Like This</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {similarMovies.map((m) => (
                <MediaCard key={m.id} {...m} type="Movie" />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Video Player Portal */}
      <AnimatePresence>
        {showPlayer && (
          <VideoPlayer 
            url={movie.videoUrl || "/trailers/movie1.mp4"}
            title={movie.title}
            onClose={() => setShowPlayer(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MovieDetails;