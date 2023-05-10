// load lib
const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3');
const session = require('express-session');
const body_parser = require('body-parser');

// load func.js
const func = require('./route/func.js');

// load route
const board = require('./route/board.js').board;
const board_add = require('./route/board_add.js').board_add;
const board_read = require('./route/board_read.js').board_read;
const board_edit = require('./route/board_edit.js').board_edit;

const project = require('./route/project.js').project;

const set_code = require('./route/set_code.js').set_code;
const set_code_add = require('./route/set_code_add.js').set_code_add;

const signin = require('./route/signin.js').signin;
const signup = require('./route/signup.js').signup;

// set lib
const app = express();
const port = 3000;

app.use(body_parser.json());
app.set('json spaces', 2)

// set template
app.set('view engine', 'html');
nunjucks.configure('view', {
    autoescape: true,
    express: app,
    watch: true
});

// set db
const db = new sqlite3.Database('data.db');

// create table
db.serialize(function() {
    // code_id, set_name, code_data, set_data
    db.run("create table if not exists set_data (code_id longtext, set_name longtext, code_data longtext, set_data longtext)");
    // doc_id, set_name, doc_data, set_data
    db.run("create table if not exists bbs_data (doc_id longtext, set_name longtext, doc_data longtext, set_data longtext)");
    // user_name, set_name, user_data, set_data
    db.run("create table if not exists user_data (user_name longtext, set_name longtext, user_data longtext, set_data longtext)");
});

// init secret key
new Promise(function(resolve) {
    db.all("select set_data from set_data where set_name = 'secret_key'", [], function(err, db_data) {
        let random_key = '';
        if(db_data.length === 0) {
            random_key = func.get_random_key();
            db.run("insert into set_data (code_id, set_name, code_data, set_data) values ('', 'secret_key', '', ?)", [random_key]);
        } else {
            random_key = db_data[0].set_data;
        }

        resolve(random_key);
    });
}).then(function(random_key) {
    // session init
    app.use(session({
        secret: random_key,
        resave: false,
        saveUninitialized: true
    }));

    // session pass
    app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
    });
    db.close();
}).then(function() {
    // url route
    for(let for_a = 0; for_a < 2; for_a++) {
        let ex = '';
        if(for_a === 1) {
            ex = 'ex';
        }

        app.get('/' + ex, function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });

        app.get((ex === 'ex' ? '/ex' : '') + '/intro', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });

        app.get((ex === 'ex' ? '/ex' : '') + '/project', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });
        app.get((ex === 'ex' ? '/ex' : '') + '/project/:id', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });
        app.get((ex === 'ex' ? '/ex' : '') + '/project_add', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });

        app.get((ex === 'ex' ? '/ex' : '') + '/board/:b_name', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });
        app.get((ex === 'ex' ? '/ex' : '') + '/board_add/:b_name', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });
        app.get((ex === 'ex' ? '/ex' : '') + '/board_edit/:b_name/:id', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });
        app.get((ex === 'ex' ? '/ex' : '') + '/board_read/:b_name/:id', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });

        app.get((ex === 'ex' ? '/ex' : '') + '/study', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });

        app.get((ex === 'ex' ? '/ex' : '') + '/signup', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });
        app.get((ex === 'ex' ? '/ex' : '') + '/signin', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });
        app.get((ex === 'ex' ? '/ex' : '') + '/signout', function(req, res) { req.session['user_name'] = undefined; res.redirect('/' + ex) });

        app.get((ex === 'ex' ? '/ex' : '') + '/set', function(req, res) { res.render('index' + (ex === 'ex' ? '_ex' : ''), {}) });
    }

    // api route - get
    app.get('/api/board/:b_name', board);
    app.get('/api/board_read/:b_name/:id', board_read);
    
    app.get('/api/set/code', set_code);
    
    app.get('/api/project', project);

    // api route - post
    app.post('/api/board_edit/:b_name/:id', board_edit);
    app.post('/api/board_add/:b_name', board_add);

    app.post('/api/signin', signin);
    app.post('/api/signup', signup);

    app.post('/api/set/code/add', set_code_add);

    // url route sys
    app.get('/view/:url*', function(req, res) { res.sendFile(__dirname + "/view/" + req.params['url'] + req.params[0]) });
    app.use(function(req, res) { res.status(404).redirect('/') });

    // run
    app.listen(port, function() { console.log("Run in " + String(port)) });
});