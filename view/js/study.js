"use strict";

if (
    document.location.pathname === "/study" ||
    document.location.pathname.startsWith("/study/")
) {
    let page = document.location.pathname.split("/")[2];
    if (page === undefined) {
        page = "1";
    }

    // 페이지 순서
    let pageButton = "";
    fetch("/api/study_length")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let pageNum = Math.ceil(data.length / 20);
            for (let i = 1; i <= pageNum; i++) {
                pageButton += `<a class="text-decoration-none pagenumber p-1 m-1" href="/study/${String(
                    i
                )}">${i}</a>`;
            }
        });

    fetch("/api/study/" + url_encode(page))
        .then(function (res) {
            return res.json();
        })
        .then(function (text) {
            let now = new Date();
            let now_unix = now.getTime();

            let color = "";

            let data = "";
            for (let for_a = 0; for_a < text.length; for_a++) {
                let past = new Date(text[for_a]["date"].replace(/-/g, "/"));
                let past_HourToSec = past.getHours() * 3600;
                let past_unix = past.getTime();

                let the_time = (now_unix - past_unix) / 1000;
                if (the_time + past_HourToSec >= 86400) {
                    color = "mediumseagreen";
                } else {
                    color = "dodgerblue";
                }

                let bbs_link = "";
                if (
                    text[for_a].bbs_id !== undefined &&
                    text[for_a].bbs_id !== null &&
                    text[for_a].bbs_id !== ""
                ) {
                    bbs_link +=
                        '<a class="text-decoration-none fw-bold" href="/board_read' +
                        xss_filter(text[for_a].bbs_id) +
                        '" style="color: #2b47b1">(게시글)</a>';
                }

                data +=
                    `
            <div class="col">
                <div class="card__study shadow-sm" style="background-color:  #d2dff0">
                    <p class= "text-center">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice"    focusable="false">
                    <title>` +
                    String(for_a + 1) +
                    `</title>
                    <rect width="100%" height="100%" fill="` +
                    color +
                    `"></rect>
                    </svg>
                    </p>
                    <div class="card-body border rounded-5 p-3 bg-white"> 
                        <p class="card-title text-center fw-bold">` +
                    xss_filter(text[for_a].content) +
                    `</p>
                        <p class="card-text text-center mb-0">
                        [` +
                    xss_filter(text[for_a].team_name) +
                    `]
                        </p>
                        <div class="card-border d-flex justify-content-center align-items-center pb-2 mb-3">
                        <span class="card-text text-center border rounded bg-light px-2 m-1">
                        ` +
                    xss_filter(text[for_a].user_name_real) +
                    `
                        </span>
                        </div>
                        <p class="text-center mb-0">
                        ` +
                    xss_filter(text[for_a].date) +
                    `
                        </p>
                        <p class="text-center">
                        ` +
                    bbs_link +
                    `
                            <a class="text-decoration-none fw-bold" href="/study_edit/` +
                    text[for_a].doc_id +
                    `" style="color: #2b47b1">(수정)</a>
                        </p>
                    </div>
                </div>
            </div>
            `;
            }

            document.getElementById("main_data").innerHTML =
                `
        <div class="container p-3">
            <div class="rounded-5 p-3 mb-2 d-flex justify-content-start align-items-center pagetop__div"style="background-color: #d2dff0;">
                <h4 class="mb-0 fw-bold" style="color: #2b47b1">Study Schedule</h4>
            </div>
        </div>
            <div class="container px-3 mb-5">
                <div class="my-3 p-3 bg-body rounded-5 shadow">
                    <div class="d-flex justify-content-end border-bottom mb-3">
                        <h6><a href="/study_add" class="text-decoration-none" style="color: #2b47b1"><i class="fa-solid fa-keyboard" style="color: #2b47b1"></i>
                        작성</a></h6>
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
                    ` +
                data +
                `
                    </div>
                    <div class= "d-flex justify-content-center align-items-center border-top mt-3">
                    ` +
                pageButton +
                `
                    </div>
                </div>
        `;
        });
}
