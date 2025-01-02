import { useEffect } from "react";
import { useMovies } from "../hook/MoviesContext"

const Movies: React.FC = () => {

  const { movie, fetchMovies, getImageUrl } = useMovies();

  //console.log("peliculas desde el contexto",movies)
  useEffect(() => {
    fetchMovies(550)
  }, [])

  if (!movie) return <div>Loading...</div>

  return (
    <div>
     
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>
        <strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(',')}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}/10
      </p>
      <p>
        img src={getImageUrl(movie.poster_path)} alt={movie.title}
      </p>



    </div>
  )

}

export default Movies;



