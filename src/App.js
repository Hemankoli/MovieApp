import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import MovieList from './components/MovieList';
import AddMovie from './components/AddMovie';
import Navbar  from './components/NavBar';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App min-h-screen bg-gray-100 p-6">
          <Navbar />
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/add" element={<AddMovie />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
