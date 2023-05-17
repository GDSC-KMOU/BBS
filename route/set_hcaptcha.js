const sqlite3 = require('sqlite3');
const func = require('./func.js');

function set_hcaptcha(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    if(req.session['user_name']) {
        let user_name = req.session['user_name'];

        db.all("select set_data from user_data where user_name = ? and set_name = 'auth'", [user_name], function(err, db_data) {
            if(db_data[0].set_data === 'admin') {
                let data = req.body;

                let public = data.public;
                let secret = data.secret;

                db.run("delete from set_data where set_name = 'hcaptcha_public'");
                db.run("delete from set_data where set_name = 'hcaptcha_secret'");

                db.run("insert into set_data (code_id, set_name, code_data, set_data) values ('', 'hcaptcha_public', '', ?)", [public]);
                db.run("insert into set_data (code_id, set_name, code_data, set_data) values ('', 'hcaptcha_secret', '', ?)", [secret]);
            
                res.json({
                    "req" : "ok"
                });
                db.close();
            } else {
                res.json({
                    "req" : "error",
                    "reason" : "auth reject"
                });
                db.close();
            }
        });
    } else {
        res.json({
            "req" : "error",
            "reason" : "user_name not exist"
        });
        db.close();
    }
}

module.exports = {
    set_hcaptcha : set_hcaptcha
};