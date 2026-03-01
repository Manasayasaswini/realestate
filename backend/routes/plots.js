const express = require('express');
const { getPlotsByLand, getPlotById } = require('../controllers/plotController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/lands/:landId/plots', authMiddleware, getPlotsByLand);
router.get('/plots/:id', authMiddleware, getPlotById);

module.exports = router;
