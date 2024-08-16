import { configureStore } from "@reduxjs/toolkit";
import watchLaterSlice, {
  addToWatchLater,
  removeFromWatchLater,
  removeAllWatchLater,
} from "../../../store/reducers/watchLater/watchLaterSlice";

describe("watchLaterSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        watchLater: watchLaterSlice,
      },
    });
  });

  test("should add a movie to watchLaterMovies when addToWatchLater is dispatched", () => {
    const movie = { id: 1, title: "Inception" };
    store.dispatch(addToWatchLater(movie));

    const state = store.getState().watchLater;
    expect(state.watchLaterMovies).toContainEqual(movie);
  });

  test("should remove a movie from watchLaterMovies when removeFromWatchLater is dispatched", () => {
    const movie = { id: 1, title: "Inception" };
    store.dispatch(addToWatchLater(movie));
    store.dispatch(removeFromWatchLater(movie));

    const state = store.getState().watchLater;
    expect(state.watchLaterMovies).not.toContainEqual(movie);
  });

  test("should clear all watchLaterMovies when removeAllWatchLater is dispatched", () => {
    const movie1 = { id: 1, title: "Inception" };
    const movie2 = { id: 2, title: "The Matrix" };
    store.dispatch(addToWatchLater(movie1));
    store.dispatch(addToWatchLater(movie2));
    store.dispatch(removeAllWatchLater());

    const state = store.getState().watchLater;
    expect(state.watchLaterMovies).toHaveLength(0);
  });
});
