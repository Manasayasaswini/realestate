const Plot3D = require('../models/plot3d');

exports.getPlot3DByPlotId = async (req, res) => {
  try {
    const plot3D = await Plot3D.findOne({ plot_id: req.params.id });

    if (!plot3D) {
      return res.status(404).json({ message: '3D data not found for this plot' });
    }

    return res.status(200).json(plot3D);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch plot 3D data', error: error.message });
  }
};
