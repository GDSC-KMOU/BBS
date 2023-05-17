const sqlite3 = require('sqlite3');
const func = require('./func.js');

function project(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    db.all("select doc_id, set_name, doc_data from project_data where set_data = ? order by doc_id + 0 desc", [], function(err, db_data) {
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
        db.close();

        /* res.json([
            {
                "post_id" : "1",
                "img_src" : "/view/img/website.jpg",
                "post_name" : "테스트",
                "date" : "2023-03-21 13:00:00",
                "writer" : "잉여",
                "count" : "5"
            }
        ]); */
    });
}

module.exports = {
    project : project
};