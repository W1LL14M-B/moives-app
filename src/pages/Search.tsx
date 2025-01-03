/*  import { useState } from "react"
import { useMovies } from "../hook/MoviesContext";



const Search = () => {

  const { fetchMovies, movies, getImageUrl, totalPages } = useMovies();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const handleSearch = async () => {
    await fetchMovies(query, 1);
    setCurrentPage(1);
  }

  const handlePageChangue = async (page: number) => {
    await fetchMovies(query, page);
    setCurrentPage(page);
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscarr una pelicula..."
      />
      <button onClick={handleSearch}> </button>

      <div className="row">
        {movies.map((movie) => (

          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h3 className="card-title">{movie.title}</h3>
                <p className="card-text-truncante">{movie.overview}</p>
                <p className="card-text">
                  <span>Rating: {movie.vote_average}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangue(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>



    </div>
  )
}

export default Search  */




const Search = () => {
  return (
    <div>Search</div>
  )
}

export default Search