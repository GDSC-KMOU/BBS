"use strict";

if (
    document.location.pathname === "/project" ||
    document.location.pathname.startsWith("/project/")
) {
    let page = document.location.pathname.split("/")[2];
    if (page === undefined) {
        page = "1";
    }
    let pageButton = "";
    fetch("/api/project_length")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let pageNum = Math.ceil(data.length / 12);
            for (let i = 1; i <= pageNum; i++) {
                pageButton += `<a class="text-decoration-none pagenumber p-1 m-1" href="/project/${String(
                    i
                )}">${i}</a>`;
            }
        });

    fetch("/api/project/" + url_encode(page))
        .then(function (res) {
            return res.json();
        })
        .then(function (text) {
            let data = "";
            for (let for_a = 0; for_a < text.length; for_a++) {
                data +=
                    `
                <div class="col">
                    <div class="card card__project shadow-sm">
                    <img class="card-img-top" src="` +
                    text[for_a]["file_url"] +
                    `">
                        <div class="card-body">
                            <p class="card-text">` +
                    xss_filter(text[for_a]["title"]) +
                    `</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a type="button" href="/board_read` +
                    xss_filter(text[for_a].bbs_id) +
                    `" class="btn btn-sm btn-outline-secondary">보기</button>
                                    <a type="button" href="/project_edit/` +
                    text[for_a]["doc_id"] +
                    `" class="btn btn-sm btn-outline-secondary">편집</a>
                                </div>
                                <small class="text-muted">[` +
                    xss_filter(text[for_a]["user_name_real"]) +
                    `] ` +
                    xss_filter(text[for_a]["team_name"]) +
                    `</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            }
            document.getElementById("main_data").innerHTML =
                `
        <section id="projectCarousel" class="container carousel slide carousel-fade mt-3 mb-4" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#projectCarousel" data-bs-slide-to="0" class="active" aria-current="true"
                aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#projectCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active" style="background-image: url(/view/img/includer&GDSC.png);" data-bs-interval="5000">
                    <div class="carousel-overlay"></div>
                </div>
                <div class="carousel-item" style="background-image: url(/view/img/includerBlog.png);" data-bs-interval="5000">
                    <div class="carousel-overlay"></div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#projectCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#projectCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </section>
            <div class="container container rounded-4 bg-light">
            <div></div>
                <div class="container container">
                    <div class="project__border-top d-flex justify-content-end p-2 mb-3">
                    <span class="project__upload-btn rounded px-1 border border-primary bg-light">
                    <a href="/project_add" class="text-decoration-none uploadtext">
                    <i class="fa-solid fa-upload uploadtext"></i> 업로드
                    </span>
                    </a>
                    </div>

                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                        ` +
                data +
                `
                    </div>
                    <br>
                    <div class="project__border-bottom d-flex justify-content-center align-items-center mt-3">
                    ` +
                pageButton +
                `
                    </div>
                    <br>
                </div>
            </div>
            <br>
        `;
        });
}
