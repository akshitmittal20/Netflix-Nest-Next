// src/pages/favorites.js
import { useState, useEffect } from 'react';
import { getMovieImages } from '../services/api';  // Use the existing getMovieImages API function
import NavBar from '../components/NavBar';

export default function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const extractTitleId = (titlePath) => {
    return titlePath.split('/')[2]; // This will give you "tt2049403"
  };

  useEffect(() => {
  const fetchFavoriteMovies = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        alert('Please login to view your favorite movies.');
        return;
      }

      // Start loading
      setLoading(true);

      const response = await fetch('netflix-nest-backend.vercel.app/users/favorites', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const favoriteMovieIds = data.favorites; // Assuming backend returns an array of movie IDs
        const moviesWithImages = [];
        console.log("data---->>>>>", data)
         // Loop through each movie ID and fetch its image
         for (let i = 0; i < favoriteMovieIds.length; i++) {
          const titleId = extractTitleId(favoriteMovieIds[i]);
          console.log(`Fetching images for movie ID: ${titleId}`);

          try {
            const images = await getMovieImages(titleId);
            const imageNode = (images?.data?.title?.images?.edges?.length > 0) ? images.data.title.images.edges[0].node : null;
            console.log("imageNode: " + imageNode.url);
            const movieImage = imageNode?.url || 'https://via.placeholder.com/150';
            const movieTitle = (imageNode?.titles.length > 0) ? imageNode?.titles[0].titleText.text : 'Untitled Movie';
            moviesWithImages.push({
              id: titleId,
              image: movieImage,
              title: movieTitle,
            });

          } catch (error) {
            console.error(`Error fetching images for movie ID ${titleId}:`, error);
          }
        }

        setFavoriteMovies(moviesWithImages); // Set the movie details into the state
      } else {
        console.error('Failed to fetch favorite movies.');
      }
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchFavoriteMovies();
}, []);

return (
  <div>
    <NavBar />
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-white mb-4">Favorite Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
            <div>Loading favorite movies...</div>
        ) : favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => {
            const movieImage = movie.image || "https://res.cloudinary.com/da4hf82es/image/upload/v1726456217/Screenshot_2024-09-16_at_8.40.04_AM_uf78x8.png";
            return (
              <div  key={movie.id} className="text-white bg-gray-800 p-4 rounded-md shadow-md">
              <img
                src={movieImage} // Corrected image field
                alt={movie.title || 'Untitled Movie'}
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{movie.title || 'Untitled Movie'}</h3>
            </div>
            );
          })
        ) : (
          <p>No favorite movies yet...</p>
        )}
      </div>
    </div>
  </div>
);
}