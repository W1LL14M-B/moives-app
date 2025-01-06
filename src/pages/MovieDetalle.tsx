


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "961641fcc7f5229c2503cc1c88ef251e";
const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

interface Genre {
  id: number;
  name: string;
}

interface Cast {
  id: number;
  name: string;
  profile_path: string | null;
}

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: Genre[];
  vote_average: number;
}

const MovieDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieResponse = await axios.get(`${API_URL}/movie/${id}`, {
          params: { api_key: API_KEY },
        });

        const castResponse = await axios.get(`${API_URL}/movie/${id}/credits`, {
          params: { api_key: API_KEY },
        });

        setMovie(movieResponse.data);
        setCast(castResponse.data.cast.slice(0, 5)); // Limita a los 5 primeros actores
      } catch (error) {
        console.error("Error fetching movie details or cast:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`${IMAGE_PATH}${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>
        <strong>Fecha de lanzamiento:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Puntuación:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Géneros:</strong>{" "}
        {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
      <h3>Actores principales:</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <p>{actor.name}</p>
            {actor.profile_path && (
              <img
                src={`${IMAGE_PATH}${actor.profile_path}`}
                alt={actor.name}
                style={{ width: "50px", borderRadius: "5px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetalle;
