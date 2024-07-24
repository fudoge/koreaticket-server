const transporter = require('./nodeMailer');

exports.sendTempPassword = async (email, userName, temporaryPassword) => {
    try {
        await transporter.sendMail({
            from: `KoreaTicket Team <${process.env.EMAIL_USER}>`,
            to: `${email}`,
            subject: `${userName}님, 임시 비밀번호를 발급해 드립니다.`,
            text: `임시 비밀번호입니다: ${temporaryPassword} \n새로운 비밀번호로 변경해주시길 바랍니다.`
        });
    } catch (e) {
        throw new Error(e.message);
    }
};