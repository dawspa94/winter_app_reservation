require('dotenv').config(); // Ładowanie zmiennych środowiskowych
const sendEmail = require('./emailService'); // Import funkcji wysyłania e-maila

(async () => {
    try {
        await sendEmail(
            'sojka.marcin@gmail.com', // Adres odbiorcy
            'Testowy e-mail z WP',        // Temat wiadomości
            'To jest testowy e-mail wysłany za pomocą Nodemailer i WP.' // Treść wiadomości
        );
        console.log('E-mail wysłany pomyślnie!');
    } catch (error) {
        console.error('Błąd podczas wysyłania e-maila:', error);
    }
})();
