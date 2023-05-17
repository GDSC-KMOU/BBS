const sqlite3 = require('sqlite3');
const func = require('./func.js');

function set_load(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    let anyone_load = ['hcaptcha_public'];
    let set_name = req.params.set_name;
    
    if(anyone_load.includes(set_name)) {
        db.all("select set_data from set_data where set_name = ?", [set_name], function(err, db_data_2) {
            let data = [];
            for(let for_a = 0; for_a < db_data_2.length; for_a++) {
                data.push(db_data_2[for_a].set_data);
            }

            res.json(data);
            db.close();
        });
    } else {
        if(req.session['user_name']) {
            let user_name = req.session['user_name'];

            db.all("select set_data from user_data where user_name = ? and set_name = 'auth'", [user_name], function(err, db_data) {
                if(db_data[0].set_data === 'admin') {
                    db.all("select set_data from set_data where set_name = ?", [set_name], function(err, db_data_2) {
                        let data = [];
                        for(let for_a = 0; for_a < db_data_2.length; for_a++) {
                            data.push(db_data_2[for_a].set_data);
                        }

                        res.json(data);
                        db.close();
                    });
                } else {
                    res.json({
                        "req" : "error",
                        "reason" : "auth reject"
                    });
                    db.close();
                }
            });
        } else {
            res.json({
                "req" : "error",
                "reason" : "user_name not exist"
            });
            db.close();
        }
    }
}

module.exports = {
    set_load : set_load
};