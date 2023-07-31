const fs = require('fs');
const path = require('path');

function file_send(req, res) {
    if(fs.existsSync(path.join("data", "image", req.params['url'] + req.params[0]))) {
        res.sendFile(path.join(__dirname, "..", "data", "image", req.params['url'] + req.params[0]));
    } else {
        res.status(404).redirect('/');
    }
}

module.exports = {
    file_send : file_send
};