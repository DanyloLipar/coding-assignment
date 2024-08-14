import { useAppDispatch, useAppSelector } from "../store/store";
import { starMovie, unstarMovie } from "../store/reducers/starred/starredSlice";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../store/reducers/watchLater/watchLaterSlice";
import { setSelectedMovie } from "../store/reducers/movies/moviesSlice";
import YoutubePlayer from "./YoutubePlayer";
import placeholder from "../assets/images/not-found-500X750.jpeg";

const Movie = ({ movie }) => {
  const dispatch = useAppDispatch();
  const { selectedMovie } = useAppSelector((state) => state.movies);
  const { starredMovies } = useAppSelector((state) => state.starred);
  const { watchLaterMovies } = useAppSelector((state) => state.watchLater);

  const closeCard = (e) => {
    e.stopPropagation();
    e.currentTarget.closest(".card").classList.remove("opened");
  };

  const viewTrailer = () => {
    console.log(movie);
    dispatch(setSelectedMovie(movie));
  };

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  const isStarred = starredMovies.some(
    (starredMovie) => starredMovie.id === movie.id
  );
  const isInWatchLater = watchLaterMovies.some(
    (watchLaterMovie) => watchLaterMovie.id === movie.id
  );

  return (
    <div className="wrapper col-3 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div
        className="card"
        onClick={(e) => e.currentTarget.classList.add("opened")}
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>

            <span
              className="btn-star"
              data-testid={isStarred ? "unstar-link" : "starred-link"}
              onClick={() =>
                dispatch(
                  isStarred
                    ? unstarMovie(movie)
                    : starMovie({
                        id: movie.id,
                        overview: movie.overview,
                        release_date: movie.release_date?.substring(0, 4),
                        poster_path: movie.poster_path,
                        title: movie.title,
                      })
                )
              }
            >
              <i
                className={`bi ${isStarred ? "bi-star-fill" : "bi-star"}`}
                data-testid={isStarred ? "star-fill" : ""}
              />
            </span>

            <button
              type="button"
              data-testid={
                isInWatchLater ? "remove-watch-later" : "watch-later"
              }
              className={`btn btn-light btn-watch-later ${
                isInWatchLater ? "blue" : ""
              }`}
              onClick={() =>
                dispatch(
                  isInWatchLater
                    ? removeFromWatchLater(movie)
                    : addToWatchLater({
                        id: movie.id,
                        overview: movie.overview,
                        release_date: movie.release_date?.substring(0, 4),
                        poster_path: movie.poster_path,
                        title: movie.title,
                      })
                )
              }
            >
              {isInWatchLater ? <i className="bi bi-check" /> : "Watch Later"}
            </button>

            <button
              type="button"
              className="btn btn-dark"
              onClick={viewTrailer}
            >
              View Trailer
            </button>
          </div>
          {selectedMovie && selectedMovie.id === movie.id ? (
            <YoutubePlayer />
          ) : (
            <img
              className="center-block"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : placeholder
              }
              alt={`${movie.title} poster`}
            />
          )}
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={closeCard}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Movie;
