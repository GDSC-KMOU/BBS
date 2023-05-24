const sqlite3 = require('sqlite3');
const func = require('./func.js');

function set_hcaptcha(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    func.admin_check(db, req, res, function() {
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
    });
}

module.exports = {
    set_hcaptcha : set_hcaptcha
};