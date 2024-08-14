import $api from "../http";

export default class RequestService {
  static async getMovies(url, query) {
    return $api.get(
      `${url}?api_key=${process.env.REACT_APP_API_KEY}&sort_by=vote_count.desc`,
      {
        params: query,
      }
    );
  }
}
