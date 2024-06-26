const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose")
const connectDB = require('./model/db');
const Movie = require("./model/Movie")


const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB(); // Connect to MongoDB

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

// PUT update a movie watched/unwatched
app.put('/movies/:id', async (req, res) => {
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


// DELETE a movie by ID
app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).send('Movie not found');
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
