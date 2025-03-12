// components/PopularMoviesPage.js
import React from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination'
import './index.css'

class PopularMoviesPage extends React.Component {
  state = {
    isLoading: true,
    popularMovieResponse: {
      totalPages: 0,
      totalResults: 0,
      results: [],
    },
  }

  componentDidMount() {
    this.getPopularMoviesResponse()
  }

  getUpdateData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getPopularMoviesResponse = async (page = 1) => {
    const API_KEY = '253f43a52ae817ca16ff416024ce3301'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      const newData = this.getUpdateData(data)
      this.setState({isLoading: false, popularMovieResponse: newData})
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      this.setState({isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse

    return (
      <ul className="row p-0 ms-0 me-0 mt-3">
        {results.map(movie => (
          <li key={movie.id} className="col-6 col-md-3 mb-3">
            <Link to={`/movie/${movie.id}`} style={{textDecoration: 'none'}}>
              <img
                src={movie.posterPath}
                alt={movie.title}
                className="img-fluid"
              />
              <h5>{movie.title}</h5>
              <p>Rating: {movie.voteAverage}</p>
              <button type="button" className="movie-button">
                View Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state

    return (
      <div className="container">
        {isLoading ? this.renderLoadingView() : this.renderPopularMoviesList()}
        <Pagination
          totalPages={popularMovieResponse.totalPages} // Fixed: passing totalPages instead of entire object
          apiCallback={this.getPopularMoviesResponse}
        />
      </div>
    )
  }
}

export default PopularMoviesPage
