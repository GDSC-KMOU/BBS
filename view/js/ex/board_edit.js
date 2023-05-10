"use strict";

if(document.location.pathname.startsWith('/ex/board_edit/')) {
    let board_name = document.location.pathname.split('/')[3];
    let board_id = document.location.pathname.split('/')[4];

    fetch("/api/board_read/" + url_encode(board_name) + '/' + url_encode(board_id)).then(function(res) {
        return res.json();
    }).then(function(text) {
        document.getElementById('main_data').innerHTML = `
            <section id="board">
                <div class="container-xxl p-5 board-content">
                    <div class="row gap-5">
                        ` + bbs_nav() + `
                        <div class="col-md-9 shadow-sm rounded-5">
                            <div class="container px-1">
                                <br>    
                                <div class="input-group mb-3">
                                    <input id="board_add_title" type="text" value="` + text.title + `" class="form-control" placeholder="제목" aria-label="제목" aria-describedby="basic-addon2">
                                </div>
                                <textarea id="board_add_content" class="form-control" rows="15" placeholder="내용" aria-label="내용">` + text.content + `</textarea>
                                <br>
                                <button type="submit" class="btn btn-success" id="board_add_save">저장</button>
                                <br>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        document.getElementById('board_add_save').addEventListener("click", function() {
            let title = document.getElementById('board_add_title').value;
            let content = document.getElementById('board_add_content').value;

            let remove_content = true;
            if(content === '') {
                remove_content = confirm("글을 삭제하겠습니까?");
            }

            if(remove_content === true) {
                fetch("/api/board_edit/" + url_encode(board_name) + '/' + url_encode(board_id), {
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
                        if(content === '') {
                            document.location.pathname = '/ex/board/' + url_encode(board_name);
                        } else {
                            document.location.pathname = '/ex/board_read/' + url_encode(board_name) + '/' + url_encode(board_id);
                        }
                    } else {
                        alert(text.req + '\n' + text.reason);
                    }
                });
            }
        });
    });
}