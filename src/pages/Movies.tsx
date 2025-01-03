import { useEffect, useState } from "react";
import { useMovies } from "../hook/MoviesContext"

const Movies: React.FC = () => {

  const { movies, fetchMovies, getImageUrl } = useMovies();
  const [ query, setquery] = useState<string> ("");
  const [ page, setPage] = useState<number>(1);



  useEffect(() => {
    fetchMovies(query, page);
  }, [query, page])

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviosPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  if(!movies) return <div>Loading...</div>
  if ( movies.length === 0) return <div>No se encontraron peliculas</div>

  return (
    <div className="container mt-4"  >
      <div className="row">
        {movies.map((movie) => (

          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card h-100">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="card-img-top"
              style={{ height: "300px", objectFit: "cover"}}
            />
            <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text-truncante">{movie.overview}</p>
            <p className="card-text">
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
            </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-4" >
        <button 
        onClick={handlePreviosPage}
        className="btn btn primary"
        disabled={page === 1}
        >
          Anterior
        </button>
        <span> Pagina: {page}</span>
        <button 
        onClick={handleNextPage}
        className="btn btn primary"
        >
        Siguiente
        </button>

      </div>
    </div>
  )

}

export default Movies;



