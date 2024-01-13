const sqlite3 = require('sqlite3');
const func = require('./func.js');

function chat_load(db, req, res, chat_id, for_a = 0, end_data = []) {
    if(chat_id.length > for_a) {
        chat_load(db, req, res, chat_id, for_a + 1, end_data);
    } else {
        res.json({
            "req" : "ok",
            "data" : end_data
        });
        db.close();
    }
}

function chat(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    let get_id = req.params.get_id;
    if(!get_id) {
        get_id = '';
    }

    func.user_check(db, req, res, function(user_name) {
        if(get_id === 'test') {
            res.json({
                "req" : "ok",
                "data" : [
                    {
                        "id" : "1",
                        "chat" : "test",
                        "user_id" : "min08101",
                        "date" : "2024-01-13 11:00:00"
                    }, {
                        "id" : "2",
                        "chat" : "test2",
                        "user_id" : "min08101",
                        "date" : "2024-01-13 11:00:02"
                    }, {
                        "id" : "3",
                        "chat" : "test3",
                        "user_id" : "min08101",
                        "date" : "2024-01-13 11:00:04"
                    }
                ]
            });
            db.close();
        } else if(get_id === '') {
            db.all("select user_id from chat_data where set_name = 'chat' order by user_id + 0 asc", [], function(err, db_data) {
                let chat_id = [];
                for(let for_a = 0; for_a < db_data.length; for_a++) {
                    chat_id.push(db_data[for_a].user_id);
                }

                chat_load(db, req, res, chat_id);
            });
        } else {
            
        }
    });
}

module.exports = {
    chat : chat
};