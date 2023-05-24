const sqlite3 = require('sqlite3');
const func = require('./func.js');

function set_user_delete(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    func.admin_check(db, req, res, function() {
        db.run("delete from user_data where user_name = ?", [req.params.id]);

        res.json({
            "req" : "ok"
        });
        db.close();
    });
}

module.exports = {
    set_user_delete : set_user_delete
};