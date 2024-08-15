import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestService from "../../../core/services/request.service";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ url, query }) => {
    const response = await RequestService.fetchAllMovies(url, query);
    return response.data;
  }
);

const state = {
  movies: [],
  fetchStatus: "",
  selectedMovie: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: state,
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default moviesSlice.reducer;
export const { setSelectedMovie } = moviesSlice.actions;
