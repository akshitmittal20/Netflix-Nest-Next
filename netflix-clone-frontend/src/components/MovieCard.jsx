const MovieCard = ({ movie }) => {
  // Helper function to handle adding a movie to favorites
  const addToFavorites = async (movieId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        alert('Please login to add favorites');
        return;
      }

      const response = await fetch('netflix-nest-backend.vercel.app/users/add-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
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

  const movieImage = movie.image?.url || movie.poster?.url || 'https://via.placeholder.com/150'; // Use placeholder if the image is missing or invalid

  return (
    <div className="text-white bg-gray-800 p-4 rounded-md shadow-md">
      <img
        src={movieImage}
        alt={movie.title || 'Untitled Movie'}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{movie.title || 'Untitled Movie'}</h3>
      <button
        className="bg-red-600 mt-2 p-2 rounded text-white font-bold w-full hover:bg-red-500"
        onClick={() => addToFavorites(movie.id)}
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default MovieCard;
