const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); // for parsing the body of post requests
// const session = require('express-session'); // Use server's memory to store session data
const cookieParser = require('cookie-parser'); // Get cookies from client
require('dotenv').config(); // GET environment variables from .env file
const { sign, verify } = require('./utils/jwtHelper'); // Creating and verifying tokens
const { hash, comparePasswords } = require('./utils/bcryptHelper'); // For hashing and verifying passwords

let Users = []
const port = 3001;

// used to mount middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
})); // enable all origins to access
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(session({ secret: "Your secret key" }));


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/api/auth/status", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ isAuthenticated: false });
    }

    try {
        // Verify the token with your secret
        verify(token);

        // If verification is successful, send authenticated status
        return res.json({ isAuthenticated: true });
    } catch (error) {
        console.error("Error validating token:", error);
        return res.json({ isAuthenticated: false });
    }
})

app.post("/api/signup", async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(401).send("Details missing");
        return;
    }
    const user = Users.filter(user => user.email === req.body.email);
    if (user.length !== 0) {
        res.status(401).send("User already exists");
        console.log("User already exists");
        return;
    }

    try {
        const newUser = {
            email: req.body.email,
            password: await hash(req.body.password)
        }
        Users.push(newUser);

        const token = sign({ email: newUser.email });
        res.cookie('token', token, { httpOnly: true }); // Secure flag for HTTPS, adjust accordingly
        res.status(200).send("User created");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal server error");
    }
})

app.post("/api/login", async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).send("Details missing");
    }
    const user = Users.find(user => user.email === req.body.email);
    if (!user) {
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


})


app.post("/api/logout", (req, res) => {
    res.clearCookie('token'); // Assuming 'token' is the name of your cookie
    res.status(200).send("Logged out");
})

// Create an authentication middleware
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

app.get("/dashboard", authenticate, (req, res) => {
    // The user is authenticated at this point
    // You can access the user's data using req.user
    res.send("Welcome to the dashboard!");
});

app.listen(port, () => {
    console.log(`Auth app listening at http://localhost:${port}`);
})
