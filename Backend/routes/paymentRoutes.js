const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Pobierz wszystkie płatności
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.findAll();
        if (!payments || payments.length === 0) {
            return res.status(404).json({ error: 'No payments found.' });
        }
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Błąd podczas pobierania płatności.' });
    }
});

// Dodaj nową płatność
router.post('/', async (req, res) => {
    try {
        const { RentalID, PaymentDate, Amount, PaymentMethod } = req.body;
        if (!RentalID || !PaymentDate || !Amount) {
            return res.status(400).json({ error: 'RentalID, PaymentDate, and Amount are required.' });
        }

        const newPayment = await Payment.create({
            RentalID,
            PaymentDate,
            Amount,
            PaymentMethod
        });

        res.status(201).json(newPayment);
    } catch (error) {
        console.error('Error adding payment:', error);
        res.status(500).json({ error: 'Błąd podczas dodawania płatności.' });
    }
});

module.exports = router;
