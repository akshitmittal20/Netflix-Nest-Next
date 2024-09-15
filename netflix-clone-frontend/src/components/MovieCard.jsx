const MovieCard = ({ movie }) => {
  console.log("movies-->" + movie)
    const movieImage = movie.image?.url || movie.poster?.url ||  'https://via.placeholder.com/500'; // Use placeholder if the image is missing or invalid
    return (
      <div className="bg-gray-800 p-4 rounded-md shadow-md">
        <img
          src={movieImage} // Corrected image field
          alt={movie.title || 'Untitled Movie'}
          className="w-full h-64 object-cover rounded"
        />
        <h3 className="text-lg font-bold mt-2">{movie.title || 'Untitled Movie'}</h3>
      </div>
    );
  };
  export default MovieCard;
