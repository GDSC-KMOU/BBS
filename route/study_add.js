const sqlite3 = require('sqlite3');
const func = require('./func.js');

function study_add(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');
    if(req.session['user_name']) {
        let data = req.body;

        let user_name = req.session['user_name'];
        db.all("select set_data from user_data where user_name = ? and set_name = 'user_real_name' limit 1", [user_name], function(err, db_data_2) {
            let user_real_name = db_data_2[0].set_data;

            let team_name = data.team_name;
            let date = data.date;
            let content = data.content;
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

            db.all("select doc_id from study_data where set_name = 'team_name' order by doc_id + 0 desc limit 1", [], function(err, db_data) {
                let doc_id = '1'
                if(db_data.length !== 0) {
                    doc_id = String(Number(db_data[0].doc_id) + 1);
                }

                db.run("insert into study_data (doc_id, set_name, doc_data, set_data) values (?, 'user_name', ?, '')", [
                    doc_id, 
                    user_name
                ]);
                db.run("insert into study_data (doc_id, set_name, doc_data, set_data) values (?, 'user_name_real', ?, '')", [
                    doc_id, 
                    user_real_name
                ]);
                db.run("insert into study_data (doc_id, set_name, doc_data, set_data) values (?, 'team_name', ?, '')", [
                    doc_id, 
                    team_name
                ]);
                db.run("insert into study_data (doc_id, set_name, doc_data, set_data) values (?, 'content', ?, '')", [
                    doc_id, 
                    content
                ]);
                db.run("insert into study_data (doc_id, set_name, doc_data, set_data) values (?, 'date', ?, '')", [
                    doc_id, 
                    date
                ]);
                db.run("insert into study_data (doc_id, set_name, doc_data, set_data) values (?, 'bbs_id', ?, '')", [
                    doc_id, 
                    bbs_id
                ]);

                res.json({
                    "req" : "ok",
                    "id" : doc_id
                });
                db.close();
            });
        });
    } else {
        res.json({
            "req" : "error",
            "reason" : "user_name not exist"
        });
        db.close();
    }

}

module.exports = {
    study_add : study_add
};