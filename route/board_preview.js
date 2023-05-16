const func = require('./func.js');
const commonmark = require('commonmark');

function board_preview(req, res) {
    let data = req.body;

    let content = data.content;

    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer({ softbreak : "<br>", safe : true });

    res.json({
        "req" : "ok",
        "data" : writer.render(reader.parse(content))
    });
}

module.exports = {
    board_preview : board_preview
};