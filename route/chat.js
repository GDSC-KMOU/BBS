const sqlite3 = require('sqlite3');
const func = require('./func.js');

function chat_load(db, req, res, chat_id, for_a = 0, end_data = []) {
    if(chat_id.length > for_a) {
        end_data[for_a] = {};
        db.all("select set_name, set_data, user_data from chat_data where user_id = ?", [chat_id[for_a]], function(err, db_data) {
            console.log(chat_id[for_a], db_data);
            for(let for_b = 0; for_b < db_data.length; for_b++) {
                end_data[for_a][db_data[for_b].set_name] = db_data[for_b].set_data;
                end_data[for_a]['user_id'] = db_data[for_b].user_data;
            }
            end_data[for_a]['id'] = chat_id[for_a];

            chat_load(db, req, res, chat_id, for_a + 1, end_data);
        });
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
        get_id = '0';
    }

    func.user_check(db, req, res, function(user_name) {
        db.all("select user_id from chat_data where set_name = 'chat' and user_id + 0 >= ? + 0 order by user_id + 0 asc", [get_id], function(err, db_data) {
            let chat_id = [];
            for(let for_a = 0; for_a < db_data.length; for_a++) {
                chat_id.push(db_data[for_a].user_id);
            }

            chat_load(db, req, res, chat_id);
        });
    });
}

module.exports = {
    chat : chat
};