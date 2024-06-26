import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 rounded-md ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          MOVIES WATCHLIST
        </Link>
        <button
          className="text-white block md:hidden"
          onClick={toggleMenu}
        >
          ☰
        </button>
        <ul className={`flex-col md:flex-row md:flex md:space-y-0 md:space-x-6 space-y-4 ${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-20 right-6 md:top-auto md:left-auto  md:w-auto bg-blue-500 md:bg-transparent rounded-md md:rounded-none p-6 md:p-0`}>
          <li>
            <Link
              to="/"
              className="text-white text-lg border-purple-400 font-semibold p-2 rounded-md bg-purple-400 hover:bg-red-400 block md:inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies List
            </Link>
          </li>
          <li>
            <Link
              to="/movies_add"
              className="text-white text-lg border-purple-400 font-semibold p-2 rounded-md bg-purple-400 hover:bg-red-400 block md:inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Movie
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
