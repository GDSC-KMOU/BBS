const sqlite3 = require('sqlite3');
const func = require('./func.js');

function board(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    if(func.bbs_list().includes(req.params.b_name) === true) {
        if(req.params.b_name === 'secret') {
            res.json([]);
        } else {
            db.all("select doc_id, set_name, doc_data from bbs_data where set_data = ? order by doc_id + 0 desc", [req.params.b_name], function(err, db_data) {
                let data_list = [];

                let for_b = '';
                let for_c = {};
                for(let for_a = 0; for_a < db_data.length; for_a++) {
                    if(db_data[for_a].doc_id !== for_b) {
                        if(for_a !== 0) {                            
                            data_list.push(for_c);
                        }

                        for_c = {};
                        for_b = db_data[for_a].doc_id;
                        for_c['doc_id'] = for_b;
                    }
                    
                    for_c[db_data[for_a].set_name] = db_data[for_a].doc_data;

                    if(for_a === db_data.length - 1) {
                        data_list.push(for_c);
                    }
                }

                res.json(data_list);
            });
        }
    }

    db.close();
}

module.exports = {
    board : board
};