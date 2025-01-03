
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
  //fetchMovies: () => Promise<void>;
  fetchMovies: ( query: string, page: number) => Promise<void>;
  getImageUrl:(path: string) => string;
 // currentPage: string;
  totalPages: number;
  isLoading: boolean;
}

const MoviesContext = createContext<MoviesContextProps | undefined> (undefined);


export const MoviesProvider: React.FC <{children: ReactNode}> = ({children}) => {
const [ movies, setMovies] = useState<Movie []>([]);
const [currentPage, setCurrentPage] = useState<number>();
const [totalPages, setTotalPages] = useState<number>(0);
const [isLoading, setIsLoading] = useState<boolean>(false);
 




const fetchMovies = async ( query: string = "", page: number = 1) => {

  try{
      
    setIsLoading(true)

    /* const response = await axios.get(`${API_URL}/movie/popular`,{
      params: {
        api_key: API_KEY,
        query,
        page,
      
      } */

const endpoint = query ? `${API_URL}/search/popular`  : `${API_URL}/movie/popular`;
const response = await axios.get (endpoint, {
  params: {
    api_key: API_KEY,
    query,
    page,
  },
    });

    const { results, total_pages } = response.data
    setMovies ( page === 1 ? results : [...movies, ...results]);
    setCurrentPage(page);
    setTotalPages(total_pages)
    //setMovies(response.data.results)

  } catch ( error )  {
    console.error ('Error fectching movies:', error)
  } finally {
    setIsLoading(false)
  }
}
 
const getImageUrl = (path: string) => { 
  return `${IMAGE_PATH}${path}`
}



return (
  <MoviesContext.Provider value ={{movies, fetchMovies, getImageUrl, totalPages, isLoading}}>
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




