import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/searchSlice";
import { logout } from "../store/userSlice";
import { FaSearch, FaRegBell, FaCaretDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const query = useSelector((state) => state.search.query);
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);

  // Scroll effect for transparency change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 py-4 flex items-center justify-between ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3" 
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      {/* Left: Logo & Links */}
      <div className="flex items-center gap-8">
        <Link 
          to="/" 
          className="text-3xl font-black tracking-tighter text-red-600 hover:scale-105 transition-transform"
        >
          MEDIA<span className="text-white">HUB</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          {["Home", "Movies", "Music", "Books", "Podcasts"].map((item) => (
            <Link 
              key={item} 
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-lg mx-8 group">
        <div className={`flex items-center bg-white/10 px-4 py-2 rounded-lg border border-transparent transition-all duration-300 group-focus-within:bg-black group-focus-within:border-red-600 group-focus-within:ring-2 group-focus-within:ring-red-600/20`}>
          <FaSearch className="text-gray-400 group-focus-within:text-red-600 transition-colors" />
          <input
            type="text"
            placeholder="Search titles, artists, genres..."
            className="bg-transparent outline-none w-full text-sm text-white px-3 placeholder:text-gray-500"
            value={query}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-6">
        <FaRegBell className="text-xl text-gray-300 cursor-pointer hover:text-white transition hidden sm:block" />
        
        {isLoggedIn ? (
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={userInfo?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                className="w-9 h-9 rounded-md border-2 border-transparent group-hover:border-red-600 transition-all object-cover"
                alt="profile"
              />
              <FaCaretDown className={`text-gray-400 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`} />
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-black/95 border border-white/10 rounded-lg shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-bold truncate">{userInfo?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{userInfo?.email}</p>
                </div>
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition"
                  onClick={() => setShowDropdown(false)}
                >
                  My Profile
                </Link>
                <Link 
                  to="/library" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition"
                  onClick={() => setShowDropdown(false)}
                >
                  My List
                </Link>
                <button
                  onClick={() => {
                    dispatch(logout());
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-600/10 transition border-t border-white/10"
                >
                  Sign Out of MediaHub
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-red-600 text-white px-5 py-2 rounded text-sm font-bold hover:bg-red-700 transition active:scale-95"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;