"use strict";

if(document.location.pathname === '/ex/set') {
    fetch("/api/set/code").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = "";
        for(let for_a = 0; for_a < text.length; for_a++) {
            data += '<li>' + text[for_a] + ' <a href="/set/code_delete/' + url_encode(text[for_a]) + '">(삭제)</a></li>';
        }

        document.getElementById('main_data').innerHTML = `
            <br>
            <div class="container px-5">
                <a id="make_code" href="javascript:void(0);">(코드 생성)</a>
                <h2>코드</h2>
                <ul id="make_code_list">
                    ` + data + `
                </ul>
            </div>
        `;

        document.getElementById('make_code').addEventListener("click", function() {
            add_code = confirm("코드를 생성하겠습니까?");
            if(add_code === true) {
                fetch("/api/set/code/add", {
                    method : 'POST'
                }).then(function(res) {
                    return res.json();
                }).then(function(text) {
                    if(text.req === 'ok') {
                        document.getElementById('make_code_list').innerHTML += '<li>' + text.code + ' <a href="/set/code_delete/' + url_encode(text.code) + '">(삭제)</a></li>';
                    } else {
                        alert(text.req + '\n' + text.reason);
                    }
                });
            }
        });
    });
}