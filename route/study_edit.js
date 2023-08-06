const sqlite3 = require('sqlite3');
const func = require('./func.js');

function study_edit_update(db, req, res, check_list, for_a = 0) {
    if(for_a === check_list.length) {
        res.json({
            "req" : "ok"
        });
        db.close();
    } else {
        db.run("delete from study_data where doc_id = ? and set_name = ?", [check_list[0][1], check_list[for_a][0]], null, function() {
            let data = check_list[for_a][1];
            if(data === undefined || data === null) {
                data = '';
            }

            db.run("insert into study_data (doc_id, set_name, doc_data, set_data) values (?, ?, ?, '')", [
                check_list[0][1],
                check_list[for_a][0],
                data
            ], null, study_edit_update(db, req, res, check_list, for_a + 1));
        });
    }
}

function study_edit_do(db, req, res, user_name) {
    let data = req.body;
    let doc_id = req.params.id;
    let team_name = data.team_name;
    let content = data.content;
    let date = data.date;
    let bbs_id = data.bbs_id;

    try {
        date = new Date(date);
        if(isNaN(date.getTime())) {
            throw new Error();
        }

        date = func.date_change(date);
    } catch {
        date = func.get_date();
    }

    if(content === '' && (doc_id !== undefined || doc_id !== null)) {
        db.run("delete from study_data where doc_id = ?", [doc_id], function() {
            res.json({
                "req" : "ok"
            });
            db.close();
        });
    } else {
        db.all("select set_data from user_data where user_name = ? and set_name = 'user_real_name' limit 1", [user_name], function(err, db_data_2) {
            let user_real_name = db_data_2[0].set_data;

            db.all("select doc_id from study_data where set_name = 'team_name' order by doc_id + 0 desc limit 1", [], function(err, db_data) {
                if(!doc_id) {
                    doc_id = '1';
                    if(db_data.length !== 0) {
                        doc_id = String(Number(db_data[0].doc_id) + 1);
                    }
                }

                let check_list = [
                    ['doc_id', doc_id],
                    ['user_name', user_name],
                    ['user_name_real', user_real_name],
                    ['team_name', team_name],
                    ['content', content],
                    ['date', date],
                    ['bbs_id', bbs_id]
                ];
                study_edit_update(db, req, res, check_list, 1);
            });
        });
    }
}

function study_edit(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    let doc_id = req.params.id;
    if(!doc_id) {
        doc_id = '';
    }

    db.all("select doc_data from study_data where doc_id = ? and set_name = 'user_name'", [doc_id], function(err, db_data) {
        if(db_data.length > 0) {
            func.admin_check(db, req, res, function() {
                study_edit_do(db, req, res, db_data[0].doc_data);
            }, function() {
                func.user_same_check(db, req, res, db_data[0].doc_data, function() {
                    study_edit_do(db, req, res, db_data[0].doc_data);
                });
            });
        } else {
            func.user_check(db, req, res, function(user_name) {
                study_edit_do(db, req, res, user_name);
            });
        }
    });
}

module.exports = {
    study_edit : study_edit
};