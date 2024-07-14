const { Sequelize,  DataTypes } = require('sequelize')
const sequelize = require('../db/db');

const User = sequelize.define(
    'users',
    {
        uuid: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        userName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING(512),
            allowNull: false
        },
        refreshToken: {
            type: Sequelize.DataTypes.STRING(512),
        },
        isAdmin: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }
);

module.exports = User;