"use strict";

function bbs_delete_content() {
    let board_name = document.location.pathname.split('/')[2];
    let board_id = document.location.pathname.split('/')[3];

    document.getElementById('board_delete_content').addEventListener("click", function() {
        let remove_content = confirm("글을 삭제하겠습니까?");
        if(remove_content === true) {
            fetch("/api/board_edit/" + url_encode(board_name) + '/' + url_encode(board_id), {
                method : 'POST',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    'title' : '',
                    'content' : ''
                })
            }).then(function(res) {
                return res.json();
            }).then(function(text) {
                if(text.req === 'ok') {
                    document.location.pathname = '/board/' + url_encode(board_name);
                } else {
                    alert(text.req + '\n' + text.reason);
                }
            });
        }
    });
}

function bbs_delete_comment(doc_id) {
    let board_name = document.location.pathname.split('/')[2];
    let board_id = document.location.pathname.split('/')[3];

    document.getElementById('board_comment_delete_' + doc_id).addEventListener("click", function() {
        let remove_content = confirm("글을 삭제하겠습니까?");
        if(remove_content === true) {
            console.log("/api/board_comment_edit/" + url_encode(board_name) + '/' + url_encode(board_id) + '/' + url_encode(doc_id));
            fetch("/api/board_comment_edit/" + url_encode(board_name) + '/' + url_encode(board_id) + '/' + url_encode(doc_id), {
                method : 'POST',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    'content' : ''
                })
            }).then(function(res) {
                return res.json();
            }).then(function(text) {
                if(text.req === 'ok') {
                    document.location.pathname = '/board_read/' + url_encode(board_name) + '/' + url_encode(board_id);
                } else {
                    alert(text.req + '\n' + text.reason);
                }
            });
        }
    });
}

function bbs_comment() {
    let board_name = document.location.pathname.split('/')[2];
    let board_id = document.location.pathname.split('/')[3];

    document.getElementById('board_comment').addEventListener("click", function() {
        let content = document.getElementById('board_add_content').value;

        fetch("/api/board_comment_edit/" + url_encode(board_name) + '/' + url_encode(board_id), {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                'content' : content
            })
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                document.location.pathname = '/board_read/' + url_encode(board_name) + '/' + url_encode(board_id);
            } else {
                alert(text.req + '\n' + text.reason);
            }
        });
    });
}

if(document.location.pathname.startsWith('/board_read/')) {
    let board_name = document.location.pathname.split('/')[2];
    let board_id = document.location.pathname.split('/')[3];

    fetch("/api/board_read/" + url_encode(board_name) + '/' + url_encode(board_id)).then(function(res) {
        return res.json();
    }).then(function(text_1) {
        fetch("/api/board_comment/" + url_encode(board_name) + '/' + url_encode(board_id)).then(function(res) {
            return res.json();
        }).then(function(text_2) {
            let comment = '';
            for(let for_a = 0; for_a < text_2.length; for_a++) {
                comment += `
                    <div class="border p-3 rounded-4 bg-light">
                        <p class="px-2 mb-2 fw-bold comment__title">
                            ` + xss_filter(text_2[for_a].user_name_real) + `
                            <span style="float: right;">
                                ` + text_2[for_a].date + `
                                ·
                                <a id="board_comment_delete_` + text_2[for_a].doc_id + `" class="text-decoration-none text-success" href="javascript:void(0);">
                                    <i class="fa-solid fa-trash text-success"></i>
                                    삭제
                                </a>
                            </span>
                        </p>
                        <p>` + text_2[for_a].render_content + `</p>
                    </div>
                    <br>
                `;
            }

            document.getElementById('main_data').innerHTML = `
                <section id="board">
                    <div class="container-xxl p-3 board-content">
                        <div class="row gap-5">
                            ` + bbs_nav() + `
                            <div class="col-xxl-9 p-4 shadow rounded-5">
                                <div class="container px-1">
                                    <h3 class="mb-0">` + xss_filter(text_1.title) + `</h3>
                                        <div class="d-flex justify-content-between border-bottom py-2">
                                            <div>
                                                <span class="board__add-write">`+ xss_filter(text_1.user_name_real) + `</span>
                                                <span class="board__add-date px-3">` + text_1.date + `</sapn>
                                            </div>
                                            <div>
                                                <span class="boardread_left">
                                                    <a class="text-decoration-none text-success" href="/board_edit/` + url_encode(board_name) + `/` + url_encode(board_id) + `">
                                                        <i class="fa-solid fa-pen-to-square text-success"></i>    
                                                        수정
                                                    </a>
                                                    ·
                                                    <a id="board_delete_content" class="text-decoration-none text-success" href="javascript:void(0);">
                                                        <i class="fa-solid fa-trash text-success"></i>
                                                        삭제
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                    <p class="lead">` + text_1.render_content + `</p>
                                    <hr>
                                    ` + comment + `
                                    <div class="border p-3 rounded-4 bg-light" style="height: 200px;">
                                        <p class="px-2 mb-2 fw-bold comment__title">댓글</p>
                                        <textarea id="board_add_content" class="form-control form-control-sm mb-2" rows="4" placeholder="댓글 내용을 입력하세요." aria-label="내용" ></textarea>
                                        
                                        <button type="submit" class="btn btn-success" id="board_comment">저장</button> 
                                        <button type="submit" class="btn btn-outline-success me-2" id="board_add_preview">미리보기</button>
                                    </div>
                                    <br>
                                    <div id="board_add_preview_field"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            
            hljs.highlightAll();
            
            func_board_preview();
            
            bbs_delete_content();
            bbs_comment();

            for(let for_a = 0; for_a < text_2.length; for_a++) {
                bbs_delete_comment(text_2[for_a].doc_id);
            }
        });
    });
}