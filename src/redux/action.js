import axios from 'axios';

const fetchMoviesRequest = () => ({
  type: 'FETCH_MOVIES_REQUEST',
});

const fetchMoviesSuccess = (movies) => ({
  type: 'FETCH_MOVIES_SUCCESS',
  payload: movies,
});

const fetchMoviesFailure = (error) => ({
  type: 'FETCH_MOVIES_FAILURE',
  error,
});

export const fetchMovies = () => async (dispatch) => {
  dispatch(fetchMoviesRequest());
  try {
    const response = await axios.get('http://localhost:5000/movies');
    dispatch(fetchMoviesSuccess(response.data));
  } catch (error) {
    dispatch(fetchMoviesFailure(error.message));
  }
};

export const addMovie = (movie) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/movies', movie);
    dispatch({ type: 'ADD_MOVIE', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const editMovie = (id, updates) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/movies/${id}`, updates);
    dispatch({ type: 'EDIT_MOVIE', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/movies/${id}`);
    dispatch({ type: 'DELETE_MOVIE', payload: id });
  } catch (error) {
    console.error(error);
  }
};
