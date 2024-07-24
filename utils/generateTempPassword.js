const generateTempPassword = (prevPassword) => {
    return (prevPassword + Date.now()).toString('base64').substring(0, 12).replace(/[^a-zA-Z0-9]/g, '');
};

module.exports = generateTempPassword;