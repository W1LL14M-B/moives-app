import { Routes, Route, Link } from "react-router-dom";
import Movies from "../pages/Movies";
import Search from "../pages/Search";
import MovieDetalle from "../pages/MovieDetalle";

const Navbar = () => {
  return (
    <nav>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CINEMA
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  Search
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/movies" element={<Movies />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies/:id"  element={<MovieDetalle/>} />


      </Routes>
    </nav>
  );
};

export default Navbar;
