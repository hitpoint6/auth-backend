const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); // for parsing the body of post requests
const cookieParser = require('cookie-parser'); // Get cookies from client
const authRoutes = require('./routes/authRoutes');
const config = require('./config');

// Mount middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
})); // enable all origins to access
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);


// Start server
app.listen(config.port, () => {
    console.log(`Auth app listening at http://localhost:${config.port}`);
})
