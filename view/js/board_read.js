"use strict";

if(document.location.pathname.startsWith('/board_read/')) {
    let board_name = document.location.pathname.split('/')[2];
    let board_id = document.location.pathname.split('/')[3];

    fetch("/api/board_read/" + url_encode(board_name) + '/' + url_encode(board_id)).then(function(res) {
        return res.json();
    }).then(function(text) {
        document.getElementById('main_data').innerHTML = `
            <section id="board">
                <div class="container-xxl p-3 board-content">
                    <div class="row gap-5">
                        ` + bbs_nav() + `
                        <div class="col-xxl-9 p-4 shadow rounded-5">
                            <div class="container px-1">
                                <h3 class="mb-0">` + xss_filter(text.title) + `</h3>
                                    <div class="d-flex justify-content-between border-bottom py-2">
                                        <div>
                                            <span class="board__add-write">`+ xss_filter(text.user_name_real) + `</span>
                                            <span class="board__add-date px-3">` + text.date + `</sapn>
                                        </div>
                                        <div>
                                            <span class="boardread_left">
                                            <i class="fa-regular fa-pen-to-square text-success"></i>
                                            <a class="text-decoration-none text-success" href="/board_edit/` + url_encode   (board_name) + `/` + url_encode(board_id) + `">수정 및 삭제</a>
                                            </span>
                                        </div>
                                    </div>
                                <p class="lead">` + text.render_content + `</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        hljs.highlightAll();
    });
}