const fs = require('fs');
const path = require('path');

function file_list(req, res) {
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

    fs.readdir(path.join("data", "image"), function(err, file_arr){
        res.json(file_arr.slice(page, page + 20));
    });
}

module.exports = {
    file_list : file_list
};