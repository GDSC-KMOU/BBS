const sqlite3 = require('sqlite3');
const func = require('./func.js');

function get_user_name(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');
    const id = req.params.get_id;
    
    func.user_check(db, req, res, function(user_name) {
        db.all("select set_data from user_data where user_name = ? and set_name = 'user_real_name' limit 1", [id], function(err, db_data) {
            if(db_data.length === 0) {
                res.json({
                    "req" : "error",
                    "reason" : "user_name not exist"
                });
                db.close();
            } else {
                res.json({
                    "req" : "ok",
                    "id" : db_data[0].set_data
                });
                db.close();
            }
        });
    });
}

module.exports = {
    get_user_name : get_user_name
};