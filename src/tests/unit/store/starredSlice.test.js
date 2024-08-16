import { configureStore } from "@reduxjs/toolkit";
import starredSlice, {
  clearAllStarred,
  starMovie,
  unstarMovie,
} from "../../../store/reducers/starred/starredSlice";

describe("starredSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        starred: starredSlice,
      },
    });
  });

  test("should add a movie to starredMovies when starMovie is dispatched", () => {
    const movie = { id: 1, title: "Inception" };
    store.dispatch(starMovie(movie));

    const state = store.getState().starred;
    expect(state.starredMovies).toContainEqual(movie);
  });

  test("should remove a movie from starredMovies when unstarMovie is dispatched", () => {
    const movie = { id: 1, title: "Inception" };
    store.dispatch(starMovie(movie));
    store.dispatch(unstarMovie(movie));

    const state = store.getState().starred;
    expect(state.starredMovies).not.toContainEqual(movie);
  });

  test("should clear all starredMovies when clearAllStarred is dispatched", () => {
    const movie1 = { id: 1, title: "Inception" };
    const movie2 = { id: 2, title: "The Matrix" };
    store.dispatch(starMovie(movie1));
    store.dispatch(starMovie(movie2));
    store.dispatch(clearAllStarred());

    const state = store.getState().starred;
    expect(state.starredMovies).toHaveLength(0);
  });
});
