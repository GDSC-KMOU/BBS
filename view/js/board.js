if(document.location.pathname.startsWith('/board/')) {
    let board_url = document.location.pathname;

    fetch("/api" + board_url).then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text.length; for_a++) {
            data += `
                <tr>
                    <td>` + text[for_a]['date'] + `</td>
                    <td><a href="` + board_url + '/' + text[for_a]['post_id'] + `">` + text[for_a]['post_name'] + `</a></td>
                    <td>` + text[for_a]['writer'] + `</td>
                    <td>` + text[for_a]['count'] + `</td>
                </tr>
            `;
        }

        document.getElementById('main_data').innerHTML = `
            ` + bbs_nav() + `
            <br>
            <div class="container px-5">
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">날짜</th>
                                <th scope="col">게시글명</th>
                                <th scope="col">작성자</th>
                                <th scope="col">조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            ` + data + `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });
}