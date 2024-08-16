import { useAppSelector } from "../../store/store";
import Movie from "../Movie/Movie";

const MoviesList = ({ movies }) => {
  const { fetchStatus } = useAppSelector((state) => state.movies);

  if (fetchStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (fetchStatus === "error" || movies.length === 0) {
    return <div>Error loading movies. Please try again later.</div>;
  }

  return (
    <div className="movies-container" data-testid="movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.id} className="movie-card" />
      ))}
    </div>
  );
};

export default MoviesList;
