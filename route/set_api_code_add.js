const sqlite3 = require('sqlite3');
const func = require('./func.js');

function set_api_code_add(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    func.admin_check(db, req, res, function() {
        let code_key = func.get_random_key(32);
        db.run("insert into set_data (code_id, set_name, code_data, set_data) values ('', 'api_code', '', ?)", [code_key], function() {
            res.json({
                "req" : "ok",
                "code" : code_key
            });
            db.close();
        });
    });
}

module.exports = {
    set_api_code_add : set_api_code_add
};