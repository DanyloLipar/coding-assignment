import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moviesReducer, {
  setSelectedMovie,
  clearMovies,
  fetchMovies,
} from "../../../store/reducers/movies/moviesSlice";
import RequestService from "../../../core/services/request.service";

jest.mock("../../../core/services/request.service");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("moviesSlice", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      movies: [],
      fetchStatus: "",
      selectedMovie: null,
      totalPages: 0,
    });
    jest.clearAllMocks();
  });

  test("should set selectedMovie when setSelectedMovie is dispatched", () => {
    const movie = { id: 1, title: "Inception" };
    const state = moviesReducer(undefined, setSelectedMovie(movie));
    expect(state.selectedMovie).toEqual(movie);
  });

  test("should clear movies when clearMovies is dispatched", () => {
    const initialState = {
      movies: [{ id: 1, title: "Inception" }],
      fetchStatus: "",
      selectedMovie: null,
      totalPages: 0,
    };
    const state = moviesReducer(initialState, clearMovies([]));
    expect(state.movies).toEqual([]);
  });

  test("should handle fetchMovies.fulfilled", async () => {
    const moviesData = {
      results: [{ id: 1, title: "Inception" }],
      total_pages: 1,
    };

    RequestService.fetchAllMovies.mockResolvedValue({ data: moviesData });

    await store.dispatch(fetchMovies({ url: "/movies", query: {} }));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchMovies.pending.type);
    expect(actions[1].type).toBe(fetchMovies.fulfilled.type);
    expect(actions[1].payload).toEqual(moviesData);
  });

  test("should handle fetchMovies.rejected", async () => {
    RequestService.fetchAllMovies.mockRejectedValue(new Error("Error"));

    await store.dispatch(fetchMovies({ url: "/movies", query: {} }));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchMovies.pending.type);
    expect(actions[1].type).toBe(fetchMovies.rejected.type);
  });
});
