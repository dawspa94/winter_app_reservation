const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental'); // Model wypożyczenia
const Equipment = require('../models/Equipment'); // Model sprzętu
const nodemailer = require('nodemailer'); // Dodaj ten import

// Konfiguracja transportera nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
// Pobierz wszystkie wypożyczenia
router.get('/', async (req, res) => {
    try {
        const rentals = await Rental.findAll();
        res.status(200).json(rentals);
    } catch (error) {
        console.error('Błąd podczas pobierania wypożyczeń:', error);
        res.status(500).json({ error: 'Błąd podczas pobierania wypożyczeń.' });
    }
});

// Dodaj nowe wypożyczenie
router.post('/', async (req, res) => {
    try {
        const { FirstName, LastName, Email, Phone, EquipmentID, RentalStartDate, RentalEndDate, RentalQuantity, TotalPrice } = req.body;

        // Tworzenie nowego wypożyczenia
        const newRental = await Rental.create({
            FirstName,
            LastName,
            Email,
            Phone,
            EquipmentID,
            RentalStartDate,
            RentalEndDate,
            RentalQuantity,
            TotalPrice,
            RentalStatus: 'active' // Ustawienie statusu na "active"
        });

        // Aktualizacja ilości sprzętu
        const equipment = await Equipment.findByPk(EquipmentID);
        if (equipment) {
            equipment.Quantity -= RentalQuantity;
            await equipment.save();
        }

        // Wysyłanie e-maila z potwierdzeniem rezerwacji
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: Email,
            subject: 'Potwierdzenie rezerwacji',
            text: `Rezerwacja zakończona sukcesem! Sprzęt ID: ${EquipmentID}, Imię: ${FirstName}, Nazwisko: ${LastName}, Email: ${Email}, Nr telefonu: ${Phone}, Data rozpoczęcia: ${RentalStartDate}, Data zakończenia: ${RentalEndDate}, Ilość: ${RentalQuantity}, Kwota końcowa: ${TotalPrice} PLN`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Błąd podczas wysyłania e-maila:', error);
            } else {
                console.log('E-mail wysłany:', info.response);
            }
        });

        res.status(201).json(newRental);
    } catch (error) {
        console.error('Błąd podczas dodawania rezerwacji:', error);
        res.status(500).send('Server Error');
    }
});

// Aktualizacja statusu wypożyczenia
router.put('/:id/end', async (req, res) => {
    try {
        const rental = await Rental.findByPk(req.params.id);
        if (rental) {
            rental.RentalStatus = 'Zakończony';
            await rental.save();

            // Aktualizacja ilości sprzętu
            const equipment = await Equipment.findByPk(rental.EquipmentID);
            if (equipment) {
                equipment.Quantity += rental.RentalQuantity;
                await equipment.save();
            }

            res.status(200).json(rental);
        } else {
            res.status(404).json({ error: 'Rezerwacja nie znaleziona.' });
        }
    } catch (error) {
        console.error('Błąd podczas aktualizacji rezerwacji:', error);
        res.status(500).json({ error: 'Błąd podczas aktualizacji rezerwacji.' });
    }
});

module.exports = router;