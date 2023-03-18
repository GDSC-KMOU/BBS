if(document.location.pathname == '/project') {
    let data = '';
    for(let for_a = 0; for_a < 9; for_a++) {
        data += `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="/view/img/website.jpg">

                    <div class="card-body">
                        <p class="card-text">엄청난 웹사이트 만들어 봅시다.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">보기</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">편집</button>
                            </div>
                            <small class="text-muted">-3000분전</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById('main_data').innerHTML = `
        <main>
            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        ` + data + `
                    </div>
                </div>
            </div>
        </main>
    `;
}