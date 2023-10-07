const jwt = require('jsonwebtoken'); // For creating and verifying client tokens
require('dotenv').config();

function sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Token will expire in 1 hour
}

function verify(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return null;
    }
}

module.exports = { sign, verify };
