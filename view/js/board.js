"use strict";

if(document.location.pathname.startsWith('/board/')) {
    let board_name = document.location.pathname.split('/')[2];
    let page = document.location.pathname.split('/')[3];
    if(page === undefined) {
        page = '1';
    }

    fetch("/api/board/" + url_encode(board_name) + "/" + url_encode(page)).then(function (res) {
        return res.json();
    }).then(function (text) {
        let data = '';

        let now = new Date().getTime();
        let the_str = '0';
        for(let for_a = 0; for_a < text.length; for_a++) {
            let past_time = new Date(text[for_a]['date'].replace(/-/g, '/'));
            past_time = past_time.getTime();
            
            let the_time = new Date(now - past_time); 
            the_time = the_time / 1000; //ms->s
            
            if(the_time < 60){
                the_str = String(Math.floor(the_time)) + "초 전";
            } else if(the_time < 3600){ //1h
                the_str = String(Math.floor(the_time / 60)) + "분 전";
            } else if(the_time < 86400){ //1d
                the_str = String(Math.floor(the_time / 3600)) + "시간 전";
            } else if(the_time < 604800){  //7d
                the_str = String(Math.floor(the_time / 86400)) + "일 전";
            } else if(the_time < 2592000){ //30d
                the_str = String(Math.floor(the_time / 604800)) + "주일 전";
            } else if(the_time < 7776000){ //90d
                the_str = String(Math.floor(the_time / 2592000)) + "달 전";
            } else{
                the_str = Number(the_str);
                the_str = text[for_a]['date'].split(' ')[0];
            }

            data += `
                <tr>
                    <td ><a class="text-decoration-none text-success ms-1" href="/board_read/` + url_encode(board_name) + '/' + text[for_a]['doc_id'] + `">` + xss_filter(text[for_a]['title']) + `</a></td>
                    <td class="text-center">` + the_str + `</td>
                    <td class="text-center">` + xss_filter(text[for_a]['user_name_real']) + `</td>
                </tr>
            `;
        }

        let before = '';
        if(page !== '1') {
            before = '<a class="text-decoration-none text-success" href="/board/' + url_encode(board_name) + '/' + String(Number(page) - 1) + '">(이전)</a>';
        }
        
        let after = '';
        if(text.length === 20) {
            after = '<a class="text-decoration-none text-success" href="/board/' + url_encode(board_name) + '/' + String(Number(page) + 1) + '">(이후)</a>';
        }

        if(before !== '' || after !== '') {
            data += `
                <tr>
                    <td colspan="4">` + before + ` ` + after + `</td>
                </tr>
            `;
        }

        document.getElementById('main_data').innerHTML = `
            <section id="board">
                <div class="container-xxl p-3 board-content">                
                    <div class="row gap-5">
                        ` + bbs_nav() + `
                        <div class="col-md-9 p-3 shadow rounded-5">
                            <div class="container px-1">
                                <div class="table-responsive">
                                    <table class="table table-hover table-sm table__rounded">
                                        <thead>
                                            <tr class="text-center">
                                                <th scope="col">
                                                    게시글명
                                                </th>
                                                <th scope="col">
                                                    시간
                                                </th>
                                                <th scope="col">
                                                    작성자
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ` + data + `
                                        </tbody>
                                    </table>
                                    <p class="text-end fw-bold mb-0">
                                        <span class="board__write px-1">
                                            <a href="/board_add/` + url_encode(board_name) + `" class="text-decoration-none">
                                            <i class="fa-solid fa-pencil"></i>
                                            글쓰기
                                            </a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    });
}