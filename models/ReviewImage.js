const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Reviewpost = require('./ReviewPost');

const ReviewImage = sequelize.define(
    'reviewImages', {
        imageId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }, 
        isThumbNail: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: Reviewpost,
                key: 'postId'
            }
        },
        imagePath: {
            type: DataTypes.STRING(512),
            unique: true,
            allowNull: false
        }
}, {
        timestamps: false
    }
);

module.exports = ReviewImage;