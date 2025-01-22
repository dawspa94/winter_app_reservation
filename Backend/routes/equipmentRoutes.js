const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment'); // Model sprzętu
const Rental = require('../models/Rental'); // Model wypożyczenia

// Pobierz wszystkie sprzęty
router.get('/', async (req, res) => {
    try {
        const equipment = await Equipment.findAll();
        res.status(200).json(equipment);
    } catch (error) {
        console.error('Błąd podczas pobierania sprzętu:', error);
        res.status(500).json({ error: 'Błąd podczas pobierania sprzętu.' });
    }
});

// Pobierz sprzęt po ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await Equipment.findByPk(id);
        if (!equipment) {
            return res.status(404).json({ message: 'Sprzęt nie znaleziony.' });
        }
        res.status(200).json(equipment);
    } catch (error) {
        console.error('Błąd podczas pobierania sprzętu:', error);
        res.status(500).json({ error: 'Błąd podczas pobierania sprzętu.' });
    }
});

// Dodaj nowy sprzęt
router.post('/', async (req, res) => {
    try {
        const { Name, CategoryID, Quantity, PricePerDay } = req.body;
        const newEquipment = await Equipment.create({
            Name,
            CategoryID,
            Quantity,
            PricePerDay
        });
        res.status(201).json(newEquipment);
    } catch (error) {
        console.error('Błąd podczas dodawania sprzętu:', error);
        res.status(500).json({ error: 'Błąd podczas dodawania sprzętu.' });
    }
});

// Aktualizuj sprzęt
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, CategoryID, Quantity, PricePerDay } = req.body;
        const equipment = await Equipment.findByPk(id);
        if (!equipment) {
            return res.status(404).json({ message: 'Sprzęt nie znaleziony.' });
        }
        equipment.Name = Name;
        equipment.CategoryID = CategoryID;
        equipment.Quantity = Quantity;
        equipment.PricePerDay = PricePerDay;
        await equipment.save();
        res.status(200).json(equipment);
    } catch (error) {
        console.error('Błąd podczas aktualizacji sprzętu:', error);
        res.status(500).json({ error: 'Błąd podczas aktualizacji sprzętu.' });
    }
});

// Usuń sprzęt
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await Equipment.findByPk(id);
        if (!equipment) {
            return res.status(404).json({ message: 'Sprzęt nie znaleziony.' });
        }
        await equipment.destroy();
        res.status(200).json({ message: 'Sprzęt usunięty.' });
    } catch (error) {
        console.error('Błąd podczas usuwania sprzętu:', error);
        res.status(500).json({ error: 'Błąd podczas usuwania sprzętu.' });
    }
});

// Pobierz wypożyczenia klienta
router.get('/customer-rentals/:CustomerID', async (req, res) => {
    try {
        const { CustomerID } = req.params;

        // Pobierz wypożyczenia dla klienta z aliasem 'Equipment'
        const rentals = await Rental.findAll({
            where: { CustomerID },
            include: [
                {
                    model: Equipment,
                    as: 'Equipment', // Użycie aliasu
                    attributes: ['EquipmentID', 'Name'], // Pobierz szczegóły sprzętu
                },
            ],
        });

        if (!rentals || rentals.length === 0) {
            return res.status(404).json({ message: 'Brak aktywnych wypożyczeń dla tego klienta.' });
        }

        res.status(200).json(rentals);
    } catch (error) {
        console.error('Błąd podczas pobierania wypożyczeń klienta:', error);
        res.status(500).json({ error: 'Błąd podczas pobierania wypożyczeń klienta.' });
    }
});

module.exports = router;