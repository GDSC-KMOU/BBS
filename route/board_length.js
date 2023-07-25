const sqlite3 = require('sqlite3');
const func = require('./func.js');

function board_length(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');
    
    if(func.bbs_list().includes(req.params.b_name) === true) {
        if(req.params.b_name === 'secret') {
            res.json([]);
        } else {
            db.all("select count(*) from bbs_data where set_data = ? and set_name = 'title'", [req.params.b_name], function(err, db_data) {
                db.close();
                res.json({ 'length' : db_data[0]['count(*)'] });
            });
        }
    }
}

module.exports = {
    board_length : board_length
};