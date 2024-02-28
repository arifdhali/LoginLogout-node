const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connection = require('./db/db-config');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/login');
});


app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard');
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.send('An error occurred');
            return;
        }

        if (results.length > 0) {
            res.redirect("/dashboard");
        } else {
            res.render('pages/login', results);
        }
    });
});


app.post('/create', (req, res) => {
    const { username, email, password } = req.body;
    let insertSQL = 'INSERT INTO users (username,email,password) VALUES(?,?,?)';
    connection.query(insertSQL, [username, email, password], (err, result) => {

        if (err) {
            console.log("Error inserting");
        } else {
            res.redirect("dashboard");
        }

    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
