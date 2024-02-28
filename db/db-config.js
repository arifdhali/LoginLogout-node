const mysql = require('mysql');
const dotenv = require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
connection.connect((err) => {
    if (err) throw err
    console.log('Database connection successful');
})

module.exports = connection;