import { useEffect, useState } from "react";
import { getMovies, getContinueWatching,getTvShows } from "../services/mediaService";
import HeroBanner from "../components/HeroBanner";
import MediaRow from "../components/MediaRow";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

function Home() {

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomHero, setRandomHero] = useState(null);
  
  const query = useSelector((state) => state.search.query);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [movieData, continueData,tvShows] = await Promise.all([
          getMovies(),
          getContinueWatching(),
          getTvShows()
        ]);
        
        setMovies(movieData);
        setContinueWatching(continueData);
        setTvShows(tvShows)
        
        // Pick a random movie for HeroBanner to keep it fresh
        if (movieData.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(movieData.length, 5));
          setRandomHero(movieData[randomIndex]);
        }
      } catch (error) {
        console.error("Home Data Loading Error:", error);
      } finally {
        // Thoda extra delay real feel ke liye (Optional)
        setTimeout(() => setLoading(false), 800);
      }
    };
    loadData();
  }, []);




  const getByGenre = (genre) => movies.filter(m => m.genre === genre);
  const getByGenreTv = (genre) => tvShows.filter(m => m.isSeries === genre);

  if (loading) return <Loader fullScreen={true} />;

  

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pb-24 bg-[#050505] min-h-screen overflow-x-hidden"
    >
      {/* 1. Cinematic Hero Section */}
      {!query && randomHero && (
        <section className="relative">
          <HeroBanner movie={randomHero} />
          {/* Bottom Fade: Row aur Banner ka seamless transition */}
          <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-20" />
        </section>
      )}

      {/* 2. Content Rows Container */}
      <div 
        className={`relative z-30 transition-all duration-700 ${
          !query ? "-mt-32 md:-mt-48 px-2 md:px-4" : "pt-24 px-6 md:px-12"
        }`}
      >
        {/* Continue Watching - High Priority */}
        {!query && continueWatching.length > 0 && (
          <motion.div 
            initial={{ x: 50, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <MediaRow 
              title="Resume Your Journey" 
              items={continueWatching} 
              search={query} 
              isHistory={true} 
            />
          </motion.div>
        )}

        {/* Dynamic Main Row */}
        <MediaRow 
          title={query ? `Search Results for "${query}"` : "Trending Now"} 
          items={movies} 
          search={query} 
        />

        {/* Genre Based Rows with staggered-like feel */}
        {!query && (
          <div className="space-y-6 md:space-y-12 mt-8">
            <MediaRow title="Action Blockbusters" items={getByGenre("Action")} search={query} />
            
            {/* Mid-Page Promotion (Bestest Touch) */}
            <div className="py-10 my-10 bg-gradient-to-r from-red-900/20 via-transparent to-transparent border-y border-white/5 px-8 flex items-center justify-between">
               <div>
                  <h3 className="text-2xl font-black text-white">Unlimited Entertainment</h3>
                  <p className="text-gray-400 text-sm mt-1">Exclusive originals and global hits only on MediaHub.</p>
               </div>
               <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs hover:bg-red-600 hover:text-white transition">
                  Explore Plus
               </button>
            </div>

            <MediaRow title="Mind-Bending Sci-Fi" items={getByGenre("Sci-Fi")} search={query} />
            <MediaRow title="Critically Acclaimed Drama" items={getByGenre("Drama")} search={query} />
            <MediaRow title="Binge-Worthy Series" items={getByGenreTv("series")} search={query} />
          </div>
        )}

        {/* 3. Empty State for Search */}
        {query && movies.filter(m => m.title.toLowerCase().includes(query.toLowerCase())).length === 0 && (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-400">No results found for "{query}"</h3>
            <p className="text-gray-600 mt-2">Try searching for something else like "Interstellar" or "Batman".</p>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      {!query && (
        <div className="mt-20 py-10 border-t border-white/5 flex flex-col items-center">
           <h2 className="text-white/10 text-6xl md:text-9xl font-black select-none">MEDIAHUB</h2>
        </div>
      )}
    </motion.div>
  );
}

export default Home;