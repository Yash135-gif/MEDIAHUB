import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000";

// Async thunk to fetch watchlist
export const fetchWatchlist = createAsyncThunk("media/fetchWatchlist", async () => {
  const response = await axios.get(`${API}/watchlist`);
  return response.data;
});

// Async thunk to add to watchlist
export const addToWatchlistThunk = createAsyncThunk("media/addToWatchlist", async (movie) => {
  const response = await axios.post(`${API}/watchlist`, movie);
  return response.data;
});

// Thunk to remove from watchlist
export const removeFromWatchlistThunk = createAsyncThunk(
  "media/removeFromWatchlist",
  async (id) => {
    await axios.delete(`${API}/watchlist/${id}`);
    return id;
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    watchlist: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.watchlist = action.payload;
      })
      .addCase(addToWatchlistThunk.fulfilled, (state, action) => {
        state.watchlist.push(action.payload);
      })
      .addCase(removeFromWatchlistThunk.fulfilled, (state, action) => {
    state.watchlist = state.watchlist.filter((item) => item.id !== action.payload);
    })
  },
});

export default mediaSlice.reducer;