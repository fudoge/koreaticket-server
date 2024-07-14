const { Sequelize,  DataTypes } = require('sequelize')
const sequelize = require('../db/db');

const ReviewPost = sequelize.define(
    'reviewPosts',
    {
        postid: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        writtenby: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'uuid'
            }
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.DataTypes.TEXT
        }
    }
);

module.exports = ReviewPost;