import { useState } from 'react';
import { useRouter } from 'next/router';// src/pages/login.js
import NavBar from '../components/NavBar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the token to local storage or cookies
        localStorage.setItem('token', data.access_token);
        // Redirect to the main dashboard after successful login
        alert('Login Succesfull');
        router.push('/');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-white">Login</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="block w-full p-2 mb-4 rounded bg-gray-800 text-white"
             required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-4 rounded bg-gray-800 text-white"
            required
          />
          <button type="submit" className="bg-red-600 p-2 rounded text-white font-bold w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
