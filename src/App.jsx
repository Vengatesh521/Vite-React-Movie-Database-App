import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import GlobalNavbar from "./components/GlobalNavbar";
import PopularMoviesPage from "./components/PopularMoviesPage";
import SearchedMoviesPage from "./components/SearchedMoviesPage";
import SingleMovieDetailsPage from "./components/SingleMovieDetailsPage";
import TopRatedMoviesPage from "./components/TopRatedMoviesPage";
import UpcomingMoviesPage from "./components/UpcomingMoviesPage";
import NotFound from "./components/NotFound";

const App = () => (
  <>
    <GlobalNavbar />
    <Routes>
      <Route path="/" element={<PopularMoviesPage />} />
      <Route path="/searched" element={<SearchedMoviesPage />} />
      <Route path="/movie/:id" element={<SingleMovieDetailsPage />} />
      <Route path="/top-rated" element={<TopRatedMoviesPage />} />
      <Route path="/upcoming" element={<UpcomingMoviesPage />} />
      <Route path="/bad-path" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/bad-path" replace />} />
    </Routes>
  </>
);

export default App;
