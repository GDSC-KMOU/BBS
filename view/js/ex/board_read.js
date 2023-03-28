if(document.location.pathname.startsWith('/ex/board_read/')) {
    let board_name = document.location.pathname.split('/')[3];
    let board_id = document.location.pathname.split('/')[4];

    fetch("/api/board_read/" + url_encode(board_name) + '/' + url_encode(board_id)).then(function(res) {
        return res.json();
    }).then(function(text) {
        console.log(text);
        document.getElementById('main_data').innerHTML = `
            ` + bbs_nav() + `
            <br>
            <div class="container px-5">
                <h2>` + text.title + `</h2>
                <p class="lead">` + text.content.replaceAll('\n', '<br>') + `</p>
            </div>
        `;
    });
}