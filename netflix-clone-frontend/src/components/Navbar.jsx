// src/components/NavBar.jsx
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">Netflix Clone</Link>
        <div className="space-x-4">
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
