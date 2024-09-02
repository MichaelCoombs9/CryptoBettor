const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Simple Route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
