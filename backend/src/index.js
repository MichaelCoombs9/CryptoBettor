const express = require('express');
const connectDB = require('./config/db'); // Database connection
const dotenv = require('dotenv');
const poolRoutes = require('./routes/poolRoutes'); // Pool routes
const profileRoutes = require('./routes/profileRoutes'); // Profile routes

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Define Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/pools', poolRoutes); // Use the imported poolRoutes
app.use('/api/v1/users', profileRoutes); // Use the imported profileRoutes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



