import React from "react";
import { useAppSelector } from "../../store/store";
import MoviesList from "../MoviesList";

const Movies = () => {
  const { movies } = useAppSelector((state) => state.movies);

  return (
    <div id="movies-list">
      <MoviesList movies={movies} />;
    </div>
  );
};

export default Movies;
