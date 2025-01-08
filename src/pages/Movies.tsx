import { useEffect, useState } from "react";
import { MoviesProvider, useMovies } from "../hook/MoviesContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Movies: React.FC = () => {
  const { movies, fetchMovies, getImageUrl } = useMovies();
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    fetchMovies(query, page);
  }, [query, page]);

  useEffect(() => {
    const storeFavorites = localStorage.getItem("favorites");
    if (storeFavorites) {
      setFavorites(JSON.parse(storeFavorites));
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviosPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  const toggleFavorite = (movieId: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(movieId)) {
        return prevFavorites.filter((id) => id !== movieId);
      } else {
        return [...prevFavorites, movieId];
      }
    });
  };

  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  const moviesToShow = showFavorites
    ? movies.filter((movie) => favorites.includes(movie.id))
    : movies;

  return (
    <>
      <Helmet>
        <title>{`Películas - Página ${page}`}</title>
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
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <button onClick={toggleShowFavorites} className="btn btn-link">
            {showFavorites ? "Ver todas las peliculas" : "Ver solo favorites"}
          </button>
        </div>
        <div className="row">
          {moviesToShow.map((movie) => (
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
                  <p className="card-text-truncante">{movie.overview}</p>

                  <button
                    onClick={() => toggleFavorite(movie.id)}
                    className={`btn ${
                      favorites.includes(movie.id)
                        ? "btn-warning"
                        : "btn-outline-warning"
                    }`}
                  >
                    {favorites.includes(movie.id)
                      ? "Quitar de favoritos"
                      : "Añadir a favoritos"}
                  </button>

                  <Link to={`/movies/${movie.id}`} className="btn btn-link">
                    Mas...
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button
            onClick={handlePreviosPage}
            className="btn btn-primary"
            disabled={page === 1}
          >
            Anterior
          </button>
          <span> Pagina: {page}</span>
          <button onClick={handleNextPage} className="btn btn-primary">
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default Movies;
