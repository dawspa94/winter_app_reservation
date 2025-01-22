const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rental = sequelize.define('Rental', {
    RentalID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CustomerID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    EquipmentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RentalStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    RentalEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    RentalStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Aktywny'
    },
    RentalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    TotalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'Rentals',
    timestamps: false,
});

module.exports = Rental;