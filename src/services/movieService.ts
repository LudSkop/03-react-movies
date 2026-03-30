import axios from "axios";
import { type Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
}
const KEY_API = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = async (query: string): Promise<MovieResponse> => {
  const response = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${KEY_API}`,
      },
    },
  );

  return response.data;
};
