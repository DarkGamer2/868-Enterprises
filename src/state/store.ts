


import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // Adjust the import path as necessary

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;