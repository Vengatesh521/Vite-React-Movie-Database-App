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
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
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
      <TailSpin
        height="50"
        width="50"
        color="#032541"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    </div>
  );

  const renderPopularMoviesList = () => {
    const { results } = popularMovieResponse;

    return (
      <ul className="row">
        {results.map((movie) => (
          <li key={movie.id}>
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
