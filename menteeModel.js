// models/menteeModel.js
const db = require('../config/db');

const Mentee = {
    create: async (mentee) => {
        const [rows] = await db.query(
            'INSERT INTO mentees (email, password_hash, name, age) VALUES (?, ?, ?, ?)',
            [mentee.email, mentee.password_hash, mentee.name, mentee.age]
        );
        return rows;
    },

    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM mentees WHERE email = ?', [email]);
        return rows[0];
    }
};

module.exports = Mentee;
