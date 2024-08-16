import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Movie from "../../../components/Movie";
import thunk from "redux-thunk";
import { starMovie } from "../../../store/reducers/starred/starredSlice";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../../../store/reducers/watchLater/watchLaterSlice";
import { moviesMock } from "../../mocks/movies.mocks";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Movie component", () => {
  let store;
  const movie = moviesMock.results[0];
  beforeEach(() => {
    store = mockStore({
      starred: { starredMovies: [] },
      watchLater: { watchLaterMovies: [] },
    });
  });

  test("should display movie details", () => {
    render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
  });

  test("should dispatch starMovie when star button is clicked", () => {
    render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("starred-link"));

    const actions = store.getActions();
    expect(actions).toContainEqual(starMovie(movie));
  });

  test("should dispatch addToWatchLater when watch later button is clicked", () => {
    render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("watch-later"));

    const actions = store.getActions();
    expect(actions).toContainEqual(addToWatchLater(movie));
  });

  test("should dispatch removeFromWatchLater when remove button is clicked", () => {
    store = mockStore({
      starred: { starredMovies: [] },
      watchLater: { watchLaterMovies: [movie] },
    });

    render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("remove-watch-later"));

    const actions = store.getActions();
    expect(actions).toContainEqual(removeFromWatchLater(movie));
  });
});
