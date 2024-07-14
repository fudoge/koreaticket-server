const Sequelize = require('sequelize');

const sequelize = new Sequelize('kticket_example', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

module.exports = sequelize;