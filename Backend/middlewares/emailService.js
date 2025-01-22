const nodemailer = require('nodemailer');

// Konfiguracja transportera SMTP dla WP
const transporter = nodemailer.createTransport({
    host: 'smtp.wp.pl', // Serwer SMTP WP
    port: 465,          // Port SSL
    secure: true,       // Używaj SSL
    auth: {
        user: process.env.EMAIL_USER, // Pełny adres e-mail z pliku .env
        pass: process.env.EMAIL_PASS  // Hasło do konta WP
    },
    logger: true,  // Włącz logi
    debug: true    // Włącz debugowanie
});

// Funkcja do wysyłania e-maili
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Nadawca (Twój e-mail na WP)
            to,                          // Odbiorca
            subject,                     // Temat wiadomości
            text                         // Treść wiadomości
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email wysłany: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;
