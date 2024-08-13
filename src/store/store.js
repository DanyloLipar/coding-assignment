import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./reducers/movies/moviesSlice";
import starredSlice from "./reducers/starred/starredSlice";
import watchLaterSlice from "./reducers/watchLater/watchLaterSlice";

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer,
  },
});

export default store;
