import SearchBar from "../SearchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearchSubmit = async (query: string) => {
    const data = await fetchMovies(query);
    if (data.results.length === 0) {
      toast.error("No movies found for your search query");
      return;
    }
    setMovies(data.results);

    console.log("Search query in App:", query);
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearchSubmit} />
    </>
  );
}
