import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Music from "./pages/Music";
import Books from "./pages/Books";
import Podcasts from "./pages/Podcasts";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import { Toaster } from 'react-hot-toast';
import TvShows from "./pages/TvShows";
import ShowDetails from "./pages/ShowDetails";

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
  <BrowserRouter>
  <Toaster position="top-center" reverseOrder={false} />
    {isLoggedIn ? (    
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route path="/music" element={<Music />} />
            <Route path="/books" element={<Books />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/library" element={<Library />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/show/:id" element={<ShowDetails />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;