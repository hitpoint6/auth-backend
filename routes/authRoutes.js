const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Create an authentication middleware to protect backend resources
function authenticate(req, res, next) {
    const token = req.cookies.token;

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


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/auth/status', authController.getStatus);

module.exports = router;