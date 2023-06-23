const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('./db/config');
const User = require('./db/User');
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false
    })

);
app.post('/signup', async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ fname, lname, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.status(200).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.status(200).json({ message: 'Sign-in successful', token });
    } catch (error) {
        console.error('Sign-in error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
});

app.listen(2288, function () {
    console.log("server listen on port 2288");
});