"use strict";

// multipurpose
function url_encode(data) {
    return encodeURIComponent(data);
}

function xss_filter(data) {
    data = data.replace('"', "&quot;");
    data = data.replace("'", "&#x27;");
    data = data.replace("<", "&lt;");
    data = data.replace(">", "&gt;");

    return data;
}

// purposeful
// board
function bbs_nav() {
    return `
        <div class="col-md-2 shadow-sm rounded-5">
            <div class="row nav gap-2 py-2">
            <li class="board_item text-center"><a href="/board/main"
                class="text-decoration-none text-success fw-bold">주요사안</a> </li>
            <li class="board_item text-center"><a href="/board/talk" class="text-decoration-none text-success">토론</a>
            </li>
            <li class="board_item text-center"><a href="/board/free" class="text-decoration-none text-success">자유</a>
            </li>
            <li class="board_item text-center"><a href="/board/secret"
                class="text-decoration-none text-success">비공개</a> </li>
            </div>
        </div>
    `;
}