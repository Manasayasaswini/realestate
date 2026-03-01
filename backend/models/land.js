const mongoose = require('mongoose');

const LandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  total_area: { type: Number, required: true },
  // Array of [lat, lng] for Leaflet polygon rendering
  coordinates: { type: [[Number]], required: true }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Land', LandSchema);
