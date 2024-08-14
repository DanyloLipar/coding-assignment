import { createSlice } from "@reduxjs/toolkit";

const state = {
  starredMovies: [],
};

const starredSlice = createSlice({
  name: "starred",
  initialState: state,
  reducers: {
    starMovie: (state, action) => {
      state.starredMovies = [action.payload, ...state.starredMovies];
    },
    unstarMovie: (state, action) => {
      const indexOfId = state.starredMovies.findIndex(
        (key) => key.id === action.payload.id
      );
      state.starredMovies.splice(indexOfId, 1);
    },
    clearAllStarred: (state) => {
      state.starredMovies = [];
    },
  },
});

export default starredSlice.reducer;
export const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions;
