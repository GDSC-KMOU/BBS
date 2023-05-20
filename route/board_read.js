const sqlite3 = require('sqlite3');
const commonmark = require('commonmark');
const func = require('./func.js');

function board_read(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    if(func.bbs_list().includes(req.params.b_name) === true) {
        db.all("select doc_id, set_name, doc_data from bbs_data where set_data = ? and doc_id = ?", [
            req.params.b_name,
            req.params.id
        ], function(err, db_data) {
            if(db_data.length > 0) {
                let data = {};
                for(let for_a = 0; for_a < db_data.length; for_a++) {
                    data[db_data[for_a].set_name] = db_data[for_a].doc_data;
                }
                data["doc_id"] = db_data[0].doc_id;

                if(!data['user_name_real']) {
                    data['user_name_real'] = data['user_name'];
                }

                const reader = new commonmark.Parser();
                const writer = new commonmark.HtmlRenderer({ softbreak : "<br>", safe : true });

                data['render_content'] = writer.render(reader.parse(data['content']));

                res.json(data);
                db.close();
            } else {
                res.json({
                    "req" : "error",
                    "reason" : "document not exist"
                });
                db.close();
            }
        });
    }
}

module.exports = {
    board_read : board_read
};