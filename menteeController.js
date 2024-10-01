// controllers/menteeController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Mentee = require('../models/menteeModel');
const dotenv = require('dotenv');
dotenv.config();

// Validation schema
const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required(),
    age: Joi.number().integer().min(18).required()
});

// Sign up function
exports.signUp = async (req, res) => {
    const { error } = signUpSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    console.log('Request body !!!!:', req.body);
    const { email, password, name, age } = req.body;

    try {
        
        // Check if user already exists
        const existingMentee = await Mentee.findByEmail(email);
        if (existingMentee) return res.status(400).json({ error: 'Email already exists' });

        // Hash the password
        const password_hash = await bcrypt.hash(password, 10);

        // Save mentee to database
        await Mentee.create({ email, password_hash, name, age });

        return res.status(201).json({ message: 'Mentee registered successfully' });
    } catch (err) {
        console.error(err); // Log the actual error
        return res.status(500).json({ error: 'Server error' });
    }
};

// Sign in function

exports.signIn = async (req, res) => {
    console.log('Request body:', req.body);
    const { email, password } = req.body;

    try {
        // Find mentee by email
        const mentee = await Mentee.findByEmail(email);
        if (!mentee) return res.status(400).json({ error: 'Invalid credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, mentee.password_hash);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: mentee.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Signed in successfully', token });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
};
