import { Link } from "react-router-dom";
import { FaPlay, FaStar } from "react-icons/fa";

function MediaCard({ id, title, image, type, rating = "8.5" }) {
  return (
    <Link to={type === "series" ? `/show/${id}` : `/movie/${id}`}  className="group block relative">
      <div className="relative bg-[#111] rounded-xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:ring-1 group-hover:ring-white/20">
        
        {/* 1. Image Container with Overlay */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          
          {/* Top Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            <span className="bg-black/60 backdrop-blur-md text-[10px] font-black text-white px-2 py-0.5 rounded border border-white/10 uppercase tracking-tighter">
              {type}
            </span>
          </div>

          {/* Right Top Rating */}
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="flex items-center gap-1 bg-yellow-500 text-black px-1.5 py-0.5 rounded text-[10px] font-bold shadow-lg">
                <FaStar size={8} /> {rating}
             </div>
          </div>

          {/* Cinematic Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-red-600 p-4 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-90 group-hover:scale-100 transition-transform duration-500">
                  <FaPlay className="text-white ml-1" size={18} />
                </div>
            </div>
          </div>
        </div>

        {/* 2. Content Section */}
        <div className="p-4 bg-gradient-to-b from-[#181818] to-[#111] border-t border-white/5 relative">
          {/* Progress Bar Placeholder (Just for aesthetic) */}
          <div className="absolute top-0 left-0 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-700"></div>
          
          <h3 className="font-bold text-sm text-gray-200 group-hover:text-white truncate transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
              Standard 4K
            </span>
            <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
            <span className="text-[10px] text-red-500 font-bold">
              New Release
            </span>
          </div>
        </div>
      </div>
      
      {/* Background Glow Effect on Hover */}
      <div className="absolute -inset-2 bg-red-600/5 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </Link>
  );
}

export default MediaCard;