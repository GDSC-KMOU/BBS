const sqlite3 = require('sqlite3');
const func = require('./func.js');

function board_notice(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    let doc_id = req.params.id;
    let b_name = req.params.b_name;

    func.admin_check(db, req, res, function() {
        db.all("select doc_id from bbs_data where doc_id = ? and set_data = ? and set_name = 'notice'", [
            doc_id,
            b_name
        ], function(err, db_data) {
            if(db_data.length > 0) {
                db.run("delete from bbs_data where set_data = ? and doc_id = ? and set_name = 'notice'", [
                    b_name, 
                    doc_id
                ], function() {
                    res.json({
                        "req" : "ok"
                    });
                    db.close();
                });
            } else {
                db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, ?, ?, ?)", [
                    doc_id,
                    "notice",
                    "1",
                    b_name
                ], null, function() {
                    res.json({
                        "req" : "ok"
                    });
                    db.close();
                });
            }
        });
    });
}

module.exports = {
    board_notice : board_notice
};