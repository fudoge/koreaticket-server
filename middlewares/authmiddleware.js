const JWT = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) { res.sendStatus(401); }
    JWT.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            // 토큰 만료로 인한 오류인 경우
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