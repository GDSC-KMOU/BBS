if(document.location.pathname === '/signin') {
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
                <br>
                <button class="w-100 btn btn-lg btn-primary" id="signup_save" type="button">로그인</button>
            </form>
        </main>
        <br>
    `;

    document.getElementById('signup_save').addEventListener("click", function() {
        let user_name = document.getElementById('signup_user_name').value;
        let password = document.getElementById('signup_password').value;

        fetch("/api/signin", {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                'user_name' : user_name,
                'password' : password
            })
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                document.location.pathname = '/';
            } else {
                alert(text.req + '\n' + text.reason);
            }
        });
    });
}