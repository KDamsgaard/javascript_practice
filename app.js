const express = require('express');
const mongo = require('mongodb');
const path = require('path');
const tools = require('./scripts/tools.js')

const app = express();
const port = 8080;
const client = mongo.MongoClient;
const mongoURL = "mongodb://localhost:27017/"

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/css', express.static(path.join(__dirname, 'css')));


app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});

app.post('/login', (req, res) => {
    let user = req.body.username;
    let pw = req.body.password;
    var success = tools.attemptLogin(user, pw);
    if (tools.attemptLogin(user, pw) == true) {
        res.send(`Hello, ${user}!`);
    } else {
        console.log("Unknown user. Try again.");
        res.redirect('/login');
    }
});

app.get('/users/create', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/create_user.html'));
});

app.post('/users/create', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    

    client.connect(mongoURL, (err, db) => {
        if (err) throw err;
        var dbo = db.db('javascript_practice');
        var user = {username: username, email: email, password: password}

        dbo.collection('users').insertOne(user, (err, res) => {
            if (err) throw err;
            console.log(`Inserted user \"${username}\" into database...`);
            db.close();
        });
    });

    res.redirect('/login');
});

app.listen(port, () => {
    console.log('Server running on localhost:' + port + "...");
});
