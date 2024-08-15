import { Link } from "react-router-dom";
import { clearAllStarred } from "../../store/reducers/starred/starredSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
import MoviesList from "../MoviesList";

const StarredMovies = () => {
  const { starredMovies } = useAppSelector((state) => state.starred);
  const dispatch = useAppDispatch();

  return (
    <div className="starred" data-testid="starred">
      {starredMovies.length > 0 ? (
        <div className="starred-movies" data-testid="starred-movies">
          <h6 className="header">Starred movies</h6>
          <MoviesList movies={starredMovies} />
          <footer>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(clearAllStarred())}
            >
              Remove all starred
            </button>
          </footer>
        </div>
      ) : (
        <div className="empty-cart text-center">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default StarredMovies;
