import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Pagination from "../Pagination";
import "./index.css";

const PopularMoviesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [popularMovieResponse, setPopularMovieResponse] = useState({
    totalPages: 0,
    totalResults: 0,
    results: [],
  });

  const getUpdateData = (responseData) => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map((eachMovie) => ({
      id: eachMovie.id,
      posterPath: eachMovie.poster_path
        ? `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`
        : "https://via.placeholder.com/500",
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  });

  const getPopularMoviesResponse = async (page = 1) => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Use Vite's env variable syntax
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

    try {
      setIsLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setPopularMovieResponse(getUpdateData(data));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPopularMoviesResponse();
  }, []);

  const renderLoadingView = () => (
    <div className="loader-container">
      <TailSpin color="#032541" height={50} width={50} />
    </div>
  );

  const renderPopularMoviesList = () => {
    const { results } = popularMovieResponse;

    return (
      <ul className="row p-0 ms-0 me-0 mt-3">
        {results.map((movie) => (
          <li key={movie.id} className="col-6 col-md-3 mb-3">
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
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
    );
  };

  return (
    <div className="container">
      {isLoading ? renderLoadingView() : renderPopularMoviesList()}
      <Pagination
        totalPages={popularMovieResponse.totalPages}
        apiCallback={getPopularMoviesResponse}
      />
    </div>
  );
};

export default PopularMoviesPage;
