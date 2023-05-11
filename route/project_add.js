const sqlite3 = require('sqlite3');
const func = require('./func.js');

function project_add(req, res) {
    const db = new sqlite3.Database(__dirname + '/../data.db');

    

    db.close();
}

module.exports = {
    project_add : project_add
};