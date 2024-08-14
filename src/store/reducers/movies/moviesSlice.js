import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RequestService from "../../../core/services/request.service";
import { APIRoutesBase } from "../../../core/http";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query = {}) => {
    const response = await RequestService.getMovies(
      APIRoutesBase.DISCROVER_MOVIE,
      query
    );
    return response.data;
  }
);

const state = {
  movies: [],
  fetchStatus: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: state,
  reducers: {},
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
