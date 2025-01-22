const axios = require('axios');
require('dotenv').config();

const sendNotification = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.FUNCTION_APP_URL}/api/sendNotification`,
            data,
            {
                headers: {
                    'x-functions-key': process.env.FUNCTION_KEY,
                },
            }
        );
        console.log('Notification sent:', response.data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = { sendNotification };
