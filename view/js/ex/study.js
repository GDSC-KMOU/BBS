"use strict";

if(document.location.pathname === '/ex/study') {
    document.getElementById('main_data').innerHTML = `
        <div class="container px-5">
            <div class="my-3 p-3 bg-body rounded-5 shadow-sm">
                <h6 class="border-bottom pb-2 mb-0 text-success">최근 스터디 및 세미나 일정</h6>
                <div class="d-flex text-muted pt-3">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="dodgerblue"></rect>
                    </svg>

                    <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                        <div class="d-flex justify-content-between">
                            <strong class="text-gray-dark">프로젝트팀</strong>
                            2023-03-25 20:00:00
                        </div>
                        <span class="d-block">토요일 정기 회의</span>
                    </div>
                </div>

                <div class="d-flex text-muted pt-3">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="mediumseagreen"></rect>
                    </svg>

                    <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                        <div class="d-flex justify-content-between">
                            <strong class="text-gray-dark">인클루더</strong>
                            2023-03-23 20:00:00
                        </div>
                        <span class="d-block">동아리 친목회</span>
                    </div>
                </div>

                <div class="d-flex text-muted pt-3">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="mediumseagreen"></rect>
                    </svg>

                    <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                        <div class="d-flex justify-content-between">
                            <strong class="text-gray-dark">프로젝트팀</strong>
                            2023-03-21 20:00:00
                        </div>
                        <span class="d-block">프로젝트팀 회식</span>
                    </div>
                </div>

                <div class="d-flex text-muted pt-3">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="mediumseagreen"></rect>
                    </svg>

                    <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                        <div class="d-flex justify-content-between">
                            <strong class="text-gray-dark">프로젝트팀</strong>
                            2023-03-18 20:00:00
                        </div>
                        <span class="d-block">토요일 정기 회의</span>
                    </div>
                </div>
                
                <small class="d-block text-end mt-3">
                    <a href="/ex/study_add" class="text-decoration-none text-success">(추가)</a>
                </small>
            </div>
    `;
}