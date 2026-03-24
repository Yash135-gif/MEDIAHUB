import { FaTimes, FaExpand, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // Animation ke liye

function VideoPlayer({ url, onClose, title }) {


  console.log(url);
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-sm flex flex-col items-center justify-center"
      >
        {/* 1. Header Area - Animates in and out */}
        <motion.div 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="absolute top-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center z-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-red-600 rounded-full shadow-[0_0_15px_#dc2626]"></div>
            <div>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Now Playing</p>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="group flex items-center gap-2 bg-white/5 hover:bg-red-600 px-4 py-2 rounded-full transition-all duration-300 border border-white/10"
          >
            <span className="text-xs font-bold text-white group-hover:block hidden md:block">Close Theater</span>
            <FaTimes size={18} className="text-white" />
          </button>
        </motion.div>

        {/* 2. Main Player Container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-[95vw] lg:max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.15)] border border-white/10 bg-black"
        >
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-red-600/5 blur-3xl -z-10"></div>

          <video
  src={url}
  controls
  autoPlay
  className="w-full h-full object-cover"
  controlsList="nodownload"
>
  Your browser does not support the video tag.
</video>
        </motion.div>

        {/* 3. Footer Branding / Info */}
        <div className="absolute bottom-6 flex items-center gap-6 text-gray-500 text-xs font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span>4K Ultra HD</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-800"></div>
          <div className="flex items-center gap-2">
            <FaInfoCircle />
            <span>Surround Sound 5.1</span>
          </div>
        </div>

        {/* Background Overlay - Click to close */}
        <div 
          className="absolute inset-0 -z-20 cursor-zoom-out" 
          onClick={onClose}
        ></div>
      </motion.div>
    </AnimatePresence>
  );
}

export default VideoPlayer;