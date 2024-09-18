# Netflix Clone

## Live Demo

You can view the live version of the project at: [Netflix Clone Live](https://netflix-nest-next-frontend.vercel.app/)

## Overview

This project is a Netflix clone that demonstrates a full-stack application with both frontend and backend components. The frontend is built with Next.js, while the backend is developed using NestJS. The application includes user authentication, a movie dashboard, and a favorites feature.

## Features

- **User Authentication**: Sign up and sign in with JWT-based authentication.
- **Movie Dashboard**: View the top 20 popular movies using the IMDB API.
- **Favorites**: Add movies to your favorites list and view them on a separate page.

## Technologies

- **Frontend**: Next.js
- **Backend**: NestJS
- **Authentication**: JWT (JSON Web Tokens)
- **API Integration**: IMDB API

## Frontend

The frontend is built using Next.js and includes the following features:

- **Pages**:
  - **Home**: Displays the top 20 popular movies.
  - **Favorites**: Shows the list of movies marked as favorites.
  - **Sign Up**: Allows users to create a new account.
  - **Sign In**: Allows users to log in to their account.

- **Components**:
  - **NavBar**: A navigation bar present on all pages.
  - **MovieList**: Displays movies in a list format.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshitmittal20/Netflix-Nest-Next.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd Netflix-Nest-Next/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Backend

The backend is built with NestJS and provides the following functionalities:

- **Authentication**:
  - **Sign Up**: Registers a new user and stores credentials securely.
  - **Sign In**: Authenticates a user and issues a JWT token.

- **APIs**:
  - **/api/movies**: Fetches popular movies from the IMDB API.
  - **/api/favorites**: Manages user’s favorite movies.

### Installation

1. Navigate to the backend directory:
   ```bash
   cd Netflix-Nest-Next/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm run start:dev
   ```

## Configuration

Ensure that you have the correct environment variables set up for the backend to work correctly. Create a `.env` file in the backend directory with the following variables:

```env
IMDB_API_KEY=your_imdb_api_key
JWT_SECRET=your_jwt_secret
```

## Contribution

Feel free to contribute to this project by creating pull requests or reporting issues. For more details, please refer to the project's issue tracker and documentation.

## License

This project is licensed under the [MIT License](LICENSE).

---
