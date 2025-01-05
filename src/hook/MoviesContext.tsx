import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "961641fcc7f5229c2503cc1c88ef251e";
const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

interface Genre {
  id: number;
  name: string;
}

interface Actor {
  id: number;
  name: string;
  profile_path: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: Genre[];
  vote_average: number;
}

interface MoviesContextProps {
  movies: Movie[];
  fetchMovies: (query: string, page: number) => Promise<void>;
  getImageUrl: (path: string) => string;
  totalPages: number;
  getMovieDetails: (id: number) => Promise<Movie | null>;
}

const MoviesContext = createContext<MoviesContextProps | undefined>(undefined);

export const MoviesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchMovies = async (query: string = "", page: number = 1) => {
    try {
      setMovies([]);
      const endpoint = query
        ? `${API_URL}/search/movie`
        : `${API_URL}/movie/popular`;

      const response = await axios.get(endpoint, {
        params: {
          api_key: API_KEY,
          query,
          page,
        },
      });

      const { results, total_pages } = response.data;
      setMovies(results);

      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fectching movies:", error);
    }
  };

  const getImageUrl = (path: string) => {
    return `${IMAGE_PATH}${path}`;
  };

  const getMovieDetails = async (id: number) => {
    try {
      const response = axios.get(`${API_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
        },
      });

      const movie = (await response).data;
      const castResponse = await axios.get(`${API_URL}/movie/${id}/credits`, {
        params: {
          api_key: API_KEY,
        },
      });

      const actors= castResponse.data.cast;
      movie.actors = actors;

      setMovieDetails(movie);
      return movie;
    } catch (error) {
      console.error("Error detalles:", error);
      return null;
    }
  };

  return (
    <MoviesContext.Provider
      value={{ movies, fetchMovies, getImageUrl, totalPages, getMovieDetails }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = (): MoviesContextProps => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovie debe usarse dentro de MovieProvider");
  }

  return context;
};
