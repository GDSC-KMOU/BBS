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
        <div class="col-xxl-2 shadow rounded-5 board__nav">
            <div class="row nav gap-2 py-2 board__nav-item">
            <li class="board_item text-center" data-filter="D"><a href="/board/all"
                class="text-decoration-none text-success">전체</a> </li>
            </div>
            <li class="board_item text-center" data-filter="A"><a href="/board/main"
                class="text-decoration-none text-success">공지</a> </li>
            <li class="board_item text-center" data-filter="B"><a href="/board/talk" class="text-decoration-none text-success">기술</a>
            </li>
            <li class="board_item text-center" data-filter="C"><a href="/board/free" class="text-decoration-none text-success">자유</a>
            </li>
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


