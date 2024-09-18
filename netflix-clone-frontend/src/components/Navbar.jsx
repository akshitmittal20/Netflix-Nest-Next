import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import netflixLogo from '../../public/Screenshot 2024-09-16 at 2.08.36 PM.png';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log("Token found: ", token);
      setIsLoggedIn(!!token); // Set to true if token exists
    }
  }, []);

  return (
    <nav className="bg-gray-900 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Netflix Logo */}
        <Link href="/">
          <Image src={netflixLogo} alt="Netflix Clone" width={120} height={50} />
        </Link>
        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          {isLoggedIn ? (
            <>
              <Link href="/favorites" className="hover:text-red-500">
                Favorites
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login'; // Redirect to login on logout
                }}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-red-500">Login</Link>
              <Link href="/signup" className="hover:text-red-500">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
