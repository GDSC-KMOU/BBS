"use strict";

if(document.location.pathname === '/ex/signin') {
    fetch("/api/set/load/hcaptcha_public").then(function(res) {
        return res.json();
    }).then(function(text) {
        let hcaptcha_public = '';
        if(text.req === undefined  && text.length > 0) {
            hcaptcha_public = text[0];
        }

        let hcaptcha_data = '';
        if(hcaptcha_public !== '') {
            hcaptcha_data = `
                <br>
                <div class="h-captcha" data-sitekey="` + xss_filter(hcaptcha_public) + `"></div>
            `
        }

        document.getElementById('main_data').innerHTML = `
            <br>
            <main class="form-signin w-100 m-auto" style="width: 300px !important; text-align: center;">
                <form>
                    <h1 class="h3 mb-3 fw-normal">로그인</h1>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="signup_user_name" placeholder="아이디">
                        <label for="signup_user_name">아이디</label>
                    </div>
                    <br>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="signup_password" placeholder="비밀번호">
                        <label for="signup_password">비밀번호</label>
                    </div>
                    ` + hcaptcha_data + `
                    <br>
                    <button class="w-100 btn btn-lg btn-primary" id="signup_save" type="button">로그인</button>
                </form>
            </main>
            <br>
        `;

        if(hcaptcha_public !== '') {
            let captcha_script = document.createElement("script");
            captcha_script.src = "https://js.hcaptcha.com/1/api.js";
            document.body.appendChild(captcha_script);
        }

        document.getElementById('signup_save').addEventListener("click", function() {
            let user_name = document.getElementById('signup_user_name').value;
            let password = document.getElementById('signup_password').value;
            let hcaptcha = '';
            if(hcaptcha_public !== '') {
                hcaptcha = document.getElementsByName('h-captcha-response')[0].value;
            }

            fetch("/api/signin", {
                method : 'POST',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    'user_name' : user_name,
                    'password' : password,
                    'captcha' : hcaptcha
                })
            }).then(function(res) {
                return res.json();
            }).then(function(text) {
                if(text.req === 'ok') {
                    document.location.pathname = '/ex';
                } else {
                    alert(text.req + '\n' + text.reason);
                }
            });
        });
    });
}