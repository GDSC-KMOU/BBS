const sqlite3 = require('sqlite3');
const sha3_512 = require('js-sha3').sha3_512;
const func = require('./func.js');

function signup_val(db, req, res) {
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
        db.close();
    } else if(
        user_name === '' ||
        user_real_name === '' ||
        password === ''
    ) {
        res.json({
            "req" : "error",
            "reason" : "empty exist"
        });
        db.close();
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
                    db.close();
                } else {
                    // code_id, set_name, code_data, set_data
                    db.all("select set_name from set_data where set_name = 'code_key' and set_data = ? limit 1", [code], function(err, db_data) {
                        let code_check = 0;
                        if(db_data.length !== 0) {
                            db.run("delete from set_data where set_name = 'code_key' and set_data = ?", [code]);

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
                                db.close();
                            });
                        } else {
                            res.json({
                                "req" : "error",
                                "reason" : "code key not exist"
                            });
                            db.close();
                        }
                    });
                }
            });
        });
    }
}

function signup(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    let data = req.body;
    
    let hcaptcha_res = data.captcha;

    // user_name, set_name, user_data, set_data
    db.all("select set_data from set_data where set_name = 'hcaptcha_secret'", [], function(err, db_data_2) {
        let hcaptcha = '';
        if(db_data_2.length !== 0) {
            hcaptcha = db_data_2[0].set_data;
        }

        if(hcaptcha !== '') {
            let post_data = new URLSearchParams();
            post_data.append('response', hcaptcha_res);
            post_data.append('secret', hcaptcha);

            fetch("https://hcaptcha.com/siteverify", {
                method: "POST",
                body: post_data
            }).then(function(res_2) {
                return res_2.json();
            }).then(function(text) {
                let captcha_pass = 0;
                if(text.success === true) {
                    captcha_pass = 1;
                }

                if(captcha_pass === 1) {
                    signup_val(db, req, res);
                } else {
                    res.json({
                        "req" : "error",
                        "reason" : "captcha error"
                    });
                    db.close();
                }
            }).catch(function() {
                res.json({
                    "req" : "error",
                    "reason" : "timeout error"
                });
                db.close();
            });
        } else {
            signup_val(db, req, res);
        }
    });
}

module.exports = {
    signup : signup
};