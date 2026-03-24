import { motion } from "framer-motion"; // Optional: Animation ke liye

function Section({ title, children, layout = "grid", viewAllLink = "#" }) {
  return (
    <section className="mb-14 px-4 md:px-8 group/section">
      
      {/* 1. Section Header with Accent */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Vertical Red Accent Line */}
          <div className="w-1.5 h-8 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
          
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover/section:translate-x-1 transition-transform duration-300">
            {title}
          </h2>
        </div>

        {/* 2. "See More" Link with Animation */}
        <a 
          href={viewAllLink}
          className="text-xs font-bold text-gray-500 hover:text-red-500 transition-all duration-300 uppercase tracking-[0.2em] flex items-center gap-2 group/link"
        >
          View All 
          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      {/* 3. Dynamic Content Container */}
      {layout === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {children}
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6">
          {children}
        </div>
      )}

      {/* 4. Bottom Divider (Subtle) */}
      <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </section>
  );
}

export default Section;