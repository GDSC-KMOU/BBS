const sqlite3 = require('sqlite3');
const func = require('./func.js');

function project_length(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    db.all("select count(*) from project_data where set_name = 'title'", [], function(err, db_data) {
        db.close();
        res.json({ 'length' : db_data[0]['count(*)'] });
    });
}

module.exports = {
    project_length : project_length
};