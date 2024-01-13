const sqlite3 = require('sqlite3');
const func = require('./func.js');

function chat_post_do(db, req, res, user_name) {
    let data = req.body;
    let chat = data.chat;
    let date = func.get_date();
    
    db.all("select user_id from chat_data where set_name = 'chat' order by user_id + 0 desc limit 1", [], function(err, db_data) {
        let id = '1';
        if(db_data.length !== 0) {
            id = String(Number(db_data[0].user_id) + 1);
        }

        console.log("test");
        db.run("insert into chat_data (user_id, set_name, user_data, set_data) values (?, ?, ?, ?)", [
            id,
            'chat',
            user_name,
            chat        
        ]);
        db.run("insert into chat_data (user_id, set_name, user_data, set_data) values (?, ?, ?, ?)", [
            id,
            'date',
            user_name,
            date        
        ]);

        res.json({
            "req" : "ok"
        });
        db.close();
    });
}

function chat_post(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    func.user_check(db, req, res, function(user_name) {
        chat_post_do(db, req, res, user_name);
    });
}

module.exports = {
    chat_post : chat_post
};