// src/pages/index.js
import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies, getMovieImages } from '../services/api';
import MovieCard from '../components/MovieCard';
import NavBar from '../../src/components/Navbar'


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state for the spinner

   // Helper function to extract title ID (e.g., from "/title/tt2049403/" to "tt2049403")
   const extractTitleId = (titlePath) => {
    return titlePath.split('/')[2]; // This will give you "tt2049403"
  };
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const cachedMovies = localStorage.getItem('moviesWithImages');
        console.log("entered into use effect-> fetch movies--> cachedMovies", cachedMovies)

        if (cachedMovies) {
          console.log("Extracting movies popular from Cache")
          setMovies(JSON.parse(cachedMovies));
          setLoading(false); // Turn off the spinner once movies are cached
          return;
        }
  
        // Fetch popular movies
        const popularMovieIds = await getPopularMovies();
        const moviesWithImages = [];
  
        for (let i = 0; i < 20; i++) {
          const titlePath = popularMovieIds[i];
          const titleId = extractTitleId(titlePath);
  
          // Log the movie ID being fetched
          console.log(`Fetching images for movie ID: ${titleId}`);
  
          try {
            // Add a larger delay between requests
            await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 seconds delay
  
            const images = await getMovieImages(titleId);
  
            // Ensure that the images array and edges exist
            const imageNode = (images?.data?.title?.images?.edges?.length > 0) ? images.data.title.images.edges[0].node : null;
            const movieImage = imageNode?.url || 'https://via.placeholder.com/150';
            // Ensure that the titles array exists and has at least one element
            const movieTitle = (imageNode?.titles.length > 0) ? imageNode?.titles[0].titleText.text : 'Untitled Movie';

            // Push the movie with the image and title to the array
            moviesWithImages.push({
              id: titleId,
              image: movieImage,
              title: movieTitle,
            });
  
            console.log(`Successfully fetched movie ID: ${titleId}`);
          } catch (error) {
            console.error(`Error fetching images for movie ID ${titleId}:`, error);
          }
        }
        setMovies(moviesWithImages);
        setLoading(false); // Turn off the spinner once all movies are fetched
  
        // Cache the result in localStorage
        localStorage.setItem('moviesWithImages', JSON.stringify(moviesWithImages));
      } catch (error) {
        console.error('Error fetching movies with images:', error);
        setLoading(false); // Turn off the spinner once all movies are fetched
      }
    };
  
    fetchMovies();
  }, []);
  

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true); // Start spinner while searching
    if (query.trim() !== '') {
      try {
        const data = await searchMovies(query);
        setSearchResults(data.results || []);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
      finally {
        setLoading(false); // Hide spinner once search completes
      }
    }
  };
  // Add to favorites functionality
  const addToFavorites = async (movieId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        alert('Please login to add favorites');
        return;
      }
      const formattedMovieId = `/title/${movieId}/`;

      const response = await fetch('netflix-nest-backend.vercel.app/users/add-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId: formattedMovieId  }),
      });

      if (response.ok) {
        alert('Movie added to favorites!');
      } else {
        alert('Failed to add movie to favorites.');
      }
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
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

        {/* Display Spinner while fetching movies */}
        {loading ? (
          <div className="flex justify-center items-center">
            Loading movies...
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) :  (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {movies.length > 0 ? (
              movies.map((movie) => {
                const movieImage = movie.image || "https://res.cloudinary.com/da4hf82es/image/upload/v1726456217/Screenshot_2024-09-16_at_8.40.04_AM_uf78x8.png";
                return (
                  <div key={movie.id} className="text-white bg-gray-800 p-4 rounded-md shadow-md">
                  <img
                    src={movieImage} // Corrected image field
                    alt={movie.title || 'Untitled Movie'}
                    className="w-full h-64 object-cover rounded"
                  />
                  <h3 className="text-lg font-bold mt-2">{movie.title || 'Untitled Movie'}</h3>
                  <button
                      className="bg-red-600 mt-2 p-2 rounded text-white font-bold"
                      onClick={() => addToFavorites(movie.id)} // Use the addToFavorites function
                    >
                      Add to Favorites
                    </button>
                  </div>
                );
              })
            ) : (
              <p>Loading movies...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
