import { useEffect, useState } from "react"
import './App.css'
import SearchIcon from './search.svg'

import MovieCard from "./MovieCard";


const api_url ="http://www.omdbapi.com?apikey=94fec292" //This is our API key

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${api_url}&s=${title}`);
    const data = await response.json();

    // console.log(data.Search)
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies("simpsons")
  }, [])

  return (
    <div className="app">
      <h1>MoviePlace</h1>

      <div className="search">
        <input placeholder="Search for movie" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchValue)}/>
      </div>
      {movies?.length >0 ? (
        <div className="container">
          {
            movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))
          }
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found :(</h2>
        </div>
      )}
    </div>
  );
}

export default App;
