import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

        const castReponse = await axios.get(`${API_URL}/movie/${id}/credits`, {
          params: { api_key: API_KEY },
        });

        setMovie(movieResponse.data);
        setCast(castReponse.data.cast.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movie details osr cast:", error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <h1>{movie.title}</h1>
            <img
              src={`${IMAGE_PATH}${movie.poster_path}`}
              alt={movie.title}
              className="card-img-top"
            />
            <div className="card-body">
              <p className="card-title">{movie.overview}</p>
              <p className="card-text">
                <strong>Puntuacion:</strong>
                {movie.vote_average}
              </p>
              <p>
                <strong>Fecha de lanzamiento:</strong> {movie.release_date}
              </p>
              <p>
                <strong>Generos:</strong>{" "}
                {movie.genres.map((genre) => genre.name).join(",")}
              </p>
            </div>
            <div className="col-md-6">
            <h2>actores principales</h2>
            <div className="row">
            <ul>
              {cast.map((actor) => (
                <li key={actor.id} className="col-6 col-md-4 mb-4">
                  <div className="card">
                  <p>{actor.name}</p>
                  {actor.profile_path && (
                    <img
                      src={`${IMAGE_PATH}${actor.profile_path}`}
                      alt={actor.name}
                      className="card-img-top"
                    />
                  )}

                  </div>
                 
                </li>
              ))}
            </ul>

            </div>
          

            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetalle;
