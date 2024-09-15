// src/pages/index.js
import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import NavBar from '../components/NavBar';

export default function Home() {
    console.log('Home component rendered'); // Check if this runs

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    console.log('Fetching movies...'); // Check if this runs
    async function fetchMovies() {
      try {
        console.log('Fetching movies...'); // Check if this runs
        const data = await getPopularMovies();
        console.log('Movies Data:', data); // Check the structure of the data here
        setMovies(data);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    }

    fetchMovies();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query.trim() !== '') {
      try {
        const data = await searchMovies(query);
        setSearchResults(data.results || []);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="p-2 rounded bg-gray-800 text-white w-full"
          />
          <button className="bg-red-600 p-2 mt-2 rounded text-white font-bold w-full">
            Search
          </button>
        </form>

        {/* Render Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) :  (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {movies.length > 0 ? (
              movies.map((movie) => {
                console.log('Movie:', movie); // Check each movie object in the console
                const movieImage = movie.image?.url || movie.poster?.url || 'https://via.placeholder.com/150'; // Add a fallback image
                console.log("movieImage-->", movieImage)
                return (
                  <MovieCard key={movie.id} movie={movie} />
                );
              })
            ) : (
              <p className="">Loading movies...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
