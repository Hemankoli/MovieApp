const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose")

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moviesdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


// Define a movie schema and model
const movieSchema = new mongoose.Schema({ 
  title: { type: String, required: true },
  description: { type: String},
  releaseYear: { type: Number, required: true },
  genre: String,
  rating: Number,
  watched: { type: Boolean, default: false }
});

const Movie = mongoose.model('Movie', movieSchema);

// Route to get all movies

app.get('/movies', async (req, res) => {
  try {
    const  = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new movie

app.post('/movies', async (req, res) => {
  const { title, releaseYear, description, genre, rating } = req.body;
  const movie = new Movie({ title, releaseYear, description, genre, rating });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a movie
app.put('/movies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!updatedMovie) {
      return res.status(404).send('Movie not found');
    }
    
    res.json(updatedMovie);
    console.log('Updated movie:', updatedMovie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).send('Internal server error');
  }
});


// Route to delete a movie

app.delete('/movies/:id', async (req, res) => {   
  const { id } = req.params;
  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (!deletedMovie) {
    return res.status(404).send('Movie not found');
  }
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
