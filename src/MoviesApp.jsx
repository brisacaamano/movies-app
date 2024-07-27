import { useState } from 'react'
import './MoviesApp.css'

export const MoviesApp = () => {
  const [movie, setMovie] = useState('')
  const [moviesData, setMoviesData] = useState(null)

  const baseUrl = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = 'API_KEY'

  const fetchMoviesData = async () => {
    try {
      const response = await fetch(`${baseUrl}?query=${movie}&api_key=${API_KEY}&language=es-ES`)
      const data = await response.json()
      setMoviesData(data.results)
    }
    catch (error) {
      console.error('An error has occurred: ', error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchMoviesData()
  }

  const handleChange = (event) => {
    setMovie(event.target.value)
  }

  return (
    <div className='container'>
      <h1>Movies App</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter any movie' value={movie} onChange={handleChange}></input>
        <button type='submit'>Search</button>
      </form>
      {moviesData &&
        <div className='movies-data'>
          {moviesData.map(movie => (
            <div className='movies-card' key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
