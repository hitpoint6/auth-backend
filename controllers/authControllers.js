const User = require('../models/user');
const connectToDB = require('../utils/database');
const { sign, verify } = require('../utils/jwtHelper');
const { hash, comparePasswords } = require('../utils/bcryptHelper');
require('dotenv').config();


// Create an authentication middleware to protect backend resources
function authenticate(req, res, next) {
    const token = req.cookies.token;
    console.log("Token:", token);

    if (!token) {
        return res.status(401).send("Authentication required");
    }
    const decoded = verify(token);

    if (!decoded) {
        return res.status(401).send("Invalid token");
    }

    req.user = decoded;
    next();
}

// Example use of the middleware: 
// app.get("/dashboard", authenticate, (req, res) => {
//     // The user is authenticated at this point
//     // You can access the user's data using req.user
//     res.send("Welcome to the dashboard!");
// });


exports.getStatus = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ isAuthenticated: false });
    }

    try {
        // Verify the token with secret
        verify(token);

        // If verification is successful, send authenticated status
        return res.json({ isAuthenticated: true });
    } catch (error) {
        console.error("Error validating token:", error);
        return res.json({ isAuthenticated: false });
    }
}

exports.signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(401).send("Details missing");
        return;
    }
    connectToDB();
    const user = await User.findOne({ email: req.body.email });
    if (user !== null) {
        res.status(401).send("User already exists");
        console.log("User already exists");
        return;
    }

    try {
        const newUser = new User({
            email: req.body.email,
            password: await hash(req.body.password),
            createdAt: new Date(),
        });
        await newUser.save();

        const token = sign({ email: newUser.email });
        res.cookie('token', token, { httpOnly: true }); // Secure flag for HTTPS, adjust accordingly
        res.status(200).send("User created");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal server error");
    }
}

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).send("Details missing");
    }
    connectToDB();
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        return res.status(401).send("Invalid email or password.");
    }
    try {
        const match = await comparePasswords(req.body.password, user.password);
        if (!match) {
            return res.status(401).send("Invalid email or password.");
        }
        const token = sign({ email: user.email });
        res.cookie('token', token, { httpOnly: true }); // Secure flag for HTTPS, adjust accordingly
        res.status(200).send("Successfully signed in!");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal server error");
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).send("Logged out");
}