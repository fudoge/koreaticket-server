const { v4: uuidv4 } = require('uuid');

const generateUUID = () => {
    const uuidSegments = uuidv4().split('-');
    return uuidSegments[0] + uuidSegments[1] + uuidSegments[2] + uuidSegments[3] + uuidSegments[4];
}

module.exports = generateUUID;