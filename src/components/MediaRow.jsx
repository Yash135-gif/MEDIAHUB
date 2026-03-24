import { useRef, useState } from "react";
import MediaCard from "./MediaCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function MediaRow({ title, items, search, isHistory }) {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);



  // Search logic
  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const onScrollUpdate = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 10);
    }
  };

  if (filtered.length === 0) return null;
  
  return (
    <div className="mb-12 group/row relative">
      {/* 1. Header Section */}
      <div className="flex items-end justify-between px-6 md:px-12 mb-4">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-gray-200 group-hover/row:text-white transition-colors">
          {title} <span className="text-red-600">.</span>
        </h2>
        {!search && (
          <button className="text-xs font-bold text-gray-500 hover:text-red-500 transition uppercase tracking-widest">
            Explore All
          </button>
        )}
      </div>

      {/* 2. Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Left Control */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-black/60 backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-all duration-300 flex items-center justify-center text-white hover:bg-black/80"
          >
            <FaChevronLeft size={24} className="hover:scale-125 transition" />
          </button>
        )}

        {/* Right Control */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-black/60 backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-all duration-300 flex items-center justify-center text-white hover:bg-black/80"
        >
          <FaChevronRight size={24} className="hover:scale-125 transition" />
        </button>

        {/* The Scrollable Row */}
        <div
          ref={rowRef}
          onScroll={onScrollUpdate}
          className="flex overflow-x-auto gap-4 md:gap-6 px-6 md:px-12 no-scrollbar scroll-smooth"
        >
          {filtered.map((item) => (
            <div key={item.id} className="min-w-[150px] sm:min-w-[180px] md:min-w-[220px] pb-6">
              <div className="relative group">
                <MediaCard
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  type={item.isSeries}
                />
                
                {/* 3. Progress Bar Integrated (Cleaner Version) */}
                {isHistory && (
                  <div className="absolute -bottom-1 left-0 w-full px-1">
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-red-800 to-red-500 shadow-[0_0_8px_#ef4444]" 
                        style={{ width: `${item.progress || 35}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Row Decorative Line (Optional for 'Bestest' look) */}
      <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </div>
  );
}

export default MediaRow;