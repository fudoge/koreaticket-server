const JWT = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return JWT.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
    return JWT.sign(user, process.env.JWT_REFRESH_KEY, { expiresIn: "7d" });
};

module.exports = { generateAccessToken, generateRefreshToken };