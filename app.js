// load lib
const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3');
const session = require('express-session');
const body_parser = require('body-parser');

// load func.js
const func = require('./func.js');

// set lib
const app = express();
const port = 3000;

app.use(body_parser.json());

// set template
app.set('view engine', 'html');
nunjucks.configure('view', {
    autoescape: true,
    express: app,
    watch: true
});

// set db
const db = new sqlite3.Database('data.db');

db.serialize(function() {
    // create table
    // code_id, set_name, code_data, set_data
    db.run("create table if not exists set_data (code_id longtext, set_name longtext, code_data longtext, set_data longtext)");
    // doc_id, set_name, doc_data, set_data
    db.run("create table if not exists bbs_data (doc_id longtext, set_name longtext, doc_data longtext, set_data longtext)");

    // init data
    db.all("select set_data from set_data where set_name = 'secret_key'", [], (err, db_data) => {
        let random_key = '';
        if(db_data.length === 0) {
            let random_key_string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for(let for_a = 0; for_a < 256; for_a++) {
                random_key += random_key_string.charAt(Math.floor(Math.random() * random_key_string.length));
            }

            db.run("insert into set_data (code_id, set_name, code_data, set_data) values ('', 'secret_key', '', ?)", [random_key]);
        } else {
            random_key = db_data[0].set_data;
        }

        app.use(session({
            secret: random_key,
            resave: false,
            saveUninitialized: true
        }));
    });
});

// 임시로 하드 코딩
let bbs_list = ['main', 'talk', 'free', 'secret'];

// url route
app.get('/', (req, res) => { res.render('index', {}) });

app.get('/intro', (req, res) => { res.render('index', {}) });

// url route - ex
app.get('/ex', (req, res) => { res.render('index_ex', {}) });

app.get('/ex/intro', (req, res) => { res.render('index_ex', {}) });

app.get('/ex/project', (req, res) => { res.render('index_ex', {}) });
app.get('/ex/project/:id', (req, res) => { res.render('index_ex', {}) });
app.get('/ex/project_add', (req, res) => { res.render('index_ex', {}) });

app.get('/ex/board/:b_name', (req, res) => { res.render('index_ex', {}) });
app.get('/ex/board_add/:b_name', (req, res) => { res.render('index_ex', {}) });
app.get('/ex/board_read/:b_name/:id', (req, res) => { res.render('index_ex', {}) });

app.get('/ex/study', (req, res) => { res.render('index_ex', {}) });

app.get('/ex/signup', (req, res) => { res.render('index_ex', {}) });
app.get('/ex/signin', (req, res) => { res.render('index_ex', {}) });

// api route
app.get('/api/board/:b_name', (req, res) => {
    if(bbs_list.includes(req.params.b_name) === true) {
        if(req.params.b_name === 'secret') {
            res.json([]);
        } else {
            db.all("select doc_id, set_name, doc_data from bbs_data where set_data = ? order by doc_id + 0 desc", [req.params.b_name], (err, db_data) => {
                let data_list = [];

                let for_b = '';
                let for_c = {};
                for(let for_a = 0; for_a < db_data.length; for_a++) {
                    if(db_data[for_a].doc_id !== for_b) {
                        if(for_a !== 0) {
                            data_list.push(for_c);
                        }

                        for_c = {};
                        for_b = db_data[for_a].doc_id;
                        for_c['doc_id'] = for_b;
                    }
                    
                    for_c[db_data[for_a].set_name] = db_data[for_a].doc_data;

                    if(for_a === db_data.length - 1) {
                        data_list.push(for_c);
                    }
                }

                res.json(data_list);
            });
        }
    }
});
app.get('/api/board_read/:b_name/:id', (req, res) => {
    if(bbs_list.includes(req.params.b_name) === true) {
        db.all("select doc_id, set_name, doc_data from bbs_data where set_data = ? and doc_id = ?", [
            req.params.b_name,
            req.params.id
        ], (err, db_data) => {
            let data = {};
            for(let for_a = 0; for_a < db_data.length; for_a++) {
                data[db_data[for_a].set_name] = db_data[for_a].doc_data;
            }

            res.json(data);
        });
    }
});
app.post('/api/board_add/:b_name', (req, res) => {
    if(bbs_list.includes(req.params.b_name) === true) {
        let data = req.body;

        let user_name = '베타테스터';
        let title = data.title;
        let content = data.content;
        let date = func.get_date();

        console.log(user_name, title, content, date);
        db.all("select doc_id from bbs_data where set_name = 'title' order by doc_id + 0 desc limit 1", [], (err, db_data) => {
            let doc_id = '1'
            if(db_data.length !== 0) {
                doc_id = String(Number(db_data[0].doc_id) + 1);
            }

            db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'user_name', ?, ?)", [doc_id, user_name, req.params.b_name]);
            db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'title', ?, ?)", [doc_id, title, req.params.b_name]);
            db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'content', ?, ?)", [doc_id, content, req.params.b_name]);
            db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'date', ?, ?)", [doc_id, date, req.params.b_name]);

            res.json({
                "req" : "ok",
                "id" : doc_id
            });
        });
    }
});

app.get('/api/project', (req, res) => {
    res.json([
        {
            "post_id" : "1",
            "img_src" : "/view/img/website.jpg",
            "post_name" : "테스트",
            "date" : "2023-03-21 13:00:00",
            "writer" : "잉여",
            "count" : "5"
        }
    ]);
});

app.post('/signin', (req, res) => {
 
});
app.post('/signup', (req, res) => {
    
});

// url route sys
app.get('/view/:url*', (req, res) => { res.sendFile(__dirname + "/view/" + req.params['url'] + req.params[0]) });
app.use(function(req, res) { res.status(404).redirect('/') });

// run
app.listen(port, () => { console.log("Run in " + String(port)) });