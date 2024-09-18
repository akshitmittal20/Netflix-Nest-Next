// src/services/api.js
import axios from 'axios';

// Set up an Axios instance
const apiClient = axios.create({
  baseURL: 'https://imdb8.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '45f68e0851msh81fb6708c9267a8p132eadjsnd5249c0bfbdc',
    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
  },
});

// Get popular movies
export const getPopularMovies = async () => {
  try {
    console.log('Calling getPopularMovies...'); // Check if this is printed
    const response = await apiClient.get('/title/get-most-popular-movies', {
      params: {
        homeCountry: 'US',
        purchaseCountry: 'US',
        currentCountry: 'US'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Search movies by title
export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get('/title/v2/find', {
      params: {
        title: query,
        limit: 20,
        sortArg: 'moviemeter,asc'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// Get movie details by ID
export const getMovieDetails = async (id) => {
  try {
    const response = await apiClient.get('/title/v2/get-details', {
      params: {
        tconst: id,
        country: 'US',
        language: 'en-US'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    return null;
  }
};

// Get movie images
export const getMovieImages = async (id) => {
  try {
    const response = await apiClient.get('/title/v2/get-images', {
      params: {
        tconst: id,
        first: 20
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching images for movie ID ${id}:`, error);
    return [];
  }
};
