"use strict";

if(document.location.pathname.startsWith('/board/')) {
    let board_name = document.location.pathname.split('/')[2];

    fetch("/api/board/" + url_encode(board_name)).then(function (res) {
        return res.json();
    }).then(function (text) {
        let data = '';
        let now=new Date().getTime();
        let the_str='0'
        for (let for_a = 0; for_a < text.length; for_a++) {
            let past_time=new Date(text[for_a]['date']);
            past_time=past_time.getTime();
            
            let the_time= new Date(now - past_time); 
            the_time= the_time/1000; //ms->s
            
            if (the_time<60){
                the_str= String(Math.floor(the_time)) + "초전";
            } else if(the_time<3600){ //1h
                the_str= String(Math.floor(the_time / 60)) + "분전";
            } else if(the_time<86400){ //1d
                the_str= String(Math.floor(the_time / 3600)) + "시간전";
            } else if(the_time<604800){  //7d
                the_str= String(Math.floor(the_time / 86400)) + "일전";
            } else if(the_time<2592000){ //30d
                the_str= String(Math.floor(the_time / 604800)) + "주일전";
            } else if(the_time<7776000){ //90d
                the_str= String(Math.floor(the_time / 2592000)) + "달 전";
            } else{
                the_str=Number(the_str);
                the_str=text[for_a]['date'].split(' ')[0];
            }
            data += `
                <tr>
                    <td>` + text[for_a]['doc_id'] + `</td>
                    <td><a class="text-decoration-none text-success" href="/board_read/` + url_encode(board_name) + '/' + text[for_a]['doc_id'] + `">` + xss_filter(text[for_a]['title']) + `</a></td>
                    <td>` + the_str + `</td>
                    <td>` + xss_filter(text[for_a]['user_name_real']) + `</td>
                </tr>
            `;
        }

        document.getElementById('main_data').innerHTML = `
            <section id="board">
                <div class="container-xxl p-5 board-content">
                    <a href="/board_add/` + url_encode(board_name) + `" class="text-decoration-none text-success">(글쓰기)</a>
                    <br>
                    <div class="row gap-5">
                        ` + bbs_nav() + `
                        <div class="col-md-9 shadow-sm rounded-5">
                            <div class="container px-1">
                                <div class="table-responsive">
                                    <table class="table table-striped table-sm">
                                    <thead>
                                    <tr class="text-center">
                                        <th scope="col">
                                            번호
                                        </th>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    });
}