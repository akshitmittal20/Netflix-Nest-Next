import { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar.jsx';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('netflix-nest-backend.vercel.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect to the login page after successful signup
        router.push('/login');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-white">Signup</h1>
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}