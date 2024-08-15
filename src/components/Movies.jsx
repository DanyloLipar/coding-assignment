import React from "react";
import Movie from "./Movie";
import "../assets/styles/components/movies.scss";

import { useAppSelector } from "../store/store";

const Movies = () => {
  const { movies, fetchStatus } = useAppSelector((state) => state.movies);

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
