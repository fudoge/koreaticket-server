const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');

const ReviewPost = sequelize.define(
    'reviewPosts',
    {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        isNotice: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        writtenBy: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'userId'
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        }
    }
);

module.exports = ReviewPost;