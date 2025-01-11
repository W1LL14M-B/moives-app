import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import MovieDetalle from "../pages/MovieDetalle";
import Movies from "../pages/Movies";
import Search from "../pages/Search";
import { useAuth } from "../hook/AutoContex";

const AppRouter = () => {

  const { isAuthenticated } = useAuth();
  const location = useLocation()


  return (

    <>
      {location.pathname !== "/login" && <Navbar />}
      
    <Routes>

      <Route path="/" element={<Navigate to="/login" /> } /> 

      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/movies" /> : <Login />
        }
      />

      <Route path="/movies" element={<Movies />} />
  
      <Route path="/search" element={<Search />} />

      <Route path="/movies/:id" element={<MovieDetalle />} />
    </Routes>
  </>

  );
};

export default AppRouter;