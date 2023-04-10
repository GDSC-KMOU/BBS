if (document.location.pathname.startsWith('/ex/board/')) {
    let board_name = document.location.pathname.split('/')[3];

    fetch("/api/board/" + url_encode(board_name)).then(function (res) {
        return res.json();
    }).then(function (text) {
        let data = '';
        for (let for_a = 0; for_a < text.length; for_a++) {
            data += `
                <tr>
                    <td>` + text[for_a]['doc_id'] + `</td>
                    <td><a href="/ex/board_read/` + url_encode(board_name) + '/' + text[for_a]['doc_id'] + `">` + text[for_a]['title'] + `</a></td>
                    <td>` + text[for_a]['date'] + `</td>
                    <td>` + text[for_a]['user_name'] + `</td>
                </tr>
            `;
        }

        document.getElementById('main_data').innerHTML = `
          <section id="board">
          <div class="container-xxl p-5 board-content">
            <div class="row gap-5">
              ` + bbs_nav() + `
              <div class="col-md-9 shadow-sm rounded-5">
                <div class="container px-1">
                  <div class="table-responsive">
                    <table class="table table-striped table-sm">
                      <thead>
                        <tr class="text-center">
                          <th scope="col">번호</th>
                          <th scope="col">
                            게시글명
                            <a href="/ex/board_add/` + url_encode(board_name) + `"
                              class="text-decoration-none text-success">(글 올리기)</a>
                          </th>
                          <th scope="col">날짜</th>
                          <th scope="col">작성자</th>
                        </tr>
                      </thead>
                      <tbody>
                        ` + data + `
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    });
}