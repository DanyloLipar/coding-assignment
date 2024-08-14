import {
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { fetchMovies } from "./store/reducers/movies/moviesSlice";

import "./assets/styles/style.scss";
import AppRouter from "./core/router/AppRouter";
import { useAppDispatch } from "./store/store";

const App = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const navigate = useNavigate();

  const closeCard = () => {};

  const getSearchResults = (query) => {
    if (query !== "") {
      dispatch(fetchMovies());
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies);
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
