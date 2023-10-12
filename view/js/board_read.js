"use strict";

function bbs_delete_content() {
    let board_name = document.location.pathname.split("/")[2];
    let board_id = document.location.pathname.split("/")[3];

    document
        .getElementById("board_delete_content")
        .addEventListener("click", function () {
            let remove_content = confirm("글을 삭제하겠습니까?");
            if (remove_content === true) {
                fetch(
                    "/api/board_edit/" +
                        url_encode(board_name) +
                        "/" +
                        url_encode(board_id),
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            title: "",
                            content: "",
                        }),
                    }
                )
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (text) {
                        if (text.req === "ok") {
                            document.location.pathname =
                                "/board/" + url_encode(board_name);
                        } else {
                            alert(text.req + "\n" + text.reason);
                        }
                    });
            }
        });
}

function bbs_notice_content() {
    let board_name = document.location.pathname.split("/")[2];
    let board_id = document.location.pathname.split("/")[3];

    document
        .getElementById("board_notice_content")
        .addEventListener("click", function () {
            let remove_content = confirm("글을 공지사항으로 등록하겠습니까?");
            if (remove_content === true) {
                fetch(
                    "/api/board_notice/" +
                        url_encode(board_name) +
                        "/" +
                        url_encode(board_id),
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }
                )
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (text) {
                        if (text.req === "ok") {
                            document.location.pathname =
                                "/board/" + url_encode(board_name);
                        } else {
                            alert(text.req + "\n" + text.reason);
                        }
                    });
            }
        });
}

function bbs_delete_comment(doc_id) {
    let board_name = document.location.pathname.split("/")[2];
    let board_id = document.location.pathname.split("/")[3];

    document
        .getElementById("board_comment_delete_" + doc_id)
        .addEventListener("click", function () {
            let remove_content = confirm("글을 삭제하겠습니까?");
            if (remove_content === true) {
                fetch(
                    "/api/board_comment_edit/" +
                        url_encode(board_name) +
                        "/" +
                        url_encode(board_id) +
                        "/" +
                        url_encode(doc_id),
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            content: "",
                        }),
                    }
                )
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (text) {
                        if (text.req === "ok") {
                            document.location.pathname =
                                "/board_read/" +
                                url_encode(board_name) +
                                "/" +
                                url_encode(board_id);
                        } else {
                            alert(text.req + "\n" + text.reason);
                        }
                    });
            }
        });
}

function bbs_comment() {
    let board_name = document.location.pathname.split("/")[2];
    let board_id = document.location.pathname.split("/")[3];

    document
        .getElementById("board_comment")
        .addEventListener("click", function () {
            let content = document.getElementById("board_add_content").value;

            fetch(
                "/api/board_comment_edit/" +
                    url_encode(board_name) +
                    "/" +
                    url_encode(board_id),
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        content: content,
                    }),
                }
            )
                .then(function (res) {
                    return res.json();
                })
                .then(function (text) {
                    if (text.req === "ok") {
                        document.location.pathname =
                            "/board_read/" +
                            url_encode(board_name) +
                            "/" +
                            url_encode(board_id);
                    } else {
                        alert(text.req + "\n" + text.reason);
                    }
                });
        });
}

