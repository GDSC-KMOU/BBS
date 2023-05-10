const sqlite3 = require('sqlite3');
const func = require('./func.js');

function board_add(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    if(func.bbs_list().includes(req.params.b_name) === true) {
        if(req.session['user_name']) {
            let data = req.body;

            let user_name = req.session['user_name'];
            db.all("select set_data from user_data where user_name = ? and set_name = 'user_real_name' limit 1", [user_name], function(err, db_data_2) {
                let user_real_name = db_data_2[0].set_data;
                let title = data.title;
                let content = data.content;
                let date = func.get_date();

                db.all("select doc_id from bbs_data where set_name = 'title' order by doc_id + 0 desc limit 1", [], function(err, db_data) {
                    let doc_id = '1'
                    if(db_data.length !== 0) {
                        doc_id = String(Number(db_data[0].doc_id) + 1);
                    }

                    db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'user_name', ?, ?)", [
                        doc_id, 
                        user_name, 
                        req.params.b_name
                    ]);
                    db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'user_name_real', ?, ?)", [
                        doc_id, 
                        user_real_name, 
                        req.params.b_name
                    ]);
                    db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'title', ?, ?)", [
                        doc_id, 
                        title, 
                        req.params.b_name
                    ]);
                    db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'content', ?, ?)", [
                        doc_id, 
                        content, 
                        req.params.b_name
                    ]);
                    db.run("insert into bbs_data (doc_id, set_name, doc_data, set_data) values (?, 'date', ?, ?)", [
                        doc_id, 
                        date, 
                        req.params.b_name
                    ]);

                    res.json({
                        "req" : "ok",
                        "id" : doc_id
                    });
                });
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
    board_add : board_add
};