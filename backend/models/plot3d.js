const mongoose = require('mongoose');

const Plot3DSchema = new mongoose.Schema(
  {
    plot_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plot',
      required: true,
      unique: true
    },
    model_url: { type: String, default: '' },
    dimensions: {
      width: { type: Number, required: true },
      length: { type: Number, required: true },
      height: { type: Number, required: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plot3D', Plot3DSchema);
