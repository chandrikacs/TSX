// app.js
const express = require('express');
const db = require('./config/db'); // Import the connection pool
const menteeRoutes = require('./routes/menteeRoutes'); // Import mentee routes
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());// Middleware to parse JSON requests

     

// Use mentee routes
app.use('/mentee', menteeRoutes); // Prefix all mentee routes with /mentee

// Start the server
const PORT = process.env.PORT || 5000; // Use the PORT from .env or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
