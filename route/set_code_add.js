const sqlite3 = require('sqlite3');
const func = require('./func.js');

function set_code_add(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

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

    db.close();
}

module.exports = {
    set_code_add : set_code_add
};