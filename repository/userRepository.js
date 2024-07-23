const { User } = require('../models/model');

exports.findUserByEmail = async (email) => {
    return await User.findOne({ where: { email: email } });
};

exports.findUserByUserId = async (userId) => {
    return await User.findOne({ where: { userId: userId } });
};

exports.findUserByRefreshToken = async (refreshToken) => {
    return await User.findOne({ where: { refreshToken: refreshToken } });
};

exports.updateUserRefreshToken = async (userId, refreshToken) => {
    return await User.update({ refreshToken: refreshToken }, { where: { userId: userId } });
};

exports.updateUserPassword = async (userId, newPassword) => {
    return await User.update({ password: newPassword }, { where: {userId: userId}});
}

exports.createUser = async (userData) => {
    return await User.create(userData);
};

exports.deleteUserByUserId = async (userId) => {
    return await User.destroy({ where: { userId } });
};