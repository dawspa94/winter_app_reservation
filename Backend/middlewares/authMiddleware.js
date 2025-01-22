const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Token z nagłówka Authorization

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.customer = verified; // Przekazanie danych z tokena do requestu
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
