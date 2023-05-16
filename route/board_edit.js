const sqlite3 = require('sqlite3');
const func = require('./func.js');

function board_edit(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');
    
    if(func.bbs_list().includes(req.params.b_name) === true) {
        if(req.session['user_name']) {
            let user_name = req.session['user_name'];

            db.all("select doc_data from bbs_data where set_data = ? and doc_id = ? and set_name = 'user_name'", [
                req.params.b_name,
                req.params.id
            ], function(err, db_data) {
                if(db_data.length > 0) {
                    db.all("select set_data from user_data where user_name = ? and set_name = 'auth'", [user_name], function(err, db_data_2) {
                        if(db_data_2[0].set_data === 'admin' || req.session['user_name'] === db_data[0].doc_data) {
                            let data = req.body;

                            let title = data.title;
                            let content = data.content;

                            if(content === '') {
                                db.run("delete from bbs_data where doc_id = ?", [req.params.id]);
                            } else {
                                db.run("update bbs_data set doc_data = ? where set_data = ? and doc_id = ? and set_name = 'title'", [
                                    title,
                                    req.params.b_name,
                                    req.params.id
                                ]);
                                db.run("update bbs_data set doc_data = ? where set_data = ? and doc_id = ? and set_name = 'content'", [
                                    content,
                                    req.params.b_name,
                                    req.params.id
                                ]);
                            }

                            res.json({
                                "req" : "ok"
                            });
                        } else {
                            res.json({
                                "req" : "error",
                                "reason" : "user_name !== doc_user_name && user_auth !== \"admin\""
                            });
                        }
                    });
                } else {
                    res.json({
                        "req" : "error",
                        "reason" : "document not exist"
                    });
                }
            });
        } else {
            res.json({
                "req" : "error",
                "reason" : "user_name not exist"
            });
        }
    } else {
        res.json({
            "req" : "error",
            "reason" : "bbs not exist"
        });
    }

    db.close();
}

module.exports = {
    board_edit : board_edit
};