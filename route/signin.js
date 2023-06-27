const sqlite3 = require('sqlite3');
const sha3_512 = require('js-sha3').sha3_512;
const func = require('./func.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function signin(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    let data = req.body;

    let user_name = data.user_name;
    let password = data.password;
    let hcaptcha_res = data.captcha;

    // user_name, set_name, user_data, set_data
    db.all("select set_data from set_data where set_name = 'hcaptcha_secret'", [], function(err, db_data_2) {
        let hcaptcha = '';
        if(db_data_2.length !== 0) {
            hcaptcha = db_data_2[0].set_data;
        }

        fetch("https://hcaptcha.com/siteverify?response=" + func.url_encode(hcaptcha_res) + "&secret=" + func.url_encode(hcaptcha)).then(function(res_2) {
            return res_2.json();
        }).then(function(text) {
            let captcha_pass = 0;
            if(hcaptcha !== '') {
                if(text.success === true) {
                    captcha_pass = 1;
                }
            } else {
                captcha_pass = 1;
            }

            if(captcha_pass === 1) {
                db.all("select set_data from user_data where user_name = ? and set_name = 'password' limit 1", [user_name], function(err, db_data) {
                    if(db_data.length === 0) {
                        res.json({
                            "req" : "error",
                            "reason" : "user_name not exist"
                        });
                        db.close();
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
                                db.close();
                            } else {
                                req.session['user_name'] = user_name;
                                res.json({ "req" : "ok" });
                                db.close();
                            }
                        });
                    }
                });
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
    });
}

module.exports = {
    signin : signin
};