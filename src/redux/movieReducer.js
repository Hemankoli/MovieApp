const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_MOVIES_SUCCESS':
      return { ...state, loading: false, movies: action.payload };
    case 'FETCH_MOVIES_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'ADD_MOVIE':
      return { ...state, movies: [...state.movies, action.payload] };
    case 'EDIT_MOVIE':
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };
    case 'DELETE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
};

export default moviesReducer;
