// src/pages/signup.js
import NavBar from '../components/NavBar';

export default function Signup() {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold text-white">Signup</h1>
        <form className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="block w-full p-2 mb-4 rounded bg-gray-800 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full p-2 mb-4 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 p-2 rounded text-white font-bold w-full">Signup</button>
        </form>
      </div>
    </div>
  );
}
