import { useEffect, useState } from "react";
import MediaCard from "../components/MediaCard";
import { getTvShows } from "../services/mediaService";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTv } from "react-icons/fa";

function TvShows() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getTvShows();
        setShows(data);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  const filteredShows = shows.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader fullScreen={true} />;

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaTv className="text-red-600" />
            <span className="text-xs font-black uppercase tracking-widest text-red-600">Binge Worthy</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">TV <span className="text-red-600">Shows</span></h1>
        </div>

        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search shows..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-red-600/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        <AnimatePresence>
          {filteredShows.map((show) => (
            <motion.div key={show.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MediaCard id={show.id} title={show.title} image={show.image} type={show.isSeries} genre={show.genre}  />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default TvShows;