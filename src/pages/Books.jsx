import { useEffect, useState } from "react";
import { getBooks } from "../services/mediaService";
import { FaBookOpen, FaTimes, FaSearch, FaRegBookmark } from "react-icons/fa";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Sci-Fi", "Fiction", "Business", "History", "Biography"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
      setFilteredBooks(data);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((b) => b.genre === cat));
    }
  };

  if (loading) return <Loader fullScreen={true} />;

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      {/* 1. Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Digital <span className="text-red-600">Library</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Dive into thousands of stories and knowledge.</p>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {filteredBooks.map((book) => (
          <motion.div
            layout
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            onClick={() => setCurrentBook(book)}
            className="group cursor-pointer"
          >
            {/* 3D Book Cover Effect */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl transition-shadow group-hover:shadow-red-900/20">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <button className="bg-red-600 text-white w-full py-2 rounded font-bold text-xs flex items-center justify-center gap-2">
                  <FaBookOpen size={12} /> READ NOW
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-red-500 transition">
                {book.title}
              </h3>
              <p className="text-gray-500 text-xs mt-1 font-medium">{book.author}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Immersive Reader Modal */}
      <AnimatePresence>
        {currentBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <div className="bg-[#111] w-full max-w-4xl h-full md:h-[90vh] rounded-3xl overflow-hidden flex flex-col border border-white/10 shadow-2xl relative">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#151515]">
                <div className="flex items-center gap-4">
                  <img src={currentBook.image} className="w-10 h-14 rounded object-cover" alt="" />
                  <div>
                    <h2 className="text-lg font-bold text-white">{currentBook.title}</h2>
                    <p className="text-xs text-gray-500 italic">By {currentBook.author}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentBook(null)}
                  className="p-3 bg-white/5 hover:bg-red-600 rounded-full transition text-white"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Body - The Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-reader-scroll">
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-center mb-10">
                     <span className="text-[10px] tracking-[0.5em] text-red-600 font-black uppercase">Chapter One</span>
                  </div>
                  <p className="text-gray-300 text-lg md:text-xl leading-[2] font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-red-600 first-letter:mr-3 first-letter:float-left">
                    {currentBook.content}
                  </p>
                </div>
              </div>

              {/* Reader Footer */}
              <div className="p-4 bg-[#151515] border-t border-white/5 flex justify-center gap-8 text-gray-500 text-[10px] font-bold">
                 <span className="flex items-center gap-2"><FaRegBookmark /> ADD BOOKMARK</span>
                 <span>PAGINATED VIEW</span>
                 <span>FONT: SERIF</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Books;