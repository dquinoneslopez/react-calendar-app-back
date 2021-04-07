const { response } = require('express');
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

console.log(process.env);

// Create express server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public folder
app.use(express.static('public'));

// Body parsing and reading
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD - events

// Listen to petitions
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});