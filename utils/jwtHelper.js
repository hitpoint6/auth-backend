const jwt = require('jsonwebtoken'); // Creating and verifying tokens

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function sign(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token will expire in 1 hour
}

function verify(token) {
    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (err) {
        return null;
    }
}

module.exports = { sign, verify };
