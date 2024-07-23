const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');
const ReviewPost = require('./ReviewPost');

const ReviewComment = sequelize.define(
    'reviewComments', {
        commentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
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
        postid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ReviewPost,
                key: 'postid'
            }
        }
    }
);

module.exports = ReviewComment;