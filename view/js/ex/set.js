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

if(document.location.pathname === '/ex/set') {
    fetch("/api/set/load/code_key").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = "";
        for(let for_a = 0; for_a < text.length; for_a++) {
            data += '<li id="remove_code_' + text[for_a] + '">' + text[for_a] + ' <a class="text-decoration-none text-success" href="javascript:void(0);" onclick="set_code_delete_btn(this);" id="' + text[for_a] + '">(삭제)</a></li>';
        }

        fetch("/api/set/load/hcaptcha_public").then(function(res) {
            return res.json();
        }).then(function(text) {
            let hcaptcha_public = '';
            if(text.req === undefined  && text.length > 0) {
                hcaptcha_public = text[0];
            }

            fetch("/api/set/load/hcaptcha_secret").then(function(res) {
                return res.json();
            }).then(function(text) {
                let hcaptcha_secret = '';
                console.log(text);
                if(text.req === undefined && text.length > 0) {
                    hcaptcha_secret = text[0];
                }

                document.getElementById('main_data').innerHTML = `
                    <br>
                    <div class="container px-5">
                        <h2>코드</h2>
                        <a class="text-decoration-none text-success" id="make_code" href="javascript:void(0);">(코드 생성)</a>
                        <ul id="make_code_list">
                            ` + data + `
                        </ul>
                        <h2>hCaptcha</h2>
                        <div class="form-floating">
                            <input type="text" class="form-control" id="set_hcaptcha_public" value="` + xss_filter(hcaptcha_public) + `" placeholder="공개키">
                            <label for="set_hcaptcha_public">공개키</label>
                        </div>
                        <br>
                        <div class="form-floating">
                            <input type="text" class="form-control" id="set_hcaptcha_secret" value="` + xss_filter(hcaptcha_secret) + `" placeholder="비밀키">
                            <label for="set_hcaptcha_secret">비밀키</label>
                        </div>
                        <br>
                        <button type="submit" class="btn btn-success" id="set_hcaptcha">저장</button>
                        <br>
                        <br>
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

                document.getElementById('set_hcaptcha').addEventListener("click", function() {
                    let save_check = confirm("캡차 설정을 저장하시겠습니까?");
                    if(save_check === true) {
                        let hcaptcha_public = document.getElementById('set_hcaptcha_public').value;
                        let hcaptcha_secret = document.getElementById('set_hcaptcha_secret').value;

                        fetch("/api/set/hcaptcha", {
                            method : 'POST',
                            headers : { 'Content-Type': 'application/json' },
                            body : JSON.stringify({
                                'public' : hcaptcha_public,
                                'secret' : hcaptcha_secret
                            })
                        }).then(function(res) {
                            return res.json();
                        }).then(function(text) {
                            if(text.req === 'ok') {
                                alert("ok");
                            } else {
                                alert(text.req + '\n' + text.reason);
                            }
                        });
                    }
                });
            });
        });
    });
}