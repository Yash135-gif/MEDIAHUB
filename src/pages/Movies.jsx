import { useEffect, useState } from "react";
import MediaCard from "../components/MediaCard";
import { getMovies } from "../services/mediaService";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", "Action", "Sci-Fi", "Drama", "Thriller", "Adventure"];

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
    } finally {
      setLoading(false);
    }
  };

  // Logic to handle both Search and Genre Filter
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  if (loading) return <Loader fullScreen={true} />;

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      
      {/* 1. Page Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Cinema <span className="text-red-600">World</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Explore the greatest stories ever told.</p>
        </div>

        {/* Professional Search Input */}
        <div className="relative w-full md:w-80 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition" />
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-red-600/50 focus:bg-white/10 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Genre Chips (Netflix Style) */}
      <div className="flex items-center gap-4 mb-10 overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-2 text-gray-500 mr-2 border-r border-white/10 pr-4">
          <FaFilter size={14} />
          <span className="text-xs font-bold uppercase tracking-widest">Filter</span>
        </div>
        
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
              selectedGenre === genre
                ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* 3. Results Info */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">
          Showing <span className="text-white font-bold">{filteredMovies.length}</span> movies
        </p>
        <div className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-white transition">
           <FaSortAmountDown size={14} />
           <span className="text-xs font-bold uppercase">Popularity</span>
        </div>
      </div>

      {/* 4. Movies Grid with Animation */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8"
      >
        <AnimatePresence>
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <MediaCard
                id={movie.id}
                title={movie.title}
                image={movie.image}
                type="Movie"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredMovies.length === 0 && (
        <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <div className="text-5xl mb-4 text-gray-700">🎬</div>
          <h2 className="text-xl font-bold text-gray-400">No movies found matching your criteria</h2>
          <p className="text-gray-600 mt-2">Try clearing filters or searching for something else.</p>
          <button 
            onClick={() => {setSearch(""); setSelectedGenre("All")}}
            className="mt-6 text-red-500 font-bold hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Movies;