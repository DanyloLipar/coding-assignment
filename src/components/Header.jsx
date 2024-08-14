import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "../assets/styles/components/header.scss";

const Header = () => {
  const { starredMovies } = useSelector((state) => state.starred);

  console.log(starredMovies);

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
        />
        <Link to="/" className="search-link">
          <i className="bi bi-search" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
