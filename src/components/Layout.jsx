import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AudioPlayer from "./AudioPlayer"; 
import GlobalPlayer from "./GlobalPlayer";

function Layout({ children }) {
  return (
  <div className="bg-black text-white min-h-screen flex flex-col">
      {/* 1. Navbar ko z-index aur position fixed dena zaroori hai (agar tune Navbar.jsx mein nahi diya) */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
    <Navbar />
      </div>

      {/* 2. Is main wrapper div mein Navbar ki height ke barabar margin-top (mt-16 ya mt-20) add kiya hai */}
     <div className="flex flex-1 mt-16 md:mt-20 pb-24"> 
  
        {/* 3. Sidebar ko bhi 'sticky' kar sakte hain taaki scroll na ho */}
     <aside className="w-64 hidden md:block border-r border-gray-800 
                h-[calc(100vh-80px)] sticky top-20 self-start 
                overflow-y-auto custom-scrollbar no-scrollbar">
  <Sidebar />
</aside>

      <main className="flex-1 overflow-y-auto p-6 custom-scrollbar pb-32">
     {children}
    </main>

      <GlobalPlayer />
     </div>

     <AudioPlayer />
     </div>
  );
}

export default Layout;