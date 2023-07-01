"use strict";

if(document.location.pathname === '/study' || document.location.pathname.startsWith('/study/')) {
    let page = document.location.pathname.split('/')[2];
    if(page === undefined) {
        page = '1';
    }

    fetch("/api/study/" + url_encode(page)).then(function(res) {
        return res.json();
    }).then(function(text) {
        let now = new Date();
        let now_unix = now.getTime();

        let color = "";
        
        let data = '';
        for(let for_a = 0; for_a < text.length; for_a++) {
            let past = new Date(text[for_a]['date'].replace(/-/g, '/'));
            let past_HourToSec = past.getHours() * 3600; 
            let past_unix = past.getTime(); 
            
            let the_time = (now_unix - past_unix) / 1000; 
            if((the_time + past_HourToSec) >= 86400) {
                color = "mediumseagreen";
            } else {
                color = "dodgerblue";
            }

            let bbs_link = '';
            if(text[for_a].bbs_id !== undefined && text[for_a].bbs_id !== null && text[for_a].bbs_id !== '') {
                bbs_link += '<a class="text-decoration-none text-success" href="/board_read' + xss_filter(text[for_a].bbs_id) + '">(게시글)</a>';
            }

            data += `
                <div class="d-flex text-muted pt-3">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>` + String(for_a + 1) + `</title>
                        <rect width="100%" height="100%" fill="` + color + `"></rect>
                    </svg>

                    <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                        <div class="d-flex justify-content-between">
                            <strong class="text-gray-dark">` + xss_filter(text[for_a].team_name) + ` (` + xss_filter(text[for_a].user_name_real) + `)</strong>
                            ` + xss_filter(text[for_a].date) + `
                        </div>
                        <span class="d-block">
                            ` + xss_filter(text[for_a].content) + `
                            ` + bbs_link + `
                            <a class="text-decoration-none text-success" href="/study_edit/` + text[for_a].doc_id + `">(수정)</a>
                        </span>
                    </div>
                </div>
            `;
        }

        let before = '';
        if(page !== '1') {
            before = '<a class="text-decoration-none text-success" href="/study/' + String(Number(page) - 1) + '">(이전)</a>';
        }
        
        let after = '';
        if(text.length === 20) {
            after = '<a class="text-decoration-none text-success" href="/study/' + String(Number(page) + 1) + '">(이후)</a>';
        }

        document.getElementById('main_data').innerHTML = `
            <div class="container px-5">
                <div class="my-3 p-3 bg-body rounded-5 shadow">
                    <h6 class="border-bottom pb-2 mb-0 text-success">최근 스터디 및 세미나 일정</h6>
                    ` + data+ `
                    
                    <small class="d-block text-end mt-3">
                        <span style="float: left;">
                            ` + before + ` ` + after + `
                        </span>
                        <a href="/study_add" class="text-decoration-none text-success">(추가)</a>
                    </small>
                </div>
        `;
    });
}