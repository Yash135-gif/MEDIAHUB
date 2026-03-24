import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { upsertContinueWatching } from "../services/mediaService";
import { addToWatchlistThunk } from "../store/mediaSlice";
import MediaCard from "../components/MediaCard";
import Loader from "../components/Loader";
import VideoPlayer from "../components/VideoPlayer";
import { FaArrowLeft, FaPlay, FaPlus, FaStar, FaCheck, FaShareAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(null);
  const [similarShows, setSimilarShows] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);

  const { watchlist } = useSelector((state) => state.media);
  const isAdded = watchlist.some((m) => m.id === id);

  useEffect(() => {
    const fetchShowAndSimilar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/tvshows/${id}`);
        setShow(res.data);

        const allShowsRes = await axios.get(`http://localhost:5000/tvshows`);
        const filtered = allShowsRes.data.filter(
          (s) => s.genre === res.data.genre && s.id !== id
        );
        setSimilarShows(filtered);

      } catch (error) {
        console.error("Error fetching show:", error);
        toast.error("Show load nahi ho paaya!");
      } finally {
        setLoading(false);
      }
    };

    fetchShowAndSimilar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleAddToWatchlist = () => {
    if (!isAdded) {
      dispatch(addToWatchlistThunk(show));
      toast.success(`${show.title} added to watchlist!`);
    }
  };

  const handleWatch = async () => {
    await upsertContinueWatching(show);
    setShowPlayer(true);
  };

  if (loading) return <Loader fullScreen={true} />;
  if (!show) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050505] text-white relative"
    >

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-[70vh] z-0 overflow-hidden">
        <img
          src={show.image}
          className="w-full h-full object-cover opacity-20 blur-sm scale-110"
          alt="backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-20">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 mb-10 text-gray-400 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md"
        >
          <FaArrowLeft />
          <span className="text-sm font-bold uppercase tracking-widest">Explore More</span>
        </button>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Poster */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-4"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img src={show.image} alt={show.title} />
            </div>
          </motion.div>

          {/* Show Info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-8"
          >

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-600 px-3 py-1 rounded-md text-[10px] font-black uppercase">
                TV Series
              </span>
              <span className="text-gray-400 text-sm font-bold">{show.year}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6">
              {show.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm mb-8 items-center">
              <div className="flex items-center gap-2 text-yellow-500">
                <FaStar />
                <span className="font-black text-lg">{show.rating}</span>
              </div>

              <span className="text-gray-300 font-bold uppercase">
                {show.seasons} Seasons
              </span>

              <span className="text-red-500 font-black uppercase">
                {show.genre}
              </span>
            </div>

            <p className="text-lg text-gray-400 mb-10">
              {show.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleWatch}
                className="flex items-center gap-3 bg-red-600 px-10 py-4 rounded-2xl font-black hover:bg-red-700"
              >
                <FaPlay /> Watch Now
              </button>

              <button
                onClick={handleAddToWatchlist}
                disabled={isAdded}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl border ${
                  isAdded ? "text-green-500" : "text-white"
                }`}
              >
                {isAdded ? <><FaCheck /> In Watchlist</> : <><FaPlus /> Watchlist</>}
              </button>

              <button className="p-4 rounded-2xl border">
                <FaShareAlt />
              </button>
            </div>

          </motion.div>
        </div>

        {/* Similar Shows */}
        {similarShows.length > 0 && (
          <div className="mt-32">
            <h3 className="text-3xl font-black mb-10">More Like This</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              {similarShows.map((s) => (
                <MediaCard key={s.id} {...s} type="show" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Player */}
      <AnimatePresence>
        {showPlayer && (
          <VideoPlayer
            url={show.videoUrl || "/trailers/show1.mp4"}
            title={show.title}
            onClose={() => setShowPlayer(false)}
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default ShowDetails;