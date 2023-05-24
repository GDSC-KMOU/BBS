const sqlite3 = require('sqlite3');

// set func
function date_change(now) {
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);

    const hour = ('0' + now.getHours()).slice(-2);
    const minute = ('0' + now.getMinutes()).slice(-2);
    const second = ('0' + now.getSeconds()).slice(-2);

    const formattedDateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return formattedDateString;
}

function get_date() {
    const now = new Date();

    return date_change(now);
}

function get_random_key(length = 256) {
    let random_key = '';
    let random_key_string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(let for_a = 0; for_a < length; for_a++) {
        random_key += random_key_string.charAt(Math.floor(Math.random() * random_key_string.length));
    }

    return random_key;
}

function url_encode(data) {
    return encodeURIComponent(data);
}

function admin_check(db, req, res, true_callback, false_callback = undefined) {
    if(req.session['user_name']) {
        let user_name = req.session['user_name'];

        db.all("select set_data from user_data where user_name = ? and set_name = 'auth'", [user_name], function(err, db_data) {
            if(db_data[0].set_data === 'admin') {
                true_callback();
            } else {
                if(false_callback === undefined) {
                    res.json({
                        "req" : "error",
                        "reason" : "auth reject"
                    });
                    db.close();
                } else {
                    false_callback();
                }
            }
        });
    } else {
        if(false_callback === undefined) {
            res.json({
                "req" : "error",
                "reason" : "user_name not exist"
            });
            db.close();
        } else {
            false_callback();
        }
    }
}

function user_same_check(db, req, res, db_user_name, true_callback) {
    if(req.session['user_name']) {
        let user_name = req.session['user_name'];

        if(user_name === db_user_name) {
            true_callback();
        } else {
            res.json({
                "req" : "error",
                "reason" : "user_name !== doc_user_name"
            });
            db.close();
        }
    } else {
        res.json({
            "req" : "error",
            "reason" : "user_name not exist"
        });
        db.close();
    }
}

function bbs_list() {
    // 임시로 하드 코딩
    let bbs_list = ['main', 'talk', 'free', 'secret'];

    return bbs_list;
}

module.exports = {
    get_date : get_date,
    date_change : date_change,
    get_random_key : get_random_key,
    bbs_list : bbs_list,
    url_encode : url_encode,
    admin_check : admin_check,
    user_same_check : user_same_check
};