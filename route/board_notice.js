const sqlite3 = require('sqlite3');
const func = require('./func.js');

function board_notice(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');
    
    if(req.session['user_name']) {
        res.json({
            "req" : "error",
            "reason" : "user_name not exist"
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
    board_notice : board_notice
};