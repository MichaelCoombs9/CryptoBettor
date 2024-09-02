const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // Check if the username already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        // Check if the email already exists
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Create and save the new user
        user = new User({ username, email, password });
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).send('Server error');
    }
};

console.log(process.env.JWT_SECRET);

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
