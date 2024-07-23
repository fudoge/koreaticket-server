const transporter = require('./nodeMailer');

exports.sendTempPassword = async (email, userName, temporaryPassword) => {
    transporter.sendMail({
        from: `KoreaTicket Team <${process.env.user}>`,
        to: `${email}`,
        subject: `${userName}님, 임시 비밀번호를 발급해 드립니다.`,
        text: `임시 비밀번호입니다: ${temporaryPassword}`
    });
};