import axios from "axios";

export const APIRoutesBase = {
  MOVIE: `/movie`,
  DISCROVER_MOVIE: `/discover/movie`,
  SEARCH_MOVIE: `/search/movie/`,
};

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default $api;
