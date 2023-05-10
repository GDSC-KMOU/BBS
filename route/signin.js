const sqlite3 = require('sqlite3');
const sha3_512 = require('js-sha3').sha3_512;
const func = require('./func.js');

function signin(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

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

    db.close();
}

module.exports = {
    signin : signin
};