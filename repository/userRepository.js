const { User } = require('../models/model');

exports.findUserByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email: email } });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.findUserByUserId = async (userId) => {
    try {
        return await User.findOne({ where: { userId: userId } });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.findUserByRefreshToken = async (refreshToken) => {
    try {
        return await User.findOne({ where: { refreshToken: refreshToken } });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.updateUserRefreshToken = async (userId, refreshToken) => {
    try {
        return await User.update({ refreshToken: refreshToken }, { where: { userId: userId } });
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.updateUserPassword = async (userId, newPassword) => {
    try {
        return await User.update({ password: newPassword }, { where: {userId: userId}});
    } catch (e) {
        throw new Error(e.message);
    }
}

exports.createUser = async (userData) => {
    try {      
        return await User.create(userData);
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.deleteUserByUserId = async (userId) => {
    try {
        return await User.destroy({ where: { userId } });
    } catch (e) {
        throw new Error(e.message);
    }
};