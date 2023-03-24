if(document.location.pathname.startsWith('/board_add/')) {
    document.getElementById('main_data').innerHTML = `
        ` + bbs_nav() + `
        <br>
        <div class="container px-5">
            <div class="input-group mb-3">
                <input id="board_add_title" type="text" class="form-control" placeholder="제목" aria-label="제목" aria-describedby="basic-addon2">
            </div>
            <textarea id="board_add_content" class="form-control" rows="15" placeholder="내용" aria-label="내용"></textarea>
            <br>
            <button type="submit" class="btn btn-primary" id="board_add_save">저장</button>
        </div>
    `;

    document.getElementById('board_add_save').addEventListener("click", function() {
        let title = document.getElementById('board_add_title').value;
        let content = document.getElementById('board_add_content').value;

        console.log(title, content);
        let board_url = document.location.pathname;
        fetch("/api" + board_url, {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                'title' : title,
                'content' : content
            })
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                let board_name = document.location.pathname.split('/')[2];
                document.location.pathname = '/board_read/' + url_encode(board_name) + '/' + text.id;
            } else {
                alert(text.req);
            }
        });
    });
}