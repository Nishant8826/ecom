const express = require('express');
require('dotenv').config();
const Connection = require('./src/utils/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

Connection();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})