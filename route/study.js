const sqlite3 = require('sqlite3');
const func = require('./func.js');

function study_select(res, data_list, for_a = 0, result = []) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    if(data_list === []) {
        db.close();
        res.json(result);
    }

    db.all("select doc_id, set_name, doc_data from study_data where doc_id = ?", [data_list[for_a]], function(err, db_data) {
        let data = {};
        for(let for_a = 0; for_a < db_data.length; for_a++) {
            data[db_data[for_a].set_name] = db_data[for_a].doc_data;
            data["doc_id"] = db_data[0].doc_id;
        }

        result.push(data);

        if(data_list.length <= for_a + 1) {
            db.close();
            res.json(result);
        } else {
            db.close();
            study_select(res, data_list, for_a + 1, result);
        }
    });
}

function study(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    db.all("select doc_data, doc_id from study_data where set_name = 'date' order by doc_data desc", [], function(err, db_data) {
        let data_list = [];
        for(let for_a = 0; for_a < db_data.length; for_a++) {
            data_list.push(db_data[for_a].doc_id);
        }

        db.close();
        
        study_select(res, data_list);
    });
}

module.exports = {
    study : study
};