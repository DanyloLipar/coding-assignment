import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "../../store/reducers/movies/moviesSlice";
import starredSlice from "../../store/reducers/starred/starredSlice";
import watchLaterSlice from "../../store/reducers/watchLater/watchLaterSlice";
import modalSlice from "../../store/reducers/modal/modalSlice";

export function renderWithProviders(
  ui,
  {
    preloadedState = {
      movies: [],
      fetchStatus: "",
      selectedMovie: null,
      totalPages: 0,
    } | {},
    store = configureStore({
      reducer: {
        modal: modalSlice.modal,
        movies: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
