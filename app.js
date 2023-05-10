// load lib
const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3');
const session = require('express-session');
const body_parser = require('body-parser');
const sha3_512 = require('js-sha3').sha3_512;

// load func.js
const func = require('./route/func.js');

// load route


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
}).then(function() {
    // 임시로 하드 코딩
    
    let bbs_list = ['main', 'talk', 'free', 'secret'];

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
    app.get('/api/board/:b_name', function(req, res) {
        if(bbs_list.includes(req.params.b_name) === true) {
            if(req.params.b_name === 'secret') {
                res.json([]);
            } else {
                db.all("select doc_id, set_name, doc_data from bbs_data where set_data = ? order by doc_id + 0 desc", [req.params.b_name], function(err, db_data) {
                    let data_list = [];

                    let for_b = '';
                    let for_c = {};
                    for(let for_a = 0; for_a < db_data.length; for_a++) {
                        if(db_data[for_a].doc_id !== for_b) {
                            if(for_a !== 0) {
                                if(!for_c['user_name_real']) {
                                    for_c['user_name_real'] = for_c['user_name'];
                                }
                                
                                data_list.push(for_c);
                            }

                            for_c = {};
                            for_b = db_data[for_a].doc_id;
                            for_c['doc_id'] = for_b;
                        }
                        
                        for_c[db_data[for_a].set_name] = db_data[for_a].doc_data;

                        if(for_a === db_data.length - 1) {
                            if(!for_c['user_name_real']) {
                                for_c['user_name_real'] = for_c['user_name'];
                            }

                            data_list.push(for_c);
                        }
                    }

                    res.json(data_list);
                });
            }
        }
    });
    app.get('/api/board_read/:b_name/:id', function(req, res) {
        if(bbs_list.includes(req.params.b_name) === true) {
            db.all("select doc_id, set_name, doc_data from bbs_data where set_data = ? and doc_id = ?", [
                req.params.b_name,
                req.params.id
            ], function(err, db_data) {
                let data = {};
                for(let for_a = 0; for_a < db_data.length; for_a++) {
                    data[db_data[for_a].set_name] = db_data[for_a].doc_data;
                }

                if(!data['user_name_real']) {
                    data['user_name_real'] = data['user_name'];
                }

                res.json(data);
            });
        }
    });

    app.get('/api/set/code', function(req, res) {
        if(req.session['user_name']) {
            let user_name = req.session['user_name'];

            db.all("select set_data from user_data where user_name = ? and set_name = 'auth'", [user_name], function(err, db_data) {
                if(db_data[0].set_data === 'admin') {
                    db.all("select set_data from set_data where set_name = 'code_key'", [], function(err, db_data_2) {
                        let data = [];
                        for(let for_a = 0; for_a < db_data_2.length; for_a++) {
                            data.push(db_data_2[for_a].set_data);
                        }

                        res.json(data);
                    });
                } else {
                    res.json({
                        "req" : "error",
                        "reason" : "auth reject"
                    });
                }
            });
        } else {
            res.json({
                "req" : "error",
                "reason" : "user_name not exist"
            });
        }
    });

    app.get('/api/project', function(req, res) {
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

    // api route - post
    app.post('/api/board_edit/:b_name/:id', function(req, res) {
        if(bbs_list.includes(req.params.b_name) === true) {
            if(req.session['user_name']) {
                db.all("select doc_data from bbs_data where set_data = ? and doc_id = ? and set_name = 'user_name'", [
                    req.params.b_name,
                    req.params.id
                ], function(err, db_data) {
                    if(req.session['user_name'] === db_data[0].doc_data) {
                        let data = req.body;

                        let title = data.title;
                        let content = data.content;

                        if(content === '') {
                            db.run("delete from bbs_data where doc_id = ?", [req.params.id]);
                        } else {
                            db.run("update bbs_data set doc_data = ? where set_data = ? and doc_id = ? and set_name = 'title'", [
                                title,
                                req.params.b_name,
                                req.params.id
                            ]);
                            db.run("update bbs_data set doc_data = ? where set_data = ? and doc_id = ? and set_name = 'content'", [
                                content,
                                req.params.b_name,
                                req.params.id
                            ]);
                        }

                        res.json({
                            "req" : "ok"
                        });
                    } else {
                        res.json({
                            "req" : "error",
                            "reason" : "user_name !== doc_user_name"
                        });
                    }
                });
            } else {
                res.json({
                    "req" : "error",
                    "reason" : "user_name not exist"
                });
            }
        } else {
            res.json({
                "req" : "error",
                "reason" : "bbs not exist"
            });
        }
    });
    app.post('/api/board_add/:b_name', function(req, res) {
        if(bbs_list.includes(req.params.b_name) === true) {
            if(req.session['user_name']) {
                let data = req.body;

                let user_name = req.session['user_name'];
                db.all("select set_data from user_data where user_name = ? and set_name = 'user_real_name' limit 1", [user_name], function(err, db_data_2) {
                    let user_real_name = db_data_2[0].set_data;
                    let title = data.title;
                    let content = data.content;
                    let date = func.get_date();

                    db.all("select doc_id from bbs_data where set_name = 'title' order by doc_id + 0 desc limit 1", [], function(err, db_data) {
                        let doc_id = '1'
                        if(db_data.length !== 0) {
                            doc_id = String(Number(db_data[0].doc_id) + 1);
                        }

                        db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'user_name', ?, ?)", [
                            doc_id, 
                            user_name, 
                            req.params.b_name
                        ]);
                        db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'user_name_real', ?, ?)", [
                            doc_id, 
                            user_real_name, 
                            req.params.b_name
                        ]);
                        db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'title', ?, ?)", [
                            doc_id, 
                            title, 
                            req.params.b_name
                        ]);
                        db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'content', ?, ?)", [
                            doc_id, 
                            content, 
                            req.params.b_name
                        ]);
                        db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'date', ?, ?)", [
                            doc_id, 
                            date, 
                            req.params.b_name
                        ]);

                        res.json({
                            "req" : "ok",
                            "id" : doc_id
                        });
                    });
                });
            } else {
                res.json({
                    "req" : "error",
                    "reason" : "user_name not exist"
                });
            }
        } else {
            res.json({
                "req" : "error",
                "reason" : "bbs not exist"
            });
        }
    });

    app.post('/api/signin', function(req, res) {
        let data = req.body;

        let user_name = data.user_name;
        let password = data.password;

        // user_name, set_name, user_data, set_data
        db.all("select set_data from user_data where user_name = ? and set_name = 'password' limit 1", [user_name], function(err, db_data) {
            if(db_data.length === 0) {
                res.json({
                    "req" : "error",
                    "reason" : "user_name not exist"
                });
            } else {
                let db_password = db_data[0].set_data;
                db.all("select set_data from set_data where set_name = 'secret_key'", [], function(err, db_data) {
                    let random_key = '';
                    if(db_data.length !== 0) {
                        random_key = db_data[0].set_data;
                    }

                    if(db_password !== sha3_512(password + random_key)) {
                        res.json({
                            "req" : "error",
                            "reason" : "password !== db_password"
                        });
                    } else {
                        req.session['user_name'] = user_name;
                        res.json({ "req" : "ok" });
                    }
                });
            }
        });
    });
    app.post('/api/signup', function(req, res) {
        let data = req.body;

        let user_name = data.user_name;
        let user_real_name = data.user_real_name;
        let password = data.password;
        let password_check = data.password_check;
        let code = data.code;

        if(password !== password_check) {
            res.json({
                "req" : "error",
                "reason" : "password !== password_check"
            });
        } else if(
            user_name === '' ||
            user_real_name === '' ||
            password === ''
        ) {
            res.json({
                "req" : "error",
                "reason" : "empty exist"
            });
        } else {
            db.all("select user_name from user_data limit 1", [], function(err, db_data) {
                let auth = '';
                if(db_data.length === 0) {
                    auth = 'admin';
                }

                db.all("select user_name from user_data where user_name = ? limit 1", [user_name], function(err, db_data) {
                    if(db_data.length !== 0) {
                        res.json({
                            "req" : "error",
                            "reason" : "user_name exist"
                        });
                    } else {
                        // code_id, set_name, code_data, set_data
                        db.all("select set_name from set_data where set_name = 'code_key' and set_data = ? limit 1", [code], function(err, db_data) {
                            let code_check = 0;
                            if(db_data.length !== 0) {
                                db.run("delete from set_data where set_name = 'code_key' and set_data = ? limit 1", [code]);

                                code_check = 1;
                            } else if(auth === 'admin') {
                                code_check = 1;
                            }
                            
                            if(code_check === 1) {
                                db.all("select set_data from set_data where set_name = 'secret_key'", [], function(err, db_data) {
                                    let random_key = '';
                                    if(db_data.length !== 0) {
                                        random_key = db_data[0].set_data;
                                    }
                                
                                    db.run("insert into user_data (user_name, set_name, user_data, set_data) values (?, 'password', '', ?)", [
                                        user_name, 
                                        sha3_512(password + random_key)
                                    ]);
                                    db.run("insert into user_data (user_name, set_name, user_data, set_data) values (?, 'auth', '', ?)", [
                                        user_name, 
                                        auth
                                    ]);
                                    db.run("insert into user_data (user_name, set_name, user_data, set_data) values (?, 'user_real_name', '', ?)", [
                                        user_name, 
                                        user_real_name
                                    ]);
                                    db.run("insert into user_data (user_name, set_name, user_data, set_data) values (?, 'code', '', ?)", [
                                        user_name, 
                                        code
                                    ]);

                                    res.json({ "req" : "ok" });
                                });
                            } else {
                                res.json({
                                    "req" : "error",
                                    "reason" : "code key not exist"
                                });
                            }
                        });
                    }
                });
            });
        }
    });

    app.post('/api/set/add_code', function(req, res) {
        if(req.session['user_name']) {
            let user_name = req.session['user_name'];

            db.all("select set_data from user_data where user_name = ? and set_name = 'auth'", [user_name], function(err, db_data) {
                if(db_data[0].set_data === 'admin') {
                    let code_key = func.get_random_key(32);
                    db.run("insert into set_data (code_id, set_name, code_data, set_data) values ('', 'code_key', '', ?)", [code_key]);
                    
                    res.json({
                        "req" : "ok",
                        "code" : code_key
                    });
                } else {
                    res.json({
                        "req" : "error",
                        "reason" : "auth reject"
                    });
                }
            });
        } else {
            res.json({
                "req" : "error",
                "reason" : "user_name not exist"
            });
        }
    });

    // url route sys
    app.get('/view/:url*', function(req, res) { res.sendFile(__dirname + "/view/" + req.params['url'] + req.params[0]) });
    app.use(function(req, res) { res.status(404).redirect('/') });

    // run
    app.listen(port, function() { console.log("Run in " + String(port)) });
});