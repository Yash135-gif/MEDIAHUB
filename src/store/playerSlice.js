import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    currentTrack: null, // Isme song ka object aayega (title, artist, audio url)
    isPlaying: false,
  },
  reducers: {
    setTrack: (state, action) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    clearTrack: (state) => {
      state.currentTrack = null;
      state.isPlaying = false;
    }
  },
});

export const { setTrack, togglePlay,clearTrack } = playerSlice.actions;
export default playerSlice.reducer;