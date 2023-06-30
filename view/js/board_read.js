"use strict";

if(document.location.pathname.startsWith('/board_read/')) {
    let board_name = document.location.pathname.split('/')[2];
    let board_id = document.location.pathname.split('/')[3];

    fetch("/api/board_read/" + url_encode(board_name) + '/' + url_encode(board_id)).then(function(res) {
        return res.json();
    }).then(function(text) {
        document.getElementById('main_data').innerHTML = `
            <section id="board">
                <div class="container-xxl p-5 board-content">
                    <div class="row gap-5">
                        ` + bbs_nav() + `
                        <div class="col-md-9 p-4 shadow-sm rounded-5">
                            <div class="container px-1">
                                <h3 class="mb-0">` + xss_filter(text.title) + `</h3>
                                <p class="py-2 border-bottom">
                                    <span class="board__add-write">`+ xss_filter(text.user_name_real) + `</span>
                                    <span class="board__add-date px-3">` + text.date + `</sapn>
                                    <span style="float:right">
                                    <i class="fa-regular fa-pen-to-square text-success"></i>
                                    <a class="text-decoration-none text-success" href="/board_edit/` + url_encode(board_name) + `/` + url_encode(board_id) + `">수정 및 삭제</a>
                                    </span>
                                </p>
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