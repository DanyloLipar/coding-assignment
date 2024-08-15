import modalSlice from "./modal/modalSlice";
import moviesSlice from "./movies/moviesSlice";
import starredSlice from "./starred/starredSlice";
import watchLaterSlice from "./watchLater/watchLaterSlice";

export default Object.assign(
  {},
  {
    modal: modalSlice,
    movies: moviesSlice,
    starred: starredSlice,
    watchLater: watchLaterSlice,
  }
);
