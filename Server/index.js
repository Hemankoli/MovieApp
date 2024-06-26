const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let movies = [];

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.post('/movies', (req, res) => {
  const movie = { ...req.body, id: Date.now().toString() };
  movies.push(movie);
  res.status(201).json(movie);
});

app.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex !== -1) {
    movies[movieIndex] = { ...movies[movieIndex], ...req.body };
    res.json(movies[movieIndex]);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  movies = movies.filter((movie) => movie.id !== id);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
