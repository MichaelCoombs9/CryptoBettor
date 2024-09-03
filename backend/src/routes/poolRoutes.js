const express = require('express');
const router = express.Router();
const { createPool } = require('../controllers/poolController');

// @route    POST /api/v1/pools/create
// @desc     Create a new pool
// @access   Private
router.post('/create', createPool);

module.exports = router;
