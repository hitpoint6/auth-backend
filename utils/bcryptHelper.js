const bcrypt = require('bcrypt'); //  For hashing and verifying passwords

const saltRounds = 10; // Higher values mean better security but slower performance

async function hash(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    return hash;
}

async function comparePasswords(inputPassword, storedHash) {
    const match = await bcrypt.compare(inputPassword, storedHash);
    return match;
}

module.exports = { hash, comparePasswords };
