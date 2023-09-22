if (document.location.pathname === "/tool") {
    document.getElementById("main_data").innerHTML = `
        <br>
        <div class="container px-5">
            <h2>공통</h2>
            <ul>
                <li>
                    <a class="text-decoration-none" href="/file_upload">파일 업로드</a>
                </li>
                <li>
                    <a class="text-decoration-none" href="/file_list">파일 목록</a>
                </li>
            </ul>
            <h2>관리자</h2>
            <ul>
                <li>
                    <a class="text-decoration-none" href="/set">설정</a>
                </li>
            </ul>
        </div>
    `;
}
