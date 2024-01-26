const sqlite3 = require('sqlite3');
const func = require('./func.js');

function get_user_id_me(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');
    
    func.user_check(db, req, res, function(user_name) {
        res.json({
            "req" : "ok",
            "id" : user_name
        });
        db.close();
    });
}

module.exports = {
    get_user_id_me : get_user_id_me
};