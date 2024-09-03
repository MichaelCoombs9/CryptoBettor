const User = require('../models/User'); // Assuming you have a User model
const cloudinary = require('cloudinary').v2; // Optional: If using Cloudinary for image storage

// Configure Cloudinary (if used)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Update user profile function
const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        let profilePictureUrl = req.user.profilePicture; // Default to current picture

        if (req.file) {
            // If a new profile picture is uploaded, handle the upload
            const result = await cloudinary.uploader.upload(req.file.path);
            profilePictureUrl = result.secure_url;
        }

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, profilePicture: profilePictureUrl },
            { new: true }
        );

        res.json({ user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Server error');
    }
};

// Get wallet balance function
const getWalletBalance = async (req, res) => {
    try {
        // Assuming the User model has a `walletBalance` field
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ walletBalance: user.walletBalance });
    } catch (error) {
        console.error('Error fetching wallet balance:', error);
        res.status(500).send('Server error');
    }
};

module.exports = { updateProfile, getWalletBalance };

