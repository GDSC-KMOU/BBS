const func = require('./func.js');

function board_preview(req, res) {
    let data = req.body;

    let content = data.content;

    res.json({
        "req" : "ok",
        "data" : func.markdown_render(content)
    });
}

module.exports = {
    board_preview : board_preview
};