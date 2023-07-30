const sqlite3 = require('sqlite3');
const func = require('./func.js');

function set_api_code_delete(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    func.admin_check(db, req, res, function() {
        db.run("delete from set_data where set_name = 'api_code' and set_data = ?", [req.params.id], function() {
            res.json({
                "req" : "ok"
            });
            db.close();
        });
    });
}

module.exports = {
    set_api_code_delete : set_api_code_delete
};