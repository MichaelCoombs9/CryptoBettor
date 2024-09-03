const express = require('express');
const router = express.Router();
const { updateProfile, getWalletBalance } = require('../controllers/profileController');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// @route    POST /api/v1/users/updateProfile
// @desc     Update user profile
// @access   Private
router.post('/updateProfile', authMiddleware, upload.single('profilePicture'), updateProfile);

// @route    GET /api/v1/users/balance
// @desc     Get user wallet balance
// @access   Private
router.get('/balance', authMiddleware, getWalletBalance);

module.exports = router;



