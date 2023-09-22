"use strict";

function func_project_preview() {
    document
        .getElementById("project_preview")
        .addEventListener("click", function () {
            let team_name = document.getElementById("project_team_name").value;
            let title = document.getElementById("project_title").value;
            let file_url = document.getElementById("project_file_url").value;

            document.getElementById("project_preview_field").innerHTML =
                `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="` +
                xss_filter(file_url) +
                `">

                    <div class="card-body">
                        <p class="card-text">` +
                xss_filter(title) +
                `</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">보기</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">편집</button>
                            </div>
                            <small class="text-muted">이름 (` +
                xss_filter(team_name) +
                `)</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        });
}

function func_project_save(project_id = 0) {
    document
        .getElementById("project_save")
        .addEventListener("click", function () {
            let team_name = document.getElementById("project_team_name").value;
            let title = document.getElementById("project_title").value;
            let file_url = document.getElementById("project_file_url").value;
            let bbs_id = document.getElementById("project_bbs_id").value;

            let url = "/api/project_add";
            if (document.location.pathname.startsWith("/project_edit/")) {
                url = "/api/project_edit/" + url_encode(project_id);
            }

            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    team_name: team_name,
                    title: title,
                    file_url: file_url,
                    bbs_id: bbs_id,
                }),
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (text) {
                    if (text.req === "ok") {
                        document.location.pathname = "/project";
                    } else {
                        alert(text.req + "\n" + text.reason);
                    }
                });
        });
}

function func_project_editor(
    team_name = "",
    title = "",
    file_url = "",
    bbs_id = ""
) {
    document.getElementById("main_data").innerHTML =
        `
        <section id="board">
            <div class="container-xxl p-5 board-content">
                <div class="row gap-5">
                    <div class="col-md-9 shadow-sm rounded-5" style="margin: auto;">
                        <div class="container px-1">
                            <br>
                            <div class="form-floating">
                                <input type="text" class="form-control" id="project_team_name" value="` +
        xss_filter(team_name) +
        `" placeholder="팀 이름">
                                <label for="project_team_name">팀 이름</label>
                            </div>
                            <br>
                            <div class="form-floating">
                                <input type="text" class="form-control" id="project_title" value="` +
        xss_filter(title) +
        `" placeholder="제목">
                                <label for="project_title">제목</label>
                            </div>
                            <br>
                            <div class="form-floating">
                                <input type="text" class="form-control" id="project_file_url"  value="` +
        xss_filter(file_url) +
        `" placeholder="파일 주소">
                                <label for="project_file_url">파일 주소</label>
                            </div>
                            <br>
                            <div class="form-floating">
                                <input type="text" class="form-control" id="project_bbs_id"  value="` +
        xss_filter(bbs_id) +
        `" placeholder="게시판 연계">
                                <label for="project_bbs_id">게시판 연계 (EX : /main/3)</label>
                            </div>
                            <br>
                            <button type="submit" class="btn btn-primary" id="project_save">저장</button>
                            <button type="submit" class="btn btn-outline-primary me-2" id="project_preview">미리보기</button>
                            <br>
                            <br>
                            <div id="project_preview_field"></div>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

if (document.location.pathname === "/project_add") {
    func_project_editor();

    func_project_save();
    func_project_preview();
} else if (document.location.pathname.startsWith("/project_edit/")) {
    let project_id = document.location.pathname.split("/")[2];

    fetch("/api/project_read/" + url_encode(project_id))
        .then(function (res) {
            return res.json();
        })
        .then(function (text) {
            let bbs_id = "";
            if (text.bbs_id !== undefined && text.bbs_id !== null) {
                bbs_id = text.bbs_id;
            }

            func_project_editor(
                text.team_name,
                text.title,
                text.file_url,
                bbs_id
            );

            func_project_save(project_id);
            func_project_preview();
        });
}
