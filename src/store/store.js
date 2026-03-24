import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./mediaSlice";
import playerReducer from "./playerSlice";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    media: mediaReducer,
    player:playerReducer,
    search:searchReducer,
    user:userReducer
  },
});