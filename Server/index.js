const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose")
const connectDB = require('./model/db');
const Movie = require("./model/Movie")


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

<<<<<<< HEAD
// routes to add movies

// GET all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST a new movie
app.post('/movies', async (req, res) => {
  const { title, year, description, genre, rating } = req.body;
  const movie = new Movie({ title, year, description, genre, rating });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// PUT update a movie
app.put('/movies/:id', async (req, res) => {
=======
app.get('/', (req, res) => {
  res.json(movies);
});

app.post('/', (req, res) => {
  const movie = { ...req.body, id: Date.now().toString() };
  movies.push(movie);
  res.status(201).json(movie);
});

app.put('//:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex !== -1) {
    movies[movieIndex] = { ...movies[movieIndex], ...req.body };
    res.json(movies[movieIndex]);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.delete('/:id', (req, res) => {
>>>>>>> 001c96b86bdbceb5da27a1c20664f87cb231de7a
  const { id } = req.params;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).send('Movie not found');
    }
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE a movie
app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Movie.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
