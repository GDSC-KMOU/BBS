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

function date_change(now) {
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);

    const hour = ('0' + now.getHours()).slice(-2);
    const minute = ('0' + now.getMinutes()).slice(-2);
    const second = ('0' + now.getSeconds()).slice(-2);

    const formattedDateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return formattedDateString;
}

function get_date() {
    const now = new Date();

    return date_change(now);
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

// up button
const $upBtn = document.querySelector(".up_btn");
$upBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener('scroll', () => {
    window.scrollY > 300 ? $upBtn.classList.add('show_btn') : $upBtn.classList.remove('show_btn');
});