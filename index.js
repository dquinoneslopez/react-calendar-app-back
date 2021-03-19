const { response } = require('express');
const express = require('express');
require('dotenv').config();

console.log(process.env);

// Create express server
const app = express();

// Public folder
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD - events

// Listen to petitions
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});