import {useState, useEffect} from 'react'
import {Link, useLocation, useHistory} from 'react-router-dom'
import './index.css'

const GlobalNavbar = () => {
  const location = useLocation()
  const history = useHistory()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(true) // Always keep search bar open
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Retrieve the query from the URL when navigating to SearchedMoviesPage
    const query = new URLSearchParams(location.search).get('query')
    if (query) {
      setSearchQuery(query)
      setSearchOpen(true) // Ensure search input is visible on search results page
    }
  }, [location])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      history.push(`/searched?query=${searchQuery}`)
      setSearchOpen(true) // Keep search input open
    }
  }

  return (
    <>
      <nav className="nav">
        <h1 className="h1">movieDB</h1>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${
              location.pathname === '/' ? 'active-tab' : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Popular
          </Link>
          <Link
            to="/top-rated"
            className={`nav-link ${
              location.pathname === '/top-rated' ? 'active-tab' : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Top Rated
          </Link>
          <Link
            to="/upcoming"
            className={`nav-link ${
              location.pathname === '/upcoming' ? 'active-tab' : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Upcoming
          </Link>
        </div>

        {/* Search Button */}
        <button
          type="button"
          className="search-toggle-button"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          🔍
        </button>
      </nav>

      {/* Search Input Below Navbar */}
      {searchOpen && (
        <div className="search-container">
          <label htmlFor="search-bar" className="sr-only">
            Search Movies
          </label>
          <input
            id="search-bar"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button
            className="search-button"
            type="button"
            onClick={handleSearch}
            aria-label="Search"
          >
            Search
          </button>
        </div>
      )}
    </>
  )
}

export default GlobalNavbar
