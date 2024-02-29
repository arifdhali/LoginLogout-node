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
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))


app.get("/", (req, res) => {
    res.render("pages/index", [{ title: "Login page" }]);


})
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.render("pages/index", [{ title: "Login page" }]);


})





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
