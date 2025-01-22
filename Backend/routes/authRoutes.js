const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const router = express.Router();

// Klucz JWT (z .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Rejestracja nowego klienta
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Walidacja pól
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Sprawdzenie, czy email już istnieje
        const existingCustomer = await Customer.findOne({ where: { email } });
        if (existingCustomer) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        // Hashowanie hasła
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tworzenie nowego klienta
        const newCustomer = await Customer.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Generowanie tokena JWT
        const token = jwt.sign({ id: newCustomer.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
        res.status(500).send('Server Error');
    }
});

// Logowanie klienta
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const customer = await Customer.findOne({ where: { email } });
        if (!customer) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: customer.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Błąd podczas logowania:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;