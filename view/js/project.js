"use strict";

if(document.location.pathname === '/project') {
    fetch("/api/project").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text.length; for_a++) {
            data += `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="` + text[for_a]['img_src'] + `">

                        <div class="card-body">
                            <p class="card-text">` + xss_filter(text[for_a]['post_name']) + `</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">보기</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">편집</button>
                                </div>
                                <small class="text-muted">` + xss_filter(text[for_a]['writer']) + `</small>
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
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">\
                        <a href="/project_add" class="text-decoration-none text-success">(글쓰기)</a>
                        <br>
                        ` + data + `
                    </div>
                </div>
            </div>
            <br>
        `;
    });
}