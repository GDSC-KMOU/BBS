const sqlite3 = require('sqlite3');

// set func
function get_date() {
    const now = new Date();

    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);

    const hour = ('0' + now.getHours()).slice(-2);
    const minute = ('0' + now.getMinutes()).slice(-2);
    const second = ('0' + now.getSeconds()).slice(-2);

    const formattedDateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return formattedDateString;
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

function bbs_list() {
    // 임시로 하드 코딩
    let bbs_list = ['main', 'talk', 'free', 'secret'];

    return bbs_list;
}

module.exports = {
    get_date: get_date,
    get_random_key : get_random_key,
    bbs_list : bbs_list,
    url_encode : url_encode
};