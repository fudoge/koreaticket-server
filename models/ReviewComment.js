const { Sequelize,  DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const ReviewComment = sequelize.define(
    'reviewComments', {
        commentid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        writtenby: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'uuid'
            }
        },
        postid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ReviewArticle,
                key: 'postid'
            }
        }
    }
);

module.exports = ReviewComment;