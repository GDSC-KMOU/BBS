const sqlite3 = require('sqlite3');
const func = require('./func.js');

function board_comment_edit_update(db, req, res, check_list, for_a = 0) {
    if(for_a === check_list.length) {
        res.json({
            "req" : "ok",
            "id" : check_list[1][1]
        });
        db.close();
    } else {
        db.run("delete from bbs_data where set_data = ? and doc_id = ? and set_name = ?", [check_list[0][1], check_list[1][1], check_list[for_a][0]], null, function() {
            let data = check_list[for_a][1];
            if(data === undefined || data === null) {
                data = '';
            }

            db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, ?, ?, ?)", [
                check_list[1][1],
                check_list[for_a][0],
                data,
                check_list[0][1]
            ], null, board_comment_edit_update(db, req, res, check_list, for_a + 1));
        });
    }
}

function board_comment_edit_do(db, req, res, user_name, comment_id) {
    let data = req.body;

    let doc_id = req.params.id;
    let b_name = req.params.b_name;

    doc_id = b_name + '-' + doc_id;

    let content = data.content;
    let date = func.get_date();

    if(content === '' && (doc_id !== undefined || doc_id !== null)) {
        db.run("delete from bbs_data where set_data = ? and doc_id = ?", [doc_id, comment_id], function() {
            res.json({
                "req" : "ok"
            });
            db.close();
        });
    } else {
        db.all("select set_data from user_data where user_name = ? and set_name = 'user_real_name' limit 1", [user_name], function(err, db_data_2) {
            let user_real_name = db_data_2[0].set_data;
            let check_list = [
                ['b_name', doc_id],
                ['doc_id', comment_id],
                ['user_name', user_name],
                ['user_name_real', user_real_name],
                ['content', content],
                ['date', date]
            ];
            board_comment_edit_update(db, req, res, check_list, 2);
        });
    }
}

function board_comment_edit(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    let b_name = req.params.b_name;
    let doc_id = req.params.id;
    let comment_id = req.params.comment_id;

    if(!doc_id) {
        res.json({
            "req" : "error",
            "reason" : "doc not exist"
        });
        db.close();
    } else {
        db.all("select doc_id from bbs_data where set_data = ? and set_name = 'user_name' order by doc_id + 0 desc", [b_name + '-' + doc_id], function(err, db_data) {
            if(db_data.length > 0) {
                if(!comment_id) {
                    comment_id = String(Number(db_data[0].doc_id) + 1);
                }
            } else {
                if(!comment_id) {
                    comment_id = '1'
                }
            }

            if(func.bbs_list().includes(b_name) === true) {
                db.all("select doc_data from bbs_data where set_data = ? and doc_id = ? and set_name = 'user_name'", [b_name, doc_id], function(err, db_data) {
                    if(db_data.length > 0) {
                        db.all("select doc_data from bbs_data where set_data = ? and doc_id = ? and set_name = 'user_name'", [comment_id, b_name + '-' + doc_id], function(err, db_data) {
                            if(db_data.length > 0) {
                                func.admin_check(db, req, res, function() {
                                    board_comment_edit_do(db, req, res, db_data[0].doc_data, comment_id);
                                }, function() {
                                    func.user_same_check(db, req, res, db_data[0].doc_data, function() {
                                        board_comment_edit_do(db, req, res, db_data[0].doc_data, comment_id);
                                    });
                                });
                            } else {
                                func.user_check(db, req, res, function(user_name) {
                                    board_comment_edit_do(db, req, res, user_name, comment_id);
                                });
                            }
                        });
                    } else {
                        res.json({
                            "req" : "error",
                            "reason" : "doc not exist"
                        });
                        db.close();
                    }
                });
            } else {
                res.json({
                    "req" : "error",
                    "reason" : "bbs not exist"
                });
                db.close();
            }
        });
    }
}

module.exports = {
    board_comment_edit : board_comment_edit
};