const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const generateUUID = require('../utils/generateUUID');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 이메일주소로 db매칭
        const foundUser = await User.findOne({ where: { email: email } });
        if (!foundUser) {
            res.status(400).json({ error: "Cannot find User" });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            res.status(400).json({ error: "Password does not match" });
        }

        // 토근 생성 및 응답.
        const accessToken = generateAccessToken({email});
        const refreshToken = generateRefreshToken({email});

        // 리프레시토큰 업데이트
        await User.update(
            { refreshToken: refreshToken },
            {
                where: {
                    uuid: foundUser.uuid
                }
            }
        );

        res.json({accessToken, refreshToken});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
        
    
});

router.post('/register', body('email').isEmail(),  async (req, res) => {
    const { userName, email, password } = req.body;
    
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ err: "유효하지 않은 이메일" });
    }
    // 비밀번호 암호화..
    const hashedPW = await bcrypt.hash(password, 10);
    
    try {
        const uuid = generateUUID();
        const refreshToken =  generateRefreshToken({email});
        const newUser = await User.create({
            uuid,
            userName,
            email,
            password: hashedPW,
            refreshToken
        });
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

router.post('/refresh', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);

    try {
        const foundUser = await User.findOne({ where: { refreshToken: token } });
        if (!foundUser) return res.status(403).json({ err: "Invalid refresh token" });

        jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) return res.status(403).json({ err: "Invalid refresh token" });

            const accessToken = generateAccessToken({ email: user.email });
            res.json({ accessToken });
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;