const express = require('express');
const { getLands, getLandById } = require('../controllers/landController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getLands);
router.get('/:id', authMiddleware, getLandById);

module.exports = router;
