import axios from "axios";

const API = "http://localhost:5000";

export const getMovies = async () => {
  const res = await axios.get(`${API}/movies`);
  return res.data;
};

export const addToWatchlist = async (movie) => {
  const res = await axios.post(`${API}/watchlist`, movie);
  return res.data;
};

export const getWatchlist = async () => {
  const res = await axios.get(`${API}/watchlist`);
  return res.data;
};

export const getTvShows = async () => {
  const res = await axios.get(`${API}/tvshows`);
  return res.data;
};

export const addContinueWatching = async (movie) => {
  const res = await axios.post(`${API}/continueWatching`, movie);
  return res.data;
};

export const getContinueWatching = async () => {
  const res = await axios.get(`${API}/continueWatching`);
  return res.data;
};

export const getMusic = async () => {
  const res = await axios.get(`${API}/music`);
  return res.data;
};

export const getBooks = async () => {
  const res = await axios.get(`${API}/books`);
  return res.data;
};

export const getPodcasts = async () => {
  const res = await axios.get(`${API}/podcasts`);
  return res.data;
};

export const upsertContinueWatching = async (movie) => {
  // Pehle check karo ki ye movie history mein hai?
  const res = await axios.get(`${API}/continueWatching`);
  const existing = res.data.find(m => m.id === movie.id);

  if (existing) {
    // Agar hai, toh sirf progress update karo (PUT request)
    return await axios.put(`${API}/continueWatching/${movie.id}`, { ...movie, progress: 10 });
  } else {
    // Agar nahi hai, toh naya add karo (POST request)
    return await axios.post(`${API}/continueWatching`, { ...movie, progress: 10 });
  }
};