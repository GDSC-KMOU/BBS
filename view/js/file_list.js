"use strict";

if(document.location.pathname === '/file_list' || document.location.pathname.startsWith('/file_list/')) {
    let page = document.location.pathname.split('/')[2];
    if(page === undefined) {
        page = '1';
    }

    fetch("/api/file_list/" + url_encode(page)).then(function(res) {
        return res.json();
    }).then(function(text) {
        let before = '';
        if(page !== '1') {
            before = '<a class="text-decoration-none text-success" href="/file_list/' + String(Number(page) - 1) + '">(이전)</a>';
        }
        
        let after = '';
        if(text.length === 20) {
            after = '<a class="text-decoration-none text-success" href="/file_list/' + String(Number(page) + 1) + '">(이후)</a>';
        }

        let data = '';
        for(let for_a = 0; for_a < text.length; for_a++) {
            let file_name = text[for_a];
            let file_name_lst = file_name.split('.');
            let file_ext = file_name_lst[file_name_lst.length - 1];
            let file_src = '';
            if(['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(file_ext)) {
                file_src = '/file/' + url_encode(text[for_a]);
            }

            data += `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="` + file_src + `">

                        <div class="card-body">
                            <p class="card-text">` + xss_filter(text[for_a]) + `</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button id="file_list_button_1_` + String(for_a) + `" type="button" class="btn btn-sm btn-outline-secondary">보기</button>
                                    <button id="file_list_button_2_` + String(for_a) + `" type="button" class="btn btn-sm btn-outline-secondary">삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        document.getElementById('main_data').innerHTML = `
            <br>
            <div class="container px-5">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        ` + data + `
                    </div>
                    <br>
                    ` + before + ` ` + after + `
                </div>
            </div>
            <br>
        `;

        for(let for_a = 0; for_a < text.length; for_a++) {
            document.getElementById('file_list_button_1_' + String(for_a)).addEventListener("click", function() {
                let file_src = '/file/' + url_encode(text[for_a]);
                window.location.href = file_src;
            });

            document.getElementById('file_list_button_2_' + String(for_a)).addEventListener("click", function() {
                let file_src = '/file_remove/' + url_encode(text[for_a]);
                window.location.href = file_src;
            });
        }
    });
}