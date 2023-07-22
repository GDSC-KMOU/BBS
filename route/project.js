const sqlite3 = require('sqlite3');
const func = require('./func.js');

function project_select(db, res, data_list, for_a = 0, result = []) {
    if(data_list === []) {
        res.json(result);
        db.close();
    } else {
        db.all("select doc_id, set_name, doc_data from project_data where doc_id = ?", [data_list[for_a]], function(err, db_data) {
            let data = {};
            if(db_data.length > 0) {
                for(let for_a = 0; for_a < db_data.length; for_a++) {
                    data[db_data[for_a].set_name] = db_data[for_a].doc_data;
                    data["doc_id"] = db_data[0].doc_id;
                }

                result.push(data);
            }

            if(data_list.length <= for_a + 1) {
                res.json(result);
                db.close();
            } else {
                project_select(db, res, data_list, for_a + 1, result);
            }
        });
    }
}

function project(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    let page = 0;
    if(req.params.page) {
        try {
            page = Number(req.params.page) - 1;
            if(page < 0) {
                page = 0;
            }
        } catch {}
    }

    page *= 12;

    db.all("select doc_data, doc_id from project_data where set_name = 'title' order by doc_id desc limit ?, 12", [page], function(err, db_data) {
        let data_list = [];
        for(let for_a = 0; for_a < db_data.length; for_a++) {
            data_list.push(db_data[for_a].doc_id);
        }
        
        project_select(db, res, data_list);
    });
}

module.exports = {
    project : project
};