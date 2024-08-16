import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  starMovie,
  unstarMovie,
} from "../../store/reducers/starred/starredSlice";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../../store/reducers/watchLater/watchLaterSlice";
import { setSelectedMovie } from "../../store/reducers/movies/moviesSlice";
import placeholder from "../../assets/images/not-found-500X750.jpeg";
import { openModal } from "../../store/reducers/modal/modalSlice";

const Movie = ({ movie }) => {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();
  const { starredMovies } = useAppSelector((state) => state.starred);
  const { watchLaterMovies } = useAppSelector((state) => state.watchLater);

  const closeCard = (event) => {
    event.stopPropagation();
    setIsOpened(false);
  };

  const viewTrailer = (event) => {
    event.stopPropagation();
    dispatch(setSelectedMovie(movie));
    openModal();
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

  const handleIsStarred = (event) => {
    event.stopPropagation();
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
    );
  };

  const handleWatchLater = (event) => {
    event.stopPropagation();
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
    );
  };

  return (
    <div className="movie-card">
      <div
        className={`card ${isOpened ? "opened" : ""}`}
        onClick={() => {
          setIsOpened(true);
        }}
      >
        <div className="card-body">
          <img
            className="center-block"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : placeholder
            }
            alt={`${movie.title} poster`}
          />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            <span
              className="btn-star"
              data-testid={isStarred ? "unstar-link" : "starred-link"}
              onClick={(event) => handleIsStarred(event)}
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
                isInWatchLater ? "btn-blue" : ""
              }`}
              onClick={(event) => handleWatchLater(event)}
            >
              {isInWatchLater ? <i className="bi bi-check" /> : "Watch Later"}
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={(event) => viewTrailer(event)}
            >
              View Trailer
            </button>
          </div>
        </div>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={(event) => closeCard(event)}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Movie;
