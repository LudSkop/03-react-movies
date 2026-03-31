import SearchBar from "../SearchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSearchSubmit = async (query: string) => {
    setLoading(true); // показуємо лоадер
    setError(false); // скидаємо помилку перед новим запитом
    try {
      const data = await fetchMovies(query);
      setLoading(false); // ховаємо лоадер після отримання даних
      if (data.results.length === 0) {
        toast.error("No movies found for your search query");
        return;
      }

      setMovies(data.results);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <Loader />} {/* показуємо лоадер, якщо loading true */}
      {error && <ErrorMessage />}
      {/* показуємо повідомлення про помилку, якщо error true */}
      {!loading && !error && (
        <MovieGrid onSelect={handleOpenModal} movies={movies} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
