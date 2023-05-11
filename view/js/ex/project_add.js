"use strict";

if(document.location.pathname === '/ex/project_add') {
    document.getElementById('main_data').innerHTML = `
        <section id="board">
            <div class="container-xxl p-5 board-content">
                <div class="row gap-5">
                    <div class="col-md-9 shadow-sm rounded-5" style="margin: auto;">
                        <div class="container px-1">
                            <br>    
                            <div class="mb-3">
                                <input id="project_add_title" type="text" class="form-control" placeholder="제목" aria-label="제목" aria-describedby="basic-addon2">
                            </div>
                            <div class="mb-3">
                                <input id="project_add_file_name" type="text" class="form-control" placeholder="파일 이름" aria-label="파일 이름" aria-describedby="basic-addon2">
                            </div>
                            <div class="mb-3">
                                <input id="project_add_file" class="form-control" type="file" id="formFile">
                            </div>
                            <textarea id="project_add_content" class="form-control" rows="15" placeholder="내용" aria-label="내용"></textarea>
                            <br>
                            <button type="submit" class="btn btn-success" id="project_add_save">저장</button>
                            <br>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}