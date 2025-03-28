import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js"; // Adjust import as needed

const store = configureStore({
  reducer: {
    user : userSlice,
  },
});

export default store;
