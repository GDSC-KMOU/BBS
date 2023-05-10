const sqlite3 = require('sqlite3');
const func = require('./func.js');

function project(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    res.json([
        {
            "post_id" : "1",
            "img_src" : "/view/img/website.jpg",
            "post_name" : "테스트",
            "date" : "2023-03-21 13:00:00",
            "writer" : "잉여",
            "count" : "5"
        }
    ]);

    db.close();
}

module.exports = {
    project : project
};