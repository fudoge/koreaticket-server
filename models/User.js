const Sequelize = require('sequelize');
const sequelize = new Sequelize('kticket_example', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

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