// src/pages/favorites.js
import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/api';
import MovieCard from '../components/MovieCard';
import NavBar from '../components/NavBar';

export default function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Mock data for demonstration
    const favoriteMovieIds = ['tt0120338', 'tt0110912']; // Replace with dynamic data from backend
    async function fetchFavoriteMovies() {
      try {
        const movies = await Promise.all(
          favoriteMovieIds.map((id) => getMovieDetails(id))
        );
        setFavoriteMovies(movies);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    }
    fetchFavoriteMovies();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-white mb-4">Favorite Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-white">No favorite movies yet...</p>
          )}
        </div>
      </div>
    </div>
  );
}
