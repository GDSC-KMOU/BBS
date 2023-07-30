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
                document.getElementById('remove_code_' + code).remove();
            } else {
                alert(text.req + '\n' + text.reason);
            }
        });
    }
}

function set_api_code_delete_btn(element) {
    let code = element.id;

    let add_code = confirm("코드를 삭제하시겠습니까?");
    if(add_code === true) {
        fetch("/api/set/api_code/delete/" + url_encode(code), {
            method : 'POST'
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                document.getElementById('remove_api_code_' + code).remove();
            } else {
                alert(text.req + '\n' + text.reason);
            }
        });
    }
}

function set_admin_delete_btn(element) {
    let code = element.id;

    let add_code = confirm("이 관리자를 삭제하시겠습니까?");
    if(add_code === true) {
        fetch("/api/set/admin/delete/" + url_encode(code), {
            method : 'POST'
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                document.getElementById('remove_admin_' + code).remove();
            } else {
                alert(text.req + '\n' + text.reason);
            }
        });
    }
}

function set_user_delete_btn(element) {
    let code = element.id;

    let add_code = confirm("사용자를 삭제하시겠습니까?");
    if(add_code === true) {
        fetch("/api/set/user/delete/" + url_encode(code), {
            method : 'POST'
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                document.getElementById('remove_user_' + code).remove();
            } else {
                alert(text.req + '\n' + text.reason);
            }
        });
    }
}

