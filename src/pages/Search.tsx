import { useMovies } from "../hook/MoviesContext";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


const Search = () => {
  const { movies, fetchMovies, getImageUrl, totalPages } = useMovies();
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 4;

  useEffect(() => {
    if (!searchText) {
      fetchMovies("", 1);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    if (searchText.trim()) {
      await fetchMovies(searchText, 1);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    if (searchText.trim()) {
      await fetchMovies(searchText, page);
    }
  };

  const totalResults = Math.ceil(totalPages / resultsPerPage);

  return (
    <>
      <h1>SearchPage</h1>
      <hr />
        <Helmet>
              <title>{`Películas - Página ${currentPage}`}</title>
              <meta
                name="description"
                content="Explora nuestra lista de películas y guarda tus favoritas."
              />
              <meta property="og:title" content="Películas" />
              <meta
                property="og:description"
                content="Explora nuestra lista de películas y guarda tus favoritas."
              />
              <meta
                property="og:image"
                content="https://image.tmdb.org/t/p/original"
              />
              <meta property="og:url" content={window.location.href} />
            </Helmet>

      <div className="row">
        <div className="col-5">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div className="row">
            {movies.length === 0 ? (
              <p>No hay resultados</p>
            ) : (
              movies.map((movie) => (
                <div key={movie.id} className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title}
                      className="card-img-top"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <Link
                        to={`/movies/${movie.id}}`}
                        className="btn btn-link"
                      >
                        Mas...
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify.content-center">
              <button
                className="btn btn-outline-secondary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className="mx-3">
                {currentPage} / {totalResults}
              </span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalResults}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
