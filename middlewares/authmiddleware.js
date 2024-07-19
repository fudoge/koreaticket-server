const JWT = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: "no token"});
    }

    JWT.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Token expired" });
            }
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;