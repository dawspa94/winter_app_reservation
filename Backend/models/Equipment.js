const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipment = sequelize.define('Equipment', {
    EquipmentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PricePerDay: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'Equipment'
});

module.exports = Equipment;