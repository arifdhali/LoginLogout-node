const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connection = require('./db/db-config');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'testing form12',
    resave: true,
    saveUninitialized: true,
}));

// Middleware to check if the user is authenticated before accessing /dashboard
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};

// Middleware to redirect to /dashboard if the user is already authenticated
const redirectToDashboardIfAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

// Apply the redirectToDashboardIfAuthenticated middleware to / and /login routes
app.get("/", redirectToDashboardIfAuthenticated, (req, res) => {
    res.render("pages/index");
});
app.get("/login", redirectToDashboardIfAuthenticated, (req, res) => {
    res.render("pages/index");
});
app.get("/register", authenticateUser, (req, res) => {
    res.render("pages/dashboard");
});

app.get("/dashboard", authenticateUser, (req, res) => {
    res.render("pages/dashboard");
});
// logout 
app.get("/logout", authenticateUser, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        } else {
            res.redirect('/');
        }
    })
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    let emailPassQuery = 'SELECT * FROM users WHERE email = ?';

    // checking to the db
    connection.query(emailPassQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        if (result.length > 0) {
            let storedPass = result[0].password;

            if (storedPass === password) {
                // Set user session
                req.session.user = email;
                res.status(200).redirect("/dashboard");
            } else {
                res.status(401).json({ success: false, message: "Invalid password" });
            }
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    });
});
// register users
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    let sendingDataQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    // sending to the db
    connection.query(sendingDataQuery, [username, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        } else {
            req.session.user = email;
            res.redirect("/dashboard");
        }
    });
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
