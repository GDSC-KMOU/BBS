"use strict";

function set_code_delete_btn(element) {
    let code = element.id;

    let add_code = confirm("코드를 삭제하시겠습니까?");
    if(add_code === true) {
        fetch("/api/set/code/delete/" + url_encode(code), {
            method : 'POST'
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                console.log(code);
                document.getElementById('remove_code_' + code).remove();
            } else {
                alert(text.req + '\n' + text.reason);
            }
        });
    }
}

if(document.location.pathname === '/set') {
    fetch("api/set/code").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = "";
        for(let for_a = 0; for_a < text.length; for_a++) {
            data += '<li id="remove_code_' + text[for_a] +  '">' + text[for_a] + ' <a class="text-decoration-none text-success" href="javascript:void(0);" onclick="set_code_delete_btn(this);" id="' + text[for_a] + '">(삭제)</a></li>';
        }

        document.getElementById('main_data').innerHTML = `
            <br>
            <div class="container px-5">
                <a class="text-decoration-none text-success" id="make_code" href="javascript:void(0);">(코드 생성)</a>
                <h2>코드</h2>
                <ul id="make_code_list">
                    ` + data + `
                </ul>
            </div>
        `;

        document.getElementById('make_code').addEventListener("click", function() {
            let add_code = confirm("코드를 생성하겠습니까?");
            if(add_code === true) {
                fetch("/api/set/code/add", {
                    method : 'POST'
                }).then(function(res) {
                    return res.json();
                }).then(function(text) {
                    if(text.req === 'ok') {
                        document.getElementById('make_code_list').innerHTML += '<li id="remove_code_' + text.code + '">' + text.code + ' <a class="text-decoration-none text-success" href="javascript:void(0);" onclick="set_code_delete_btn(this);" id="' + text.code + '">(삭제)</a></li>';
                    } else {
                        alert(text.req + '\n' + text.reason);
                    }
                });
            }
        });
    });
}