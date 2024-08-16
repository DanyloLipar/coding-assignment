import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  clearMovies,
  fetchMovies,
} from "../../store/reducers/movies/moviesSlice";
import { APIRoutesBase } from "../../core/http";

const Header = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  const { totalPages, fetchStatus } = useAppSelector((state) => state.movies);

  console.log(totalPages);
  const { starredMovies } = useSelector((state) => state.starred);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      location.pathname === "/"
    ) {
      if (fetchStatus !== "loading" && page < totalPages) {
        setPrevScrollPosition(window.pageYOffset);
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [page, fetchStatus, totalPages]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        fetchMovies({
          url: search
            ? APIRoutesBase.SEARCH_MOVIE
            : APIRoutesBase.DISCOVER_MOVIE,
          query: search ? { query: search, page } : { page },
        })
      ).then(() => {
        window.scrollTo(0, prevScrollPosition);
      });
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, search, page, prevScrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header>
      <Link to="/" data-testid="home">
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          Watch Later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
          value={search}
          onChange={(event) => {
            dispatch(clearMovies([]));
            setPage(1);
            setSearch(event.target.value);
          }}
        />
        <Link to="/" className="search-link">
          <i className="bi bi-search" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