if (document.location.pathname.startsWith("/board_read/")) {
    let board_name = document.location.pathname.split("/")[2];
    let board_id = document.location.pathname.split("/")[3];
    let boardDisplay = "";
    const boardState = (e) => {
        switch (e) {
            case "main":
                boardDisplay = "공지";
                break;
            case "talk":
                boardDisplay = "기술";
                break;
            case "free":
                boardDisplay = "자유";
                break;
            case "all":
                boardDisplay = "전체";
                break;
        }
        return boardDisplay;
    };
    fetch(
        "/api/board_read/" + url_encode(board_name) + "/" + url_encode(board_id)
    )
        .then(function (res) {
            return res.json();
        })
        .then(function (text_1) {
            fetch(
                "/api/board_comment/" +
                    url_encode(board_name) +
                    "/" +
                    url_encode(board_id)
            )
                .then(function (res) {
                    return res.json();
                })
                .then(function (text_2) {
                    let comment = "";
                    for (let for_a = 0; for_a < text_2.length; for_a++) {
                        comment +=
                            `
                    <div class="border p-3 rounded-4 bg-light">
                        <p class="px-2 mb-2 fw-bold comment__title">
                            ` +
                            xss_filter(text_2[for_a].user_name_real) +
                            `
                            <span style="float: right;">
                                ` +
                            text_2[for_a].date +
                            `
                                ·
                                <a id="board_comment_delete_` +
                            text_2[for_a].doc_id +
                            `" class="text-decoration-none board__icon-color2" href="javascript:void(0);">
                                    <i class="fa-solid fa-trash board__icon-color2"></i>
                                    삭제
                                </a>
                            </span>
                        </p>
                        <p>` +
                            text_2[for_a].render_content +
                            `</p>
                    </div>
                    <br>
                `;
                    }

                    document.getElementById("main_data").innerHTML =
                        `
                        <div class="container p-3">
            <div class="rounded-5 p-3 mb-2 d-flex justify-content-start align-items-center pagetop__div"style="background-color: #d2dff0">
                <h4 class="mb-0 ms-3 fw-bold" style="color: #2b47b1">${boardState(
                    board_name
                )}</h4>
            </div>
        </div>
                <section id="board">
                    <div class="container mb-3 p-3 board-content">
                        <div class="d-flex row justify-content-between board-content gap-3">
                            ` +
                        bbs_nav() +
                        `
                            <div class="col-xxl-9 p-3 shadow rounded-5 board__right">
                                <div class="container p-3">
                                    <h3 class="mb-0 board__font-color">` +
                        xss_filter(text_1.title) +
                        `</h3>
                                        <div class="d-flex justify-content-between border-bottom py-2">
                                            <div>
                                                <span class="board__add-write">` +
                        xss_filter(text_1.user_name_real) +
                        `</span>
                                                <span class="board__add-date px-3">` +
                        text_1.date +
                        `</sapn>
                                            </div>
                                            <div>
                                                <span class="boardread_left">
                                                    <a id="board_notice_content" class="text-decoration-none board__icon-color1 mx-2" href="javascript:void(0);">
                                                        <i class="fa-solid fa-bell board__icon-color3"></i>
                                                        공지
                                                    </a>
                                                    /
                                                    <a class="text-decoration-none text-dark mx-2" href="/board_edit/` +
                        url_encode(board_name) +
                        `/` +
                        url_encode(board_id) +
                        `">
                                                        <i class="fa-solid fa-pen-to-square text-dark"></i>    
                                                        수정
                                                    </a>
                                                    /
                                                    <a id="board_delete_content" class="text-decoration-none text-danger mx-2" href="javascript:void(0);">
                                                        <i class="fa-solid fa-trash text-danger"></i>
                                                        삭제
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                    <p class="lead">` +
                        text_1.render_content +
                        `</p>
                                    <hr>
                                    ` +
                        comment +
                        `
                                    <div class="border p-3 rounded-4 bg-light" style="height: 185px;">
                                        <p class="px-2 mb-2 fw-bold comment__title">댓글</p>
                                        <textarea id="board_add_content" class="form-control form-control-sm mb-2" rows="4" placeholder="댓글 내용을 입력하세요." aria-label="내용" ></textarea>
                                        
                                        <button type="submit" class="btn btn-outline-primary px-2 py-0" id="board_add_preview" style="float:right;">미리보기</button>
                                        <button type="submit" class="btn btn-primary px-2 py-0 me-2"id="board_comment" style="float:right;">저장</button> 
                                        
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
                    bbs_notice_content();
                    bbs_comment();

                    for (let for_a = 0; for_a < text_2.length; for_a++) {
                        bbs_delete_comment(text_2[for_a].doc_id);
                    }
                });
        });
}
