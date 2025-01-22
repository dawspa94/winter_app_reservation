const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Ścieżka do pliku JSON z użytkownikami
const usersFilePath = path.join(__dirname, 'users.json');
let users = [];
if (fs.existsSync(usersFilePath)) {
  users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
}

// Klucz do JWT
const JWT_SECRET = process.env.JWT_SECRET || 'super_tajny_kod';

// Import routes
const equipmentRoutes = require('./routes/equipmentRoutes');
const customerRoutes = require('./routes/customerRoutes');
const equipmentCategoryRoutes = require('./routes/equipmentCategoryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const rentalRoutes = require('./routes/rentalRoutes'); // Importuj rentalRoutes
const authRoutes = require('./routes/authRoutes');

// Podłączenie tras
app.use('/api/equipment', equipmentRoutes); // Sprzęt
app.use('/api/customers', customerRoutes); // Klienci
app.use('/api/equipment-categories', equipmentCategoryRoutes); // Kategorie sprzętu
app.use('/api/payments', paymentRoutes); // Płatności
app.use('/api/rentals', rentalRoutes); // Wypożyczenia/rezerwacje
app.use('/api/auth', authRoutes); // Autoryzacja

// Obsługa błędów dla nieznanych tras
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Uruchom serwer
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});