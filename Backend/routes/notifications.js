const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNotification = async ({ email, message }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Potwierdzenie rezerwacji',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Powiadomienie wysłane do:', email);
  } catch (error) {
    console.error('Błąd podczas wysyłania powiadomienia:', error);
  }
};

module.exports = { sendNotification };