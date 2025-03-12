import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Pagination from "../Pagination";
import "./index.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const TopRatedMoviesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topRatedMovieResponse, setTopRatedMovieResponse] = useState({
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

  const getTopRatedMoviesResponse = async (page = 1) => {
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;

    try {
      setIsLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setTopRatedMovieResponse(getUpdateData(data));
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopRatedMoviesResponse();
  }, []);

  const renderLoadingView = () => (
    <div className="loader-container">
      <TailSpin color="#032541" height={50} width={50} />
    </div>
  );

  const renderTopRatedMoviesList = () => {
    const { results } = topRatedMovieResponse;

    return (
      <div className="container movie-container">
        <div className="row row-cols-lg-6 row-cols-md-4 row-cols-sm-3 row-cols-2 g-3">
          {results.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="col">
                <div className="movie-card">
                  <img
                    className="movie-image"
                    src={movie.posterPath}
                    alt={movie.title}
                  />
                  <h1 className="movie-title">{movie.title}</h1>
                  <p className="movie-release">Rating: {movie.voteAverage}</p>
                  <button type="button" className="movie-button">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {isLoading ? renderLoadingView() : renderTopRatedMoviesList()}
      <Pagination
        totalPages={topRatedMovieResponse.totalPages}
        apiCallback={getTopRatedMoviesResponse}
      />
    </div>
  );
};

export default TopRatedMoviesPage;
