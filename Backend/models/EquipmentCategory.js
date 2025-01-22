const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EquipmentCategory = sequelize.define('EquipmentCategory', {
    CategoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CategoryName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'EquipmentCategories',
    timestamps: false
});

module.exports = EquipmentCategory;
