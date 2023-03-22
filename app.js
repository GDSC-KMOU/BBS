// load lib
const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3');
const session = require('express-session');

// set lib
const app = express();
const port = 3000;

app.set('view engine', 'html');
nunjucks.configure('view', {
    autoescape: true,
    express: app,
    watch: true
});

// db init
const db = new sqlite3.Database('data.db');

db.serialize(function() {
    // create table
    db.run("create table if not exists set_data (code_id, set_name, code_data, set_data longtext)");
    db.run("create table if not exists bbs_data (doc_id, set_name, doc_data, set_data longtext)");

    // init data

});

// 임시로 하드 코딩
let bbs_list = ['main', 'talk', 'free', 'secret'];

// url route
app.get('/', (req, res) => { res.render('index', {}) });

app.get('/intro', (req, res) => { res.render('index', {}) });

app.get('/project', (req, res) => { res.render('index', {}) });
app.get('/project/:id', (req, res) => { res.render('index', {}) });
app.get('/project/add', (req, res) => { res.render('index', {}) });

app.get('/board/:b_name', (req, res) => { res.render('index', {}) });
app.get('/board/:b_name/add', (req, res) => { res.render('index', {}) });
app.get('/board/:b_name/id/:id', (req, res) => { res.render('index', {}) });

app.get('/study', (req, res) => { res.render('index', {}) });

app.get('/signup', (req, res) => { res.render('index', {}) });
app.get('/signin', (req, res) => { res.render('index', {}) });

// api route
// 감기에 걸려서 개발할 여력이 안되서 임시 조치
app.get('/api/board/:b_name', (req, res) => {
    if(bbs_list.includes(req.params.b_name) === true) {
        if(req.params.b_name === 'secret') {
            res.json([]);
        } else {
            res.json([
                {
                    "post_id" : "1",
                    "post_name" : "테스트",
                    "date" : "2023-03-21 13:00:00",
                    "writer" : "잉여",
                    "count" : "5"
                }, {
                    "post_id" : "2",
                    "post_name" : "테스트 2",
                    "date" : "2023-03-21 13:00:05",
                    "writer" : "잉여",
                    "count" : "20"
                }
            ]);
        }
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