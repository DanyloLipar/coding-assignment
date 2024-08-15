import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { fetchMovies } from "../../store/reducers/movies/moviesSlice";
import { APIRoutesBase } from "../../core/http";
import "../../assets/styles/components/header.scss";

const Enums = {
  DESC: "vote_count.desc",
  ASC: "vote_count.asc",
};

const Header = () => {
  const [search, setSearch] = useState("");
  const [sorter, setSorter] = useState("vote_count.desc");

  const { starredMovies } = useSelector((state) => state.starred);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search
        ? dispatch(
            fetchMovies({
              url: APIRoutesBase.SEARCH_MOVIE,
              query: { query: search },
            })
          )
        : dispatch(
            fetchMovies({
              url: APIRoutesBase.DISCOVER_MOVIE,
              query: { sort_by: sorter },
            })
          );
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, sorter, search]);

  const handleSort = () => {
    sorter === Enums.DESC ? setSorter(Enums.ASC) : setSorter(Enums.DESC);
  };

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
          value={search.query}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Link to="/" className="search-link">
          <i className="bi bi-search" aria-hidden="true" />
        </Link>
        <button onClick={handleSort}>Sort</button>
      </div>
    </header>
  );
};

export default Header;
