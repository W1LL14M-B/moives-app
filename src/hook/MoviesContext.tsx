
import axios from "axios"
import { createContext, ReactNode, useContext, useState } from "react";


const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = '961641fcc7f5229c2503cc1c88ef251e'
const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

interface Genre {
  id:number;
  name: string;
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
  movie: Movie | null;
  fetchMovies: (id: number) => Promise<void>;
  getImageUrl:(path: string) => string;
}

const MoviesContext = createContext<MoviesContextProps | undefined> (undefined);




/* export const MoviesProvider= ({ children} : { children: ReactNode }) */
export const MoviesProvider: React.FC <{children: ReactNode}> = ({children}) => {
const [ movie, setMovie] = useState<Movie | null>(null);


const fetchMovies = async (id: number) => {
  console.log("inicia llamada de api")
  try{
    const response = await axios.get(`${API_URL}/movie/${id}`,{
      params: {api_key: API_KEY}
     
    
    });
    console.log("respues de la api", response.data)
    setMovie(response.data)
    console.log("peliculas actualizadas", response.data)
  } catch ( error )  {
    console.error ('Error fectching movies:', error)
  }
}

const getImageUrl = (path: string) => `${URL_IMAGE}${path}`



return (
  <MoviesContext.Provider value ={{movie, fetchMovies, getImageUrl}}>
    {children}

  </MoviesContext.Provider>

 
 )

}

export const useMovies = () : MoviesContextProps => {
  const context = useContext(MoviesContext);
if (!context) {
  throw new Error ('useMovie debe usarse dentro de MovieProvider')
}

return context;

}




