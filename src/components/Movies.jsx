import React, { useEffect } from "react";
import Movie from "./Movie";
import "../assets/styles/components/movies.scss";

import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchMovies } from "../store/reducers/movies/moviesSlice";

const Movies = () => {
  const dispatch = useAppDispatch();
  const { movies, fetchStatus } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (fetchStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (fetchStatus === "error") {
    return <div>Error loading movies. Please try again later.</div>;
  }

  return (
    <div data-testid="movies">
      {movies.results?.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default Movies;
