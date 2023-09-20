const sqlite3 = require('sqlite3');
const func = require('./func.js');

function board_get(db, res, req, doc_list, for_d = 0, data_list = []) {
    if(doc_list[for_d] === undefined) {
        res.json(data_list);
        db.close();
    } else {
        db.all("select doc_id, set_name, doc_data from bbs_data where set_data = ? and doc_id = ? order by doc_id + 0 desc", [
            req.params.b_name,
            doc_list[for_d].doc_id
        ], function(err, db_data) {                
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

            board_get(db, res, req, doc_list, for_d + 1, data_list);
        });
    }
}

function board(req, res) {
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

    page *= 20;

    if(func.bbs_list().includes(req.params.b_name) === true) {
        db.all("select distinct doc_id from bbs_data where set_data = ? order by doc_id + 0 desc limit ?, 20", [req.params.b_name, page], function(err, db_data) {    
            board_get(db, res, req, db_data);
        });
    } else if(req.params.b_name === 'all') {
        db.all("select distinct doc_id from bbs_data where order by doc_id + 0 desc limit ?, 20", [page], function(err, db_data) {    
            board_get(db, res, req, db_data);
        });
    }
}

module.exports = {
    board : board
};