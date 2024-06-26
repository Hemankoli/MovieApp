const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model('Movie', MovieSchema);
