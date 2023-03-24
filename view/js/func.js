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
        <div class="nav-scroller bg-body shadow-sm">
            <nav class="nav" aria-label="Secondary navigation">
                <a class="nav-link" href="/board/main">주요사안</a>
                <a class="nav-link" href="/board/talk">토론</a>
                <a class="nav-link" href="/board/free">자유</a>
                <a class="nav-link" href="/board/secret">비공개</a>
            </nav>
        </div>
    `;
}