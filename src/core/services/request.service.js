import $api from "../http";

export default class RequestService {
  static async fetchAllMovies(url, query) {
    return $api.get(`${url}?api_key=${process.env.REACT_APP_API_KEY}`, {
      params: query,
    });
  }

  static async fetchMovie(url, id, query) {
    return $api.get(
      `${url}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`,
      {
        params: query,
      }
    );
  }
}
