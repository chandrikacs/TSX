// routes/menteeRoutes.js
const express = require('express');
const router = express.Router();
const menteeController = require('../controllers/menteeController');

// Define the POST route for mentee signup
router.post('/signup', menteeController.signUp);

// Define the POST route for mentee signin
router.post('/signin', menteeController.signIn);

module.exports = router;
