const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const InquiryPost = require('./InquiryPost');

const InquiryReply = sequelize.define(
    'inquiryReplies', {
        replyId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: InquiryPost,
                key: 'inquiryId',
                unique: true
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
}, {
        timestamps: true,
        updatedAt: false,
    }
);


module.exports = InquiryReply;