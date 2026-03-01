const express = require('express');
const { getPlot3DByPlotId } = require('../controllers/plot3dController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/plots/:id/3d', authMiddleware, getPlot3DByPlotId);

module.exports = router;
