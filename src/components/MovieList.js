import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie, editMovie } from '../redux/action';

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleToggleWatched = (movie) => {
    dispatch(editMovie(movie.id, { watched: !movie.watched }));
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
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
                onClick={() => handleDelete(movie.id)}
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
