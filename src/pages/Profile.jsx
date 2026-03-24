import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { FaBookmark, FaPlayCircle, FaSignOutAlt, FaShieldAlt, FaBell, FaChevronRight, FaGem } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Profile() {
  const { userInfo } = useSelector((state) => state.user);
  const { watchlist } = useSelector((state) => state.media);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.error("Logged out successfully");
  };

  if (!userInfo) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <FaGem className="text-6xl mb-4 opacity-10" />
        <p className="text-xl font-bold tracking-widest">JOIN THE ELITE</p>
        <p className="text-sm">Please login to access your vault.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto py-12 px-4"
    >
      {/* 1. Profile Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden mb-10">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 blur-xl opacity-30 rounded-full animate-pulse"></div>
            <img 
              src={userInfo.avatar} 
              alt="User Avatar" 
              className="relative w-40 h-40 rounded-full border-4 border-red-600 object-cover shadow-2xl"
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h1 className="text-5xl font-black tracking-tighter text-white">
                {userInfo.name.split(' ')[0]} <span className="text-red-600 font-light">{userInfo.name.split(' ')[1] || ""}</span>
              </h1>
              <span className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-600 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                <FaGem /> Premium
              </span>
            </div>
            <p className="text-gray-400 font-medium mb-6 italic">{userInfo.email}</p>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 bg-white/5 hover:bg-red-600 text-white px-8 py-3 rounded-2xl transition-all font-black uppercase text-xs tracking-widest border border-white/10 active:scale-95 shadow-xl"
            >
              <FaSignOutAlt /> Terminate Session
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="group bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-red-600/30 transition-all">
          <div className="flex items-center gap-6">
            <div className="bg-red-600/20 p-5 rounded-2xl text-red-500 text-3xl group-hover:scale-110 transition-transform shadow-inner">
              <FaBookmark />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Watchlist Size</p>
              <p className="text-4xl font-black text-white">{watchlist.length}</p>
            </div>
          </div>
        </div>

        <div className="group bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:border-red-600/30 transition-all">
          <div className="flex items-center gap-6">
            <div className="bg-green-600/20 p-5 rounded-2xl text-green-500 text-3xl group-hover:scale-110 transition-transform">
              <FaPlayCircle />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Streaming Now</p>
              <p className="text-4xl font-black text-white">4K <span className="text-sm text-gray-600">Active</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Futuristic Settings List */}
      <div className="bg-white/5 rounded-[2.5rem] border border-white/5 overflow-hidden backdrop-blur-md">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-tighter">Vault Control</h2>
          <FaShieldAlt className="text-gray-600" />
        </div>
        
        <div className="p-4 space-y-2">
          <SettingItem icon={<FaShieldAlt className="text-blue-500" />} label="Security & Privacy" sub="Change password & 2FA" />
          <SettingItem icon={<FaBell className="text-yellow-500" />} label="Notification Engine" sub="Manage alerts & emails" />
          
          <div className="mt-4 pt-4 border-t border-white/5 px-4 flex justify-between items-center group cursor-pointer">
            <span className="text-red-500/60 group-hover:text-red-500 transition font-bold text-sm uppercase tracking-widest">Danger Zone: Delete My Vault</span>
            <div className="w-8 h-8 rounded-full bg-red-900/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition">
              <FaChevronRight size={10} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Sub-component for clean code
function SettingItem({ icon, label, sub }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 cursor-pointer group transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <p className="text-white font-bold group-hover:text-red-500 transition">{label}</p>
          <p className="text-xs text-gray-500">{sub}</p>
        </div>
      </div>
      <FaChevronRight className="text-gray-700 group-hover:text-white transition group-hover:translate-x-1" />
    </div>
  );
}

export default Profile;