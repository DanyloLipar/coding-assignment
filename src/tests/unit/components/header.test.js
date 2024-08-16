import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../../components/Header";
import { APIRoutesBase } from "../../../core/http";
import { clearMovies } from "../../../store/reducers/movies/moviesSlice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Header component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      movies: {
        movies: [],
        totalPages: 10,
        fetchStatus: "",
      },
      starred: {
        starredMovies: [],
      },
    });
  });

  test("should render home link with correct icon", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    const homeLink = screen.getByTestId("home");
    expect(homeLink).toBeInTheDocument();

    const icon = screen.getByText((content, element) =>
      element.classList.contains("bi-film")
    );
    expect(icon).toBeInTheDocument();
  });

  test("should render nav links correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("nav-starred")).toBeInTheDocument();
    expect(screen.getByText(/Watch Later/i)).toBeInTheDocument();
  });

  test("should render NavLink to starred with correct icon and count", () => {
    const initialState = {
      movies: {
        movies: [],
        totalPages: 10,
        fetchStatus: "idle",
      },
      starred: {
        starredMovies: [
          { id: "1", title: "Movie 1" },
          { id: "2", title: "Movie 2" },
        ],
      },
    };
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    const navStarred = screen.getByTestId("nav-starred");
    expect(navStarred).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("should display number of starred movies when there are starred movies", () => {
    const initialState = {
      movies: {
        totalPages: 10,
        fetchStatus: "idle",
      },
      starred: {
        starredMovies: [{ id: 1 }, { id: 2 }],
      },
    };
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });
  test("should dispatch fetchMovies action when search input changes", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByTestId("search-movies"), {
      target: { value: "Inception" },
    });

    await waitFor(() => {
      const actions = store.getActions();

      expect(actions).toContainEqual(
        expect.objectContaining({
          type: "movies/clearMovies",
          payload: [],
        })
      );
    });

    await waitFor(() => {
      const actions = store.getActions();

      expect(actions).toContainEqual(
        expect.objectContaining({
          type: "movies/fetchMovies/pending",
          meta: expect.objectContaining({
            arg: expect.objectContaining({
              url: APIRoutesBase.SEARCH_MOVIE,
              query: expect.objectContaining({
                query: "Inception",
                page: 1,
              }),
            }),
          }),
        })
      );
    });
  });

  test("should clear movies when search input changes", async () => {
    const initialState = {
      movies: {
        movies: [],
        totalPages: 10,
        fetchStatus: "idle",
      },
      starred: {
        starredMovies: [],
      },
    };
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByTestId("search-movies"), {
      target: { value: "Inception" },
    });

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(clearMovies([]));
    });
  });
});
