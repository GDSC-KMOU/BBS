"use strict";

function func_study_preview(){
    document.getElementById('study_preview').addEventListener("click", function() {
        let team_name = document.getElementById('study_team_name').value;
        let date = document.getElementById('study_date').value;
        let content = document.getElementById('study_content').value;

        try {
            date = new Date(date);
            if(isNaN(date.getTime())) {
                throw new Error();
            }

            date = date_change(date);
        } catch {
            date = get_date();
        }

        document.getElementById('study_preview_field').innerHTML = `
            <div class="d-flex text-muted pt-3">
                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>상태</title>
                    <rect width="100%" height="100%" fill="mediumseagreen"></rect>
                </svg>

                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between">
                        <strong class="text-gray-dark">` + xss_filter(team_name) + ` (이름)</strong>
                        ` + xss_filter(date) + `
                    </div>
                    <span class="d-block">` + xss_filter(content) + `</span>
                </div>
            </div>
        `;
    });
}

function func_study_save(study_id=0){
    document.getElementById('study_save').addEventListener("click", function() {
        let team_name = document.getElementById('study_team_name').value;
        let date = document.getElementById('study_date').value;
        let content = document.getElementById('study_content').value;
        let bbs_id = document.getElementById('study_bbs_id').value;
    if(document.location.pathname === '/study_add'){
        fetch("/api/study_add", {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                'team_name' : team_name,
                'date' : date,
                'content' : content,
                'bbs_id' : bbs_id
            })
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                document.location.pathname = '/study';
            } else {
                alert(text.req + '\n' + text.reason);
            }
        });
    } else if(document.location.pathname.startsWith('/study_edit/')){
            fetch("/api/study_edit/" + url_encode(study_id), {
                method : 'POST',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    'team_name' : team_name,
                    'date' : date,
                    'content' : content,
                    'bbs_id' : bbs_id
                })
            }).then(function(res) {
                return res.json();
            }).then(function(text) {
                if(text.req === 'ok') {
                    document.location.pathname = '/study';
                } else {
                    alert(text.req + '\n' + text.reason);
                }
            });   
    }

    
    }); //save end 


}

if(document.location.pathname === '/study_add'){
    document.getElementById('main_data').innerHTML = `
        <section id="board">
            <div class="container-xxl p-5 board-content">
                <div class="row gap-5">
                    <div class="col-md-9 shadow-sm rounded-5" style="margin: auto;">
                        <div class="container px-1">
                            <br>    
                            <div class="form-floating">
                                <input type="text" class="form-control" id="study_team_name" placeholder="팀 이름">
                                <label for="study_team_name">팀 이름</label>
                            </div>
                            <br>    
                            <div class="form-floating">
                                <input type="datetime-local" class="form-control" id="study_date" placeholder="날짜">
                                <label for="study_date">날짜</label>
                            </div>
                            <br>  
                            <div class="form-floating">
                                <input type="text" class="form-control" id="study_content" placeholder="내용">
                                <label for="study_content">내용</label>
                            </div>
                            <br>
                            <div class="form-floating">
                                <input type="text" class="form-control" id="study_bbs_id" placeholder="내용">
                                <label for="study_bbs_id">게시판 연계 (EX : /main/3)</label>
                            </div>
                            <br>
                            <button type="submit" class="btn btn-success" id="study_save">저장</button>
                            <button type="submit" class="btn btn-outline-success me-2" id="study_preview">미리보기</button>
                            <br>
                            <br>
                            <div id="study_preview_field"></div>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

func_study_save();
func_study_preview();
}

else if(document.location.pathname.startsWith('/study_edit/')){
    let study_id = document.location.pathname.split('/')[2];

    fetch("/api/study_read/" + url_encode(study_id)).then(function(res) {
        return res.json();
    }).then(function(text) {
        let bbs_id = '';
        if(text.bbs_id !== undefined && text.bbs_id !== null) {
            bbs_id = text.bbs_id;
        }

        document.getElementById('main_data').innerHTML = `
            <section id="board">
                <div class="container-xxl p-5 board-content">
                    <div class="row gap-5">
                        <div class="col-md-9 shadow-sm rounded-5" style="margin: auto;">
                            <div class="container px-1">
                                <br>    
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="study_team_name" value="` + xss_filter(text.team_name) + `" placeholder="팀 이름">
                                    <label for="study_team_name">팀 이름</label>
                                </div>
                                <br>    
                                <div class="form-floating">
                                    <input type="datetime-local" class="form-control" id="study_date" value="` + xss_filter(text.date) + `" placeholder="날짜">
                                    <label for="study_date">날짜</label>
                                </div>
                                <br>  
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="study_content" value="` + xss_filter(text.content) + `" placeholder="내용">
                                    <label for="study_content">내용</label>
                                </div>
                                <br>
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="study_bbs_id" value="` + xss_filter(bbs_id) + `" placeholder="내용">
                                    <label for="study_bbs_id">게시판 연계 (EX : /main/3)</label>
                                </div>
                                <br>
                                <button type="submit" class="btn btn-success" id="study_save">저장</button>
                                <button type="submit" class="btn btn-outline-success me-2" id="study_preview">미리보기</button>
                                <br>
                                <br>
                                <div id="study_preview_field"></div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

    func_study_save(study_id);
    func_study_preview(); 
    });   
}