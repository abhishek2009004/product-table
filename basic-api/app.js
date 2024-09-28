const express = require('express');
const app = express();

// Middleware for basic authentication
const basicAuth = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        res.set('WWW-Authenticate', 'Basic realm="Access to API"');
        return res.status(401).send('Authentication required');
    }

    // Extract the Base64 encoded credentials
    const credentials = Buffer.from(auth.split(' ')[1], 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Simple username and password check
    if (username === 'Abhishek' && password === '123456') {
        return next();
    } else {
        return res.status(401).send('Invalid credentials');
    }
};

// Simple validation function
const validateNumbers = (num1, num2) => {
    return !isNaN(num1) && !isNaN(num2);
};

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Math API! Use /add to add two numbers.');
});

// GET route for adding two numbers with basic validation
app.get('/add', basicAuth, (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    // Check if query params are provided and valid
    if (req.query.num1 === undefined || req.query.num2 === undefined) {
        return res.status(400).send('Missing required query parameters: num1 and num2');
    }

    if (!validateNumbers(num1, num2)) {
        return res.status(400).send('Query parameters must be valid numbers');
    }

    // Add the numbers and return the result
    const result = num1 + num2;

    // Get the server's base URL
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Send the result and server URL back
    res.json({
        result,
        serverUrl: baseUrl // Include the server URL in the response
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
