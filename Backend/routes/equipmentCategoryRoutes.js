const express = require('express');
const router = express.Router();
const EquipmentCategory = require('../models/EquipmentCategory');

// Pobierz wszystkie kategorie sprzętu
router.get('/', async (req, res) => {
    try {
        const categories = await EquipmentCategory.findAll();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: 'No categories found.' });
        }
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Błąd podczas pobierania kategorii sprzętu.' });
    }
});

// Dodaj nową kategorię sprzętu
router.post('/', async (req, res) => {
    try {
        const { CategoryName } = req.body;
        if (!CategoryName) {
            return res.status(400).json({ error: 'CategoryName is required.' });
        }

        const newCategory = await EquipmentCategory.create({ CategoryName });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Błąd podczas dodawania kategorii sprzętu.' });
    }
});

module.exports = router;
