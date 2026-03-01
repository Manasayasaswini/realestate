const mongoose = require('mongoose');

const PlotSchema = new mongoose.Schema(
  {
    land_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Land',
      required: true
    },
    plot_number: { type: String, required: true },
    area: { type: Number, required: true },
    coordinates: { type: [[Number]], required: true },
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plot', PlotSchema);
