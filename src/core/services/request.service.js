import $api from "../http";

export default class RequestService {
  static async getMovies(url, query) {
    return $api.get(url, {
      params: query,
    });
  }
}
