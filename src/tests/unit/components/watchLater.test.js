import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import WatchLater from "../../../components/WatchLater";
import { removeAllWatchLater } from "../../../store/reducers/watchLater/watchLaterSlice";
import { MemoryRouter } from "react-router-dom";
import { moviesMock } from "../../mocks/movies.mocks";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("WatchLater component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      watchLater: {
        watchLaterMovies: [],
      },
      movies: {
        fetchStatus: "",
        movies: [],
      },
      starred: {
        starredMovies: [],
      },
    });
  });

  test("should display empty message when there are no movies", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WatchLater />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/You have no movies saved to watch later/i)
    ).toBeInTheDocument();
  });

  test("should display movies when there are watch later movies", () => {
    const initialState = {
      watchLater: {
        watchLaterMovies: [...moviesMock.results],
      },
      movies: {
        fetchStatus: "",
        movies: [...moviesMock.results],
      },
      starred: {
        starredMovies: [],
      },
    };
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <WatchLater />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Watch Later List/i)).toBeInTheDocument();
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
  });

  test("should dispatch removeAllWatchLater when 'Empty list' button is clicked", () => {
    const initialState = {
      watchLater: {
        watchLaterMovies: [...moviesMock.results],
      },
      movies: {
        fetchStatus: "idle",
        movies: [...moviesMock.results],
      },
      starred: {
        starredMovies: [],
      },
    };
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <WatchLater />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Empty list/i));

    const actions = store.getActions();
    expect(actions).toContainEqual(removeAllWatchLater());
  });
});
