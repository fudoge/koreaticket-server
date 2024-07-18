const { Sequelize,  DataTypes } = require('sequelize')
const sequelize = require('../db/db');

const User = sequelize.define(
    'users',
    {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING(512),
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }
);

module.exports = User;