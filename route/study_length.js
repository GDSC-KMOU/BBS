const sqlite3 = require('sqlite3');
const func = require('./func.js');

function study_length(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    db.all("select count(*) from study_data where set_name = 'team_name'", [], function(err, db_data) {
        db.close();
        res.json({ 'length' : db_data[0]['count(*)'] });
    });
}

module.exports = {
    study_length : study_length
};