if(document.location.pathname === '/set') {
    let get_code_key = function() { return new Promise(function(resolve, reject) {
        fetch("/api/set/load/code_key").then(function(res) {
            return res.json();
        }).then(function(text) {
            let data = "";
            for(let for_a = 0; for_a < text.length; for_a++) {
                data += '<li id="remove_code_' + text[for_a] + '">' + text[for_a] + ' <a class="text-decoration-none text-success" href="javascript:void(0);" onclick="set_code_delete_btn(this);" id="' + text[for_a] + '">(삭제)</a></li>';
            }

            resolve([data]);
        });
    })};

    let get_hcaptcha_public = function(data) { return new Promise(function(resolve, reject) {
        fetch("/api/set/load/hcaptcha_public").then(function(res) {
            return res.json();
        }).then(function(text) {
            let hcaptcha_public = '';
            if(text.req === undefined  && text.length > 0) {
                hcaptcha_public = text[0];
            }

            data.push(hcaptcha_public);
            resolve(data);
        });
    })};

    let get_hcaptcha_secret = function(data) { return new Promise(function(resolve, reject) {
        fetch("/api/set/load/hcaptcha_secret").then(function(res) {
            return res.json();
        }).then(function(text) {
            let hcaptcha_secret = '';
            if(text.req === undefined && text.length > 0) {
                hcaptcha_secret = text[0];
            }

            data.push(hcaptcha_secret);
            resolve(data);
        });
    })};

    let get_admin_list = function(data) { return new Promise(function(resolve, reject) {
        fetch("/api/set/load/admin_list").then(function(res) {
            return res.json();
        }).then(function(text) {
            let result = '';
            for(let for_a = 0; for_a < text.length; for_a++) {
                result += '<li id="remove_admin_' + xss_filter(text[for_a][1]) + '">' + xss_filter(text[for_a][0]) + ' (' + xss_filter(text[for_a][1]) + ') <a class="text-decoration-none text-success" href="javascript:void(0);" onclick="set_admin_delete_btn(this);" id="' + xss_filter(text[for_a][1]) + '">(삭제)</a></li>';
            }
            
            data.push(result);
            resolve(data);
        });
    })};

    let get_user_list = function(data) { return new Promise(function(resolve, reject) {
        fetch("/api/set/load/user_list").then(function(res) {
            return res.json();
        }).then(function(text) {
            let result = '';
            for(let for_a = 0; for_a < text.length; for_a++) {
                result += '<li id="remove_user_' + xss_filter(text[for_a][1]) + '">' + xss_filter(text[for_a][0]) + ' (' + xss_filter(text[for_a][1]) + ') <a class="text-decoration-none text-success" href="javascript:void(0);" onclick="set_user_delete_btn(this);" id="' + xss_filter(text[for_a][1]) + '">(삭제)</a></li>';
            }
            
            data.push(result);
            resolve(data);
        });
    })};

    let get_api_code_key = function(data) { return new Promise(function(resolve, reject) {
        fetch("/api/set/load/api_code").then(function(res) {
            return res.json();
        }).then(function(text) {
            let result = "";
            for(let for_a = 0; for_a < text.length; for_a++) {
                result += '<li id="remove_api_code_' + text[for_a] + '">' + text[for_a] + ' <a class="text-decoration-none text-success" href="javascript:void(0);" onclick="set_api_code_delete_btn(this);" id="' + text[for_a] + '">(삭제)</a></li>';
            }

            data.push(result);
            resolve(data);
        });
    })};

    get_code_key().then(get_hcaptcha_public).then(get_hcaptcha_secret).then(get_admin_list).then(get_user_list).then(get_api_code_key).then(function(data) {
        console.log(data);
        
        document.getElementById('main_data').innerHTML = `
            <br>
            <div class="container px-5">
                <h2>API 코드</h2>
                <a class="text-decoration-none text-success" id="make_api_code" href="javascript:void(0);">(코드 생성)</a>
                <ul id="make_api_code_list">
                    ` + data[5] + `
                </ul>
                <h2>코드</h2>
                <a class="text-decoration-none text-success" id="make_code" href="javascript:void(0);">(코드 생성)</a>
                <ul id="make_code_list">
                    ` + data[0] + `
                </ul>
                <h2>hCaptcha</h2>
                <div class="form-floating">
                    <input type="text" class="form-control" id="set_hcaptcha_public" value="` + xss_filter(data[1]) + `" placeholder="공개키">
                    <label for="set_hcaptcha_public">공개키</label>
                </div>
                <br>
                <div class="form-floating">
                    <input type="text" class="form-control" id="set_hcaptcha_secret" value="` + xss_filter(data[2]) + `" placeholder="비밀키">
                    <label for="set_hcaptcha_secret">비밀키</label>
                </div>
                <br>
                <button type="submit" class="btn btn-success" id="set_hcaptcha">저장</button>
                <br>
                <br>
                <h2>관리자</h2>
                <a class="text-decoration-none text-success" id="admin_give" href="javascript:void(0);">(관리자 주기)</a>
                <ul id="admin_list">
                    ` + data[3] + `
                </ul>
                <h2>사용자</h2>
                <ul id="user_list">
                    ` + data[4] + `
                </ul>
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

        document.getElementById('make_api_code').addEventListener("click", function() {
            let add_code = confirm("코드를 생성하겠습니까?");
            if(add_code === true) {
                fetch("/api/set/api_code/add", {
                    method : 'POST'
                }).then(function(res) {
                    return res.json();
                }).then(function(text) {
                    if(text.req === 'ok') {
                        document.getElementById('make_api_code_list').innerHTML += '<li id="remove_api_code_' + text.code + '">' + text.code + ' <a class="text-decoration-none text-success" href="javascript:void(0);" onclick="set_api_code_delete_btn(this);" id="' + text.code + '">(삭제)</a></li>';
                    } else {
                        alert(text.req + '\n' + text.reason);
                    }
                });
            }
        });

        document.getElementById('admin_give').addEventListener("click", function() {
            let admin_id = prompt("관리자를 주시겠습니까? (아이디를 입력하세요)");
            if(admin_id !== null) {
                fetch("/api/set/admin/add", {
                    method : 'POST',
                    headers : { 'Content-Type': 'application/json' },
                    body : JSON.stringify({
                        user_id : admin_id
                    })
                }).then(function(res) {
                    return res.json();
                }).then(function(text) {
                    if(text.req === 'ok') {
                        document.getElementById('admin_list').innerHTML += '<li id="remove_admin_' + xss_filter(admin_id) + '">' + xss_filter(text.user_real_name) + ' (' + xss_filter(admin_id) + ') <a class="text-decoration-none text-success" href="javascript:void(0);" onclick="set_admin_delete_btn(this);" id="' + xss_filter(admin_id) + '">(삭제)</a></li>';
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
}