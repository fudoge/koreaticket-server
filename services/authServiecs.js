const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateUUID = require('../utils/generateUUID');
const generateTempPassword = require('../utils/generateTempPassword');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');
const { validationResult } = require('express-validator');
const userRepository = require('../repository/userRepository');
const tempPasswordMailer = require('../utils/tempPasswordMailer');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // 이메일주소로 db매칭
        const foundUser = await userRepository.findUserByEmail(email);
        if (!foundUser) {
            return res.status(400).json({ error: "Cannot find User" });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Password does not match" });
        }

        // 토근 생성 및 응답.
        const accessToken = generateAccessToken({ userId: foundUser.userId, email });
        const refreshToken = generateRefreshToken({ userId: foundUser.userId, email });

        // 리프레시토큰 업데이트
        await userRepository.updateUserRefreshToken(foundUser.userId, refreshToken);

        return res.json({ accessToken, refreshToken });
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
};

exports.register = async (req, res) => {
    const { userName, email, password } = req.body;
    
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ err: "유효하지 않은 이메일" });
    }

    // 이메일주소로 db매칭 후 이미 있다면 생성하지 않음
    const foundUser = await userRepository.findUserByEmail(email);
    if (foundUser) {
        return res.status(400).json({ error: "User already exists" });
    }    

    // 비밀번호 암호화..
    const hashedPW = await bcrypt.hash(password, 10);
    
    try {
        const userId = generateUUID();
        const refreshToken =  generateRefreshToken({userId: userId, email: email});
        const newUser = await userRepository.createUser({
            userId: userId,
            userName: userName,
            email: email,
            password: hashedPW,
            refreshToken: refreshToken
        });d
        return res.status(201).json(newUser); //TODO: body 안보내기로
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);

    try {
        const foundUser = await userRepository.findUserByRefreshToken(token);
        if (!foundUser) return res.status(403).json({ err: "Invalid refresh token" });

        jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) return res.status(403).json({ err: "Invalid refresh token" });

            const accessToken = generateAccessToken({ userId: user.userId, email: user.email });
            return res.json({ accessToken });
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.logout = async (req, res) => {

    try {
        await userRepository.updateUserRefreshToken(req.user.userId, null);
        return res.sendStatus(204);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.changePW = async (req, res) => {
    const userId = req.user.userId;
    const { password, newPassword } = req.body;

    try {
        const foundUser = await userRepository.findUserByUserId(userId);
        const isMatch = await bcrypt.compare(password, foundUser.password);
        const hashedPW = await bcrypt.hash(newPassword, 10);

        if (!isMatch) {
            return res.status(400).json({ error: "Password does not match" });
        }
        
        await userRepository.updateUserPassword(userId, hashedPW);
        return res.sendStatus(204);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    } 
}

exports.verifyPasswordBeforeQuit = async (req, res) => {
    const userId = req.user.userId;
    const { password } = req.body;

    try {
        const foundUser = await userRepository.findUserByUserId(userId);
        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Password does not match" });
        }

        return res.sendStatus(204);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
}

exports.quitService = async (req, res) => {
    const userId = req.user.userId;

    try {
        await userRepository.deleteUserByUserId(userId);
        return res.sendStatus(204);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.getTemporaryPassword = async (req, res) => {
    const { email } = req.body;

    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({ err: "유효하지 않은 이메일" });
    }

    try {
        const foundUser = await userRepository.findUserByEmail(email);
        if (!foundUser) return res.status(404).json("No Email Found");

        const temporaryPassword = generateTempPassword(foundUser.password);
        const hashedPW = await bcrypt.hash(temporaryPassword, 10);        

        await userRepository.updateUserPassword(foundUser.userId, hashedPW);
        await tempPasswordMailer.sendTempPassword(email, foundUser.userName, temporaryPassword);

        return res.sendStatus(204);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};