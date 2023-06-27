const sqlite3 = require('sqlite3');
const fs = require('fs');
const path = require('path');
const func = require('./func.js');

function file_upload(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    // func.user_check(db, req, res, function(user_name) {
        if(req.files) {
            console.log('test', req.files.image);
            let file_ext = '';
            switch(req.files.image.mimetype) {
                case 'image/png':
                    file_ext = 'png';
                    break;
                case 'image/jpeg':
                    file_ext = 'jpeg';
                    break;
                case 'image/jpg':
                    file_ext = 'jpg';
                    break;
                case 'image/gif':
                    file_ext = 'gif';
                    break;
                case 'image/webp':
                    file_ext = 'webp';
                    break;
                default:
                    file_ext = '';
                    break;
            }

            if(file_ext === '') {
                res.json({
                    "req" : "error",
                    "reason" : "file extension unavailable"
                });
                db.close();
            } else {
                let for_a = 0;
                while(1) {
                    if(fs.existsSync(path.join("data", "image", String(for_a) + '.' + file_ext))) {
                        for_a += 1;
                    } else {
                        req.files.image.mv(path.join("data", "image", String(for_a) + '.' + file_ext));
                        break;
                    }                    
                }

                res.json({
                    "req" : "ok",
                    "id" : String(for_a) + '.' + file_ext
                });
                db.close();
            }
        }
    // });
}

module.exports = {
    file_upload : file_upload
};