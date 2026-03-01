const Plot = require('../models/plot');

exports.getPlotsByLand = async (req, res) => {
  try {
    const plots = await Plot.find({ land_id: req.params.landId }).sort({ plot_number: 1 });
    return res.status(200).json(plots);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch plots', error: error.message });
  }
};

exports.getPlotById = async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);

    if (!plot) {
      return res.status(404).json({ message: 'Plot not found' });
    }

    return res.status(200).json(plot);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch plot', error: error.message });
  }
};
