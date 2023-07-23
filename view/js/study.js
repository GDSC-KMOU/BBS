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
                bbs_link += '<a class="text-decoration-none text-success fw-bold" href="/board_read' + xss_filter(text[for_a].bbs_id) + '">(게시글)</a>';
            }

            data += `
            <div class="col">
                <div class="card__study shadow-sm" style="background-color: #e8f3ed;">
                    <p class= "text-center">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="64px" height="64px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice"    focusable="false">
                    <title>` + String(for_a + 1) + `</title>
                    <rect width="100%" height="100%" fill="` + color + `"></rect>
                    </svg>
                    </p>
                    <div class="card-body">
                        <h5 class="card-title text-center">` + xss_filter(text[for_a].content) + `</h5>
                        <p class="card-text text-center border-bottom border-2 pb-2 border-success">
                        [` + xss_filter(text[for_a].team_name) + `]
                        </p>
                        <p class="card-text text-center">
                        ` + xss_filter(text[for_a].user_name_real) + `
                        </p>
                        <p class="text-center mb-0">
                        ` + xss_filter(text[for_a].date) + `
                        </p>
                        <p class="text-center">
                        ` + bbs_link + `
                            <a class="text-decoration-none text-success fw-bold" href="/study_edit/` + text[for_a].doc_id + `">(수정)</a>
                        </p>
                    </div>
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
            <div class="container px-5 mb-5">
                <div class="my-3 p-3 bg-body rounded-5 shadow">
                    <div class="d-flex justify-content-between border-bottom mb-3">
                        <h6 class="pb-2 mb-2 text-success">최근 스터디 일정</h6>
                        <h6 class="d-block text-end mt-3">
                        <span style="float: left;">
                            ` + before + ` ` + after + `
                        </span>
                        <h6><a href="/study_add" class="text-decoration-none text-success"><i class="fa-solid fa-keyboard"></i>
                        작성</a></h6>
                    </h6>
                    </div>
                    <p class="fs-6 mb-0">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice"    focusable="false">
                    <rect width="100%" height="100%" fill="dodgerblue"></rect>
                    </svg> : 진행 예정
                    </p>
                    <p class="fs-6 mb-0">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice"    focusable="false">
                    <rect width="100%" height="100%" fill="mediumseagreen"></rect>
                    </svg> : 완료
                    </p>
                    
                    <div class = "row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 mt-2">
                    ` + data+ `
                    </div>
                </div>
        `;
    });
}