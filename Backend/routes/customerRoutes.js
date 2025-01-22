const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Pobierz wszystkich klientów
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        if (!customers || customers.length === 0) {
            return res.status(404).json({ error: 'No customers found.' });
        }
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Błąd podczas pobierania klientów.' });
    }
});

// Dodaj nowego klienta
router.post('/', async (req, res) => {
    try {
        const { FirstName, LastName, Email, PhoneNumber, Address, DateOfBirth } = req.body;

        if (!FirstName || !LastName || !Email) {
            return res.status(400).json({ error: 'FirstName, LastName, and Email are required fields.' });
        }

        const newCustomer = await Customer.create({
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Address,
            DateOfBirth
        });

        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ error: 'Błąd podczas dodawania klienta.' });
    }
});




module.exports = router;
