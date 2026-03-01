const Land = require('../models/land');

exports.getLands = async (_req, res) => {
  try {
    const lands = await Land.find().sort({ createdAt: -1 });
    return res.status(200).json(lands);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch lands', error: error.message });
  }
};

exports.getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);

    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }

    return res.status(200).json(land);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch land', error: error.message });
  }
};
