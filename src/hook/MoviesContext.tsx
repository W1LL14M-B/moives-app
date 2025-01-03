
import axios from "axios"
import { createContext, ReactNode, useContext, useState } from "react";


const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = '961641fcc7f5229c2503cc1c88ef251e'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

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
  movies: Movie [];
  fetchMovies: () => Promise<void>;
  getImageUrl:(path: string) => string;
}

const MoviesContext = createContext<MoviesContextProps | undefined> (undefined);


export const MoviesProvider: React.FC <{children: ReactNode}> = ({children}) => {
const [ movies, setMovies] = useState<Movie []>([]);





const fetchMovies = async ( query: string = "", page: number = 1) => {

  try{
    const response = await axios.get(`${API_URL}/movie/popular`,{
      params: {
        api_key: API_KEY,
        query,
        page,
      
      }
    });

    setMovies(response.data.results)

  } catch ( error )  {
    console.error ('Error fectching movies:', error)
  }
}
 
const getImageUrl = (path: string) => {

  return `${IMAGE_PATH}${path}`


}



return (
  <MoviesContext.Provider value ={{movies, fetchMovies, getImageUrl}}>
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




