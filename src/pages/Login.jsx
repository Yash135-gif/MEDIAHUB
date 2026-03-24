import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !name) {
      return toast.error("Bhai, saari details toh bharo!");
    }

    setIsLoading(true);
    
    // Simulating API Delay
    setTimeout(() => {
      dispatch(login({ 
        name, 
        email, 
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` 
      }));
      toast.success(`Swagat hai, ${name}!`);
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* 1. Background Cinematic Poster Wall (Blurred) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 scale-110"
        style={{
          backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-07e3f8eb1468/31705140-c302-46a4-839a-7634f19b2241/IN-en-20220502-popsignuptwoweeks-perspective_alpha_website_large.jpg')`,
          backgroundSize: 'cover',
          filter: 'blur(8px)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black z-0"></div>

      {/* 2. Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[450px] p-8 md:p-16 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Sign <span className="text-red-600">In</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Unlimited movies, TV shows, and more.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            {/* Input Name */}
            <div className="relative group">
              <input
                type="text"
                required
                className="w-full bg-[#333] text-white px-5 py-4 rounded-md outline-none border-b-2 border-transparent focus:border-red-600 transition-all placeholder-gray-500"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Input Email */}
            <div className="relative group">
              <input
                type="email"
                required
                className="w-full bg-[#333] text-white px-5 py-4 rounded-md outline-none border-b-2 border-transparent focus:border-red-600 transition-all placeholder-gray-500"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-md transition-all active:scale-95 shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : "Sign In"}
          </button>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-red-600" /> Remember me
            </label>
            <span className="hover:underline cursor-pointer">Need help?</span>
          </div>
        </form>

        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            New to MediaHub? <span className="text-white font-bold hover:underline cursor-pointer">Sign up now.</span>
          </p>
          <p className="text-[10px] text-gray-600 mt-4 leading-relaxed">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. 
            <span className="text-blue-500 hover:underline ml-1 cursor-pointer">Learn more.</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;