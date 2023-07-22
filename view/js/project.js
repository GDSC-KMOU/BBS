"use strict";

if(document.location.pathname === '/project' || document.location.pathname.startsWith('/project/')) {
    let page = document.location.pathname.split('/')[2];
    if(page === undefined) {
        page = '1';
    }

    fetch("/api/project/" + url_encode(page)).then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text.length; for_a++) {            
            data += `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="` + text[for_a]['file_url'] + `">

                        <div class="card-body">
                            <p class="card-text">` + xss_filter(text[for_a]['title']) + `</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a type="button" href="/board_read` + xss_filter(text[for_a].bbs_id) + `" class="btn btn-sm btn-outline-secondary">보기</button>
                                    <a type="button" href="/project_edit/` + text[for_a]['doc_id'] + `" class="btn btn-sm btn-outline-secondary">편집</a>
                                </div>
                                <small class="text-muted">` + xss_filter(text[for_a]['user_name_real']) + ` (` + xss_filter(text[for_a]['team_name']) + `)</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        let before = '';
        if(page !== '1') {
            before = '<a class="text-decoration-none text-success" href="/project/' + String(Number(page) - 1) + '">(이전)</a>';
        }
        
        let after = '';
        if(text.length === 12) {
            after = '<a class="text-decoration-none text-success" href="/project/' + String(Number(page) + 1) + '">(이후)</a>';
        }

        document.getElementById('main_data').innerHTML = `
            <br>
            <div class="container px-5">
                <div class="container">
                    <a href="/project_add" class="text-decoration-none text-success">(글쓰기)</a>
                    <br>
                    <br>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        ` + data + `
                    </div>
                    <br>
                    <span style="float: left;">
                        ` + before + ` ` + after + `
                    </span>
                    <br>
                </div>
            </div>
            <br>
        `;
    });
}