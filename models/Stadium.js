const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Stadium = sequelize.define(
    'stadiums', {
        stadiumId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        stadiumName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(512),
            allowNull: false
        }, 
        areaInfo: {
            type: DataTypes.STRING,
            allowNull: false
        }
}, {
        timestamps: false
    }
);

module.exports = Stadium;