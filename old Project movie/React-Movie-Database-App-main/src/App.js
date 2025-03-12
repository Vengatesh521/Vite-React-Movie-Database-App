import {Switch, Redirect, Route} from 'react-router-dom'
import './App.css'
import GlobalNavbar from './components/GlobalNavbar'
import PopularMoviesPage from './components/PopularMoviesPage'
import SearchedMoviesPage from './components/SearchedMoviesPage'
import SingleMovieDetailsPage from './components/SingleMovieDetailsPage'
import TopRatedMoviesPage from './components/TopRatedMoviesPage'
import UpcomingMoviesPage from './components/UpcomingMoviesPage'
import NotFound from './components/NotFound'

const App = () => (
  <>
    <GlobalNavbar /> {/* Global Navbar for all pages */}
    <Switch>
      <Route exact path="/" component={PopularMoviesPage} />
      <Route exact path="/searched" component={SearchedMoviesPage} />
      <Route exact path="/movie/:id" component={SingleMovieDetailsPage} />
      <Route exact path="/top-rated" component={TopRatedMoviesPage} />
      <Route exact path="/upcoming" component={UpcomingMoviesPage} />
      <Route path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </>
)

export default App
