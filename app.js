// load lib
const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3');

// set lib
const app = express();
const port = 3000;

app.set('view engine', 'html');
nunjucks.configure('view', {
    autoescape: true,
    express: app
});

// db init
const db = new sqlite3.Database('data.db');

db.serialize(() => {
    db.run("create table if not exists bbs_data (doc_id, set_name, doc_data, set_data longtext)");
});

// url route
app.get('/', (req, res) => { res.render('index', {}) });

app.get('/intro', (req, res) => { res.render('index', {}) });
app.get('/project', (req, res) => { res.render('index', {}) });
app.get('/board', (req, res) => { res.render('index', {}) });
app.get('/study', (req, res) => { res.render('index', {}) });

app.get('/signup', (req, res) => { res.render('index', {}) });
app.get('/signin', (req, res) => { res.render('index', {}) });

// url route sys
app.get('/view/:url*', (req, res) => { res.sendFile(__dirname + "/view/" + req.params['url'] + req.params[0]) });
app.use(function(req, res) { res.status(404).redirect('/') });

// run
app.listen(port, () => { console.log("Run in " + String(port)) });