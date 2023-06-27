if(document.location.pathname === '/file_upload') {
    document.getElementById('main_data').innerHTML = `
        <section id="board">
            <div class="container-xxl p-5 board-content">
                <div class="row gap-5">
                    <div class="col-md-9 shadow-sm rounded-5" style="margin: auto;">
                        <div class="container px-1">
                            <br>
                            <div class="mb-3">
                                <input id="project_add_file" class="form-control" type="file">
                            </div>
                            <button type="submit" class="btn btn-success" id="project_add_save">저장</button>
                            <br>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    document.getElementById('project_add_save').addEventListener("click", function() {
        let project_add_file = document.getElementById('project_add_file').files[0];
        console.log(project_add_file);

        let form_data = new FormData();
        form_data.append('image', project_add_file);

        fetch("/api/file_upload", {
            method : 'POST',
            body : form_data
        }).then(function(res) {
            return res.json();
        }).then(function(text) {
            if(text.req === 'ok') {
                alert(text.req + '\n' + text.id);
            } else {
                alert(text.req + '\n' + text.reason);
            }
        });
    });
}