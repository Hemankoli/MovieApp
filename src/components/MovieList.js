import React, { useEffect, useState } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  
  const handleToggleWatched = async (movie) => {
    try {
      const response = await fetch(`http://localhost:5000/${movie._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ watched: !movie.watched })
      });

      const updatedMovie = await response.json();
      setMovies(movies.map((m) => (m._id === updatedMovie._id ? updatedMovie : m)));
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/${id}`, {
        method: 'DELETE'
      });

      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p className="text-gray-700">{movie.description}</p>
              <p className="text-gray-500">{movie.releaseYear}</p>
              <p className="text-gray-500">{movie.genre}</p>
              <p className="text-gray-500">Rating: {movie.rating} / 10</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleToggleWatched(movie)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {movie.watched ? 'Unwatch' : 'Watch'}
              </button>
              <button
                onClick={() => handleDelete(movie._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
