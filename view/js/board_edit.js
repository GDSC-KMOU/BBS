"use strict";

function func_board_preview() {
    document.getElementById('board_add_preview').addEventListener("click", function() {
        let content = document.getElementById('board_add_content').value;
        
        fetch("/api/board_preview", {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                'content' : content
            })
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                document.getElementById('board_add_preview_field').innerHTML = text.data;
            }
        });
    });
}

function func_board_save(board_name = ' ', board_id = 0) {
    document.getElementById('board_add_save').addEventListener("click", function() {
        let title = document.getElementById('board_add_title').value;
        let content = document.getElementById('board_add_content').value;
        if(document.location.pathname.startsWith('/board_edit/')){
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
                            document.location.pathname = '/board/' + url_encode(board_name);
                        } else {
                            document.location.pathname = '/board_read/' + url_encode(board_name) + '/' + url_encode(board_id);
                        }
                    } else {
                        alert(text.req + '\n' + text.reason);
                    }
                });
            }
        } else if(document.location.pathname.startsWith('/board_add/')){
            let board_name = document.location.pathname.split('/')[2];
            fetch("/api/board_add/" + url_encode(board_name), {
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
                    document.location.pathname = '/board_read/' + url_encode(board_name) + '/' + text.id;
                } else {
                    alert(text.req + '\n' + text.reason);
                }
            });
        }
    }); 
}

function board_edit_editor(title = '', conent = '') {
    document.getElementById('main_data').innerHTML = `
        <section id="board">
            <div class="container-xxl p-5 board-content">
                <div class="row gap-5">
                    ` + bbs_nav() + `
                    <div class="col-md-9 shadow rounded-5">
                        <div class="container px-1">
                            <br>    
                            <div class="input-group mb-3">
                                <input id="board_add_title" type="text" value="` + xss_filter(title) + `" class="form-control" placeholder="제목" aria-label="제목" aria-describedby="basic-addon2">
                            </div>
                            <textarea id="board_add_content" class="form-control" rows="15" placeholder="내용" aria-label="내용">` + xss_filter(conent) + `</textarea>
                            <br>
                            <button type="submit" class="btn btn-success" id="board_add_save">저장</button> 
                            <button type="submit" class="btn btn-outline-success me-2" id="board_add_preview">미리보기</button>
                            <br>
                            <br>
                            <div id="board_add_preview_field"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

if(document.location.pathname.startsWith('/board_edit/')) {
    let board_name = document.location.pathname.split('/')[2];
    let board_id = document.location.pathname.split('/')[3];

    fetch("/api/board_read/" + url_encode(board_name) + '/' + url_encode(board_id)).then(function(res) {
        return res.json();
    }).then(function(text) {
        board_edit_editor(text.title, text.content);
        func_board_save(board_name, board_id);
        func_board_preview();
    });
}

else if(document.location.pathname.startsWith('/board_add/')) {
    board_edit_editor();
    func_board_save();
    func_board_preview();
}