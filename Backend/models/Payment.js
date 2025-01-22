const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
    PaymentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RentalID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PaymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    PaymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'Payments',
    timestamps: false
});

module.exports = Payment;
