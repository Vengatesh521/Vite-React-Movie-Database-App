import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./index.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SearchedMoviesPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchSearchedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            query
          )}&page=1`
        );
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchedMovies();
  }, [query]);

  if (!query) return <p>Please enter a search term</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container movie-container">
      <h2>Search Results for: {query}</h2>
      <div className="row row-cols-lg-6 row-cols-md-4 row-cols-sm-3 row-cols-2 g-3">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              style={{ textDecoration: "none" }}
              key={movie.id}
            >
              <div className="col">
                <div className="movie-card">
                  <img
                    className="movie-image"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/500"
                    }
                    alt={movie.title}
                  />
                  <h1 className="movie-title">{movie.title}</h1>
                  <h1 className="movie-release">{movie.vote_average}</h1>
                  <button type="button" className="movie-button">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default SearchedMoviesPage;
