const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');

const InquiryPost = sequelize.define(
    'inquiryPosts', {
        inquiryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        writtenBy: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'userId'
            },
            allowNull: false
        },
        inquiryType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
}, {
        timestamps: true,    
        updatedAt: false
    }
);

module.exports = InquiryPost;