import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestService from "../../../core/services/request.service";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ url, query }) => {
    const response = await RequestService.fetchAllMovies(url, {
      ...query,
    });
    return response.data;
  }
);

const state = {
  movies: [],
  fetchStatus: "",
  selectedMovie: null,
  totalPages: 0,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: state,
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.results];
        state.fetchStatus = "success";
        state.totalPages = action.payload.total_pages;
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
export const { setSelectedMovie, clearMovies } = moviesSlice.actions;
