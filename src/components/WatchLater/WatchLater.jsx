import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { removeAllWatchLater } from "../../store/reducers/watchLater/watchLaterSlice";
import MoviesList from "../MoviesList";

const WatchLater = () => {
  const { watchLaterMovies } = useAppSelector((state) => state.watchLater);
  const dispatch = useAppDispatch();

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLaterMovies.length > 0 ? (
        <div data-testid="watch-later-movies" className="starred-movies">
          <h6 className="header">Watch Later List</h6>
          <MoviesList movies={watchLaterMovies} />
          <footer>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(removeAllWatchLater())}
            >
              Empty list
            </button>
          </footer>
        </div>
      ) : (
        <div className="empty-cart text-center">
          <i className="bi bi-heart" />
          <p>You have no movies saved to watch later.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
