import moviesSlice from "./movies/moviesSlice";
import starredSlice from "./starred/starredSlice";
import watchLaterSlice from "./watchLater/watchLaterSlice";

export default Object.assign(
  {},
  {
    movies: moviesSlice,
    starred: starredSlice,
    watchLater: watchLaterSlice,
  }
);
