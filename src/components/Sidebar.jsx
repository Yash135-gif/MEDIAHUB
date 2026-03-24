import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  FaHome, 
  FaFilm, 
  FaMusic, 
  FaTv,
  FaBook, 
  FaPodcast, 
  FaUser, 
  FaLayerGroup,
  FaHeart
} from "react-icons/fa";

function Sidebar() {
  const { watchlist } = useSelector((state) => state.media);
  const location = useLocation();

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Movies", path: "/movies", icon: <FaFilm /> },
    { name: "Tv-Shows", path: "/tv-shows", icon: <FaTv /> },
    { name: "Music", path: "/music", icon: <FaMusic /> },
    { name: "Books", path: "/books", icon: <FaBook /> },
    { name: "Podcasts", path: "/podcasts", icon: <FaPodcast /> },
  ];

  return (
    <div className="h-full flex flex-col bg-[#050505] text-gray-400 p-6 select-none">
      
      {/* 1. Browse Section */}
      <div className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-6 px-4">
          Browse Media
        </h3>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-300 group ${
                  isActive(item.path)
                    ? "bg-red-600/10 text-red-500 shadow-[inset_0_0_20px_rgba(220,38,38,0.05)]"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
                  isActive(item.path) ? "text-red-500" : "text-gray-500 group-hover:text-red-400"
                }`}>
                  {item.icon}
                </span>
                <span className="text-sm tracking-wide">{item.name}</span>
                {isActive(item.path) && (
                  <div className="ml-auto w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626]"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Personal Section */}
      <div className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-6 px-4">
          Your Collection
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/library"
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-300 group ${
                isActive("/library")
                  ? "bg-red-600/10 text-red-500"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <FaLayerGroup className={`${isActive("/library") ? "text-red-500" : "text-gray-500 group-hover:text-red-400"}`} />
              <span className="text-sm tracking-wide">My Library</span>
              
              {watchlist?.length > 0 && (
                <div className="ml-auto flex items-center justify-center bg-red-600 text-white text-[10px] font-black h-5 min-w-[20px] px-1.5 rounded-md shadow-[0_4px_10px_rgba(220,38,38,0.4)]">
                  {watchlist.length}
                </div>
              )}
            </Link>
          </li>
          
          <li>
            <Link
              to="/profile"
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-300 group ${
                isActive("/profile")
                  ? "bg-red-600/10 text-red-500"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <FaUser className={`${isActive("/profile") ? "text-red-500" : "text-gray-500 group-hover:text-red-400"}`} />
              <span className="text-sm tracking-wide">Profile Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* 3. Footer Banner (The 'Bestest' Touch) */}
      <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-red-900/20 to-transparent border border-white/5">
        <p className="text-[10px] text-gray-500 font-medium mb-2">Upgrade to</p>
        <h4 className="text-white font-black text-sm mb-3">MEDIAHUB PRO</h4>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-black py-2 rounded-lg transition-all active:scale-95 shadow-lg shadow-red-900/20">
          GET ACCESS
        </button>
      </div>

    </div>
  );
}

export default Sidebar;
