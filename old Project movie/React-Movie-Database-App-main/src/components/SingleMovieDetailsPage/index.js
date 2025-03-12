import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import './index.css'

const API_KEY = '253f43a52ae817ca16ff416024ce3301'

const SingleMovieDetailsPage = () => {
  const {id} = useParams()
  const [videoDetails, setVideoDetails] = useState(null)
  const [castDetails, setCastDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieRes, castRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en`,
          ),
        ])

        if (!movieRes.ok || !castRes.ok)
          throw new Error('Failed to fetch movie or cast details')

        const movieData = await movieRes.json()
        const castData = await castRes.json()

        setVideoDetails(movieData)
        setCastDetails(castData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])
  const getGender = gender => {
    if (gender === 2) return 'Male'
    if (gender === 1) return 'Female'
    return 'Not specified'
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${videoDetails?.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '650px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        }}
        className="image-container"
      >
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${videoDetails?.poster_path}`}
            alt={videoDetails?.title}
            className="poster-image"
          />
        </div>
        <div>
          <h2>{videoDetails?.title}</h2>
          <p>{videoDetails?.overview}</p>
          <p>Popularity : {videoDetails?.popularity}</p>
          <p>Release Date : {videoDetails?.release_date}</p>
          <h1 className="movie-release">Vote : {videoDetails?.vote_average}</h1>
          <p>Vote Count : {videoDetails?.vote_count}</p>
        </div>
      </div>
      <div>
        <div className="container movie-container">
          <div className="row row-cols-lg-6 row-cols-md-4 row-cols-sm-3 row-cols-2 g-3">
            {castDetails?.cast?.map(cast => (
              <div className="col" key={cast.id}>
                <div className="movie-card">
                  <img
                    className="movie-image"
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    alt={cast.name}
                  />
                  <h1>{getGender(cast.gender)}</h1>

                  <h1 style={{fontSize: '14px'}}>{cast.name}</h1>
                  <p>{cast.known_for_department}</p>
                  <p>Popularity : {cast.popularity}</p>
                  <h1 className="movie-release">{cast.character}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleMovieDetailsPage
