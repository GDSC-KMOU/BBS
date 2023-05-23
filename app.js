// load lib
const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3');
const session = require('express-session');
const body_parser = require('body-parser');
const logger = require('morgan');

// load func.js
const func = require('./route/func.js');

// load route
const board = require('./route/board.js').board;
const board_add = require('./route/board_add.js').board_add;
const board_read = require('./route/board_read.js').board_read;
const board_edit = require('./route/board_edit.js').board_edit;
const board_notice = require('./route/board_notice.js').board_notice;
const board_preview = require('./route/board_preview.js').board_preview;

const project = require('./route/project.js').project;

const study = require('./route/study.js').study;
const study_add = require('./route/study_add.js').study_add;
const study_edit = require('./route/study_edit.js').study_edit;
const study_read = require('./route/study_read.js').study_read;

const set_load = require('./route/set_load.js').set_load;
const set_hcaptcha = require('./route/set_hcaptcha.js').set_hcaptcha;
const set_code_add = require('./route/set_code_add.js').set_code_add;
const set_code_delete = require('./route/set_code_delete.js').set_code_delete;
const set_admin_add = require('./route/set_admin_add.js').set_admin_add;
const set_admin_delete = require('./route/set_admin_delete.js').set_admin_delete;
const set_user_delete = require('./route/set_user_delete.js').set_user_delete;

const signin = require('./route/signin.js').signin;
const signup = require('./route/signup.js').signup;

// set lib
const app = express();
const port = 3000;

app.use(logger('combined'));
app.use(body_parser.json());
app.set('json spaces', 2);

// set template
app.set('view engine', 'html');
nunjucks.configure('view', {
    autoescape: true,
    express: app,
    watch: true
});

// set global var
const sys_ver = 1;

// set db
const db = new sqlite3.Database('data.db');

db.serialize(function() {
    // create table
    // code_id, set_name, code_data, set_data
    db.run("create table if not exists set_data (code_id longtext, set_name longtext, code_data longtext, set_data longtext)");
    // doc_id, set_name, doc_data, set_data
    db.run("create table if not exists bbs_data (doc_id longtext, set_name longtext, doc_data longtext, set_data longtext)");
    // doc_id, set_name, doc_data, set_data
    db.run("create table if not exists project_data (doc_id longtext, set_name longtext, doc_data longtext, set_data longtext)");
    // doc_id, set_name, doc_data, set_data
    db.run("create table if not exists study_data (doc_id longtext, set_name longtext, doc_data longtext, set_data longtext)");
    // user_name, set_name, user_data, set_data
    db.run("create table if not exists user_data (user_name longtext, set_name longtext, user_data longtext, set_data longtext)");

    // update
    db.all("select set_data from set_data where set_name = 'sys_ver'", [], function(err, db_data) {
        let db_ver = 0;
        if(db_data.length != 0) {
            db_ver = Number(db_data[0].set_data);
        }

        if(1 > db_ver) {
            let bbs_list = func.bbs_list();
            for(let for_a = 0; for_a < bbs_list.length; for_a++) {
                db.all("select doc_id, set_name, doc_data from bbs_data where set_data = ?", [bbs_list[for_a]], function(err, db_data) {
                    let data_list = [];

                    let for_b = '';
                    let for_c = {};
                    for(let for_d = 0; for_d < db_data.length; for_d++) {
                        if(db_data[for_d].doc_id !== for_b) {
                            if(for_d !== 0) {                            
                                data_list.push(for_c);
                            }

                            for_c = {};
                            for_b = db_data[for_d].doc_id;
                            for_c['doc_id'] = for_b;
                        }
                        
                        for_c[db_data[for_d].set_name] = db_data[for_d].doc_data;

                        if(for_d === db_data.length - 1) {
                            data_list.push(for_c);
                        }
                    }

                    for(let for_d = 0; for_d < data_list.length; for_d++) {
                        if(data_list[for_d]['user_name_real'] === undefined) {
                            db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'user_name_real', ?, ?)", [
                                data_list[for_d]['doc_id'], 
                                data_list[for_d]['user_name'], 
                                bbs_list[for_a]
                            ]);
                        }
                    }
                });
            }
        }
    });

    // init set
    db.run("delete from set_data where set_name = 'sys_ver' and set_data = ?", [sys_ver]);
    db.run("insert into set_data (code_id, set_name, code_data, set_data) values ('', 'sys_ver', '', ?)", [sys_ver]);
});

new Promise(function(resolve) {
    // init secret key
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
    app.get('/', function(req, res) { res.render('index', {}) });

    app.get('/intro', function(req, res) { res.render('index', {}) });

    app.get('/project', function(req, res) { res.render('index', {}) });
    app.get('/project/:id', function(req, res) { res.render('index', {}) });
    app.get('/project_add', function(req, res) { res.render('index', {}) });

    app.get('/board/:b_name', function(req, res) { res.render('index', {}) });
    app.get('/board_add/:b_name', function(req, res) { res.render('index', {}) });
    app.get('/board_edit/:b_name/:id', function(req, res) { res.render('index', {}) });
    app.get('/board_read/:b_name/:id', function(req, res) { res.render('index', {}) });

    app.get('/study', function(req, res) { res.render('index', {}) });
    app.get('/study_add', function(req, res) { res.render('index', {}) });
    app.get('/study_edit/:id', function(req, res) { res.render('index', {}) });

    app.get('/signup', function(req, res) { res.render('index', {}) });
    app.get('/signin', function(req, res) { res.render('index', {}) });
    app.get('/signout', function(req, res) { req.session['user_name'] = undefined; res.redirect('/') });

    app.get('/set', function(req, res) { res.render('index', {}) });

    // api route
    app.get('/api/board/:b_name', board);
    app.get('/api/board_read/:b_name/:id', board_read);
    app.post('/api/board_edit/:b_name/:id', board_edit);
    app.post('/api/board_notice/:b_name/:id', board_notice);
    app.post('/api/board_preview', board_preview);
    app.post('/api/board_add/:b_name', board_add);

    app.get('/api/set/load/:set_name', set_load);
    app.post('/api/set/hcaptcha', set_hcaptcha);
    app.post('/api/set/code/add', set_code_add);
    app.post('/api/set/code/delete/:id', set_code_delete);
    app.post('/api/set/admin/add', set_admin_add);
    app.post('/api/set/admin/delete/:id', set_admin_delete);
    app.post('/api/set/user/delete/:id', set_user_delete);

    app.get('/api/project', project);

    app.get('/api/study', study);
    app.get('/api/study_read/:id', study_read);
    app.post('/api/study_add', study_add);
    app.post('/api/study_edit/:id', study_edit);

    app.post('/api/signin', signin);
    app.post('/api/signup', signup);

    // url route sys
    app.get('/view/:url*', function(req, res) { res.sendFile(__dirname + "/view/" + req.params['url'] + req.params[0]) });
    app.use(function(req, res) { res.status(404).redirect('/') });

    // run
    app.listen(port, function() { console.log("Run in " + String(port)) });
});