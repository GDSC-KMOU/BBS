const sqlite3 = require('sqlite3');
const func = require('./func.js');

function study_read(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    db.all("select doc_id, set_name, doc_data from study_data where doc_id = ?", [req.params.id], function(err, db_data) {
        let data = {};
        for(let for_a = 0; for_a < db_data.length; for_a++) {
            data[db_data[for_a].set_name] = db_data[for_a].doc_data;
        }
        data["doc_id"] = db_data[0].doc_id;

        db.close();
        res.json(data);
    });
}

module.exports = {
    study_read : study_read
};