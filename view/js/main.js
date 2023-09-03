"use strict";

if (document.location.pathname === "/") {
    let check_data = 0;
    const do_loading = setInterval(() => {
        if (check_data === 1) {
            document.querySelector(".loading").remove();
            clearInterval(do_loading);
        }
    }, 1000);

    document.getElementById("main_data").innerHTML += `
        <header class="py-5 mb-5 top-h" id="top">
            <div class="container px-5">
                <div class="row gx-5 align-items-center justify-content-center">
                    <div class="col-lg-8 col-xl-7 col-xxl-6">
                        <div class="my-5 text-center text-xl-start">
                            <h1 class="display-5 fw-bolder text-white mb-2">인클루더 동아리</h1>
                            <div class="divider"></div>
                            <p class="lead fw-normal text-white-50 mb-4">인클루더는 2022년에 설립되어서 2023년에 정식 승격된 한국해양대학교 정식 프로그래밍 동아리입니다.</p>
                            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                <a class="btn btn-success btn-lg px-4 me-sm-3" href="#active">자세히 알아보기</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                        <img class="img-fluid my-5 top_logo" src="/view/img/logo.jpg" alt="..." style="height: 500px; width: 500px;">
                    </div>
                </div>
            </div>
        </header>

        <!-- intro -->
        <section id="intro">
            <div class=" d-flex justify-content-center align-items-center pb-2 mb-5 overlay">
                <div class="container-xxl">
                    <div class="row align-items-top">
                        <!-- 왼쪽 부분 -->
                        <div class="col-md-3 welcome position-relative">
                            <h1 class="welcome-title fw-light"><span class="text-success fw-bold">INCLUDER</span></h1>
                            <h3 class="welcome-subtitle fw-light"><span class="text-success fw-bold">를 소개합니다</span></h3>
                            <img src="/view/img/hello.jpg" alt="" class="position-absolute intro__logo"
                                style="height: 250px; width: 250px; left: -30px; top: 100px;">
                        </div>
                        <!-- 오른쪽 부분 -->
                        <div class="col-md-9 d-md-block rounded-5">
                            <div class="intro my-3">
                                <h3 class="intro__title card-title mb-3 fw-bold">동아리 소개글</h3>
                                <div class="d-flex flex-column intro__body">
                                <p class="fs-5">😀안녕하세요 저희는 이번에 정식 동아리로 승격된 한국해양대 프로그래밍 동아리"INCLUDER" 입니다.😀</p>
                                <p class="fs-5">저희 인클루더를 소개 드리자면</p>
                                <div class="d-flex gap-5 mb-3">
                                    <div class="fs-5 fw-bold border rounded-5 p-3 intro__right">
                                    다양한 스터디 운영
                                    </div>
                                    <div class="fs-5 fw-bold border rounded-5 p-3 intro__right">
                                    주1회 스터디 모임
                                    </div>
                                    <div class="fs-5 fw-bold border rounded-5 p-3 intro__right">
                                    월2회 동아리 모임
                                    </div>
                                </div>
                                <p class="fs-5 mb-5">⚡ 체계를 잡아가는 단계이니 만큼 여러분의 의견을 적극 수렴하여 반영 가능합니다 ⚡</p>
                                <p class="fs-5 fw-bold">👍 저희 인클루더 에서 다음과 같은 분들을 찾습니다!</p>
                                <span class="fs-5"><em>🚩 소속 학부,학년 무관하게 코딩,컴퓨터 관련 주제에 관심 있으신 분</em></span>
                                <span class="fs-5"><em>🚩 코딩을 접해보고 싶으신 분</em></span>
                                <span class="fs-5"><em>🚩 그냥 동아리 활동이 하고 싶으신 분</em></span> 
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Active -->
        <section id="active" class="mb-5">
            <div class="container ban-content p-5 rounded-5">
                <div class="active_title text-start">
                <p class="fw-bold mb-5 h2 p-3 ban__list">
                <img src="/view/img/study.jpg" style="width:44px; height 44px;"></img>
                Study List</p>
                </div>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 p-2">
                    <div class="col" >
                        <div class="d-flex flex-column align-items-center ban rounded-5 border border-2" style="height: 320px;">
                            <img src="/view/img/website.jpg" alt="" class="study__card-img mb-2" style="width: 100%; height: 150px;">
                            <h4 class="fw-bold">Web</h4>
                            <div class="ban__divider border-top border-2"></div>
                            <ul class="p-1">
                                <li class="m-1 small">프론트엔드 / 백엔드</li>
                                <li class="m-1 small">기획 및 디자인 설계</li>
                                <li class="m-1 small">Web 프로젝트 진행</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col" >
                        <div class="d-flex flex-column align-items-center ban rounded-5 border border-2" style="height: 320px;">
                            <img src="/view/img/ai.png" alt="" class="study__card-img mb-2" style="width: 100%; height: 150px;">
                            <h4 class="fw-bold">AI</h4>
                            <div class="ban__divider border-top border-2"></div>
                            <ul class="p-1">
                                <li class="m-1 small">딥러닝 / 머신러닝</li>
                                <li class="m-1 small">자연어, 이미지 처리 분석</li>
                                <li class="m-1 small">AI 프로젝트 진행</li>
                            </ul>
                        </div>
                    </div>

                    <div class="col" >
                        <div class="d-flex flex-column align-items-center ban rounded-5 border border-2" style="height: 320px;">
                            <img src="/view/img/Algori.png" alt="" class="study__card-img mb-2" style="width: 100%; height: 150px;">
                            <h4 class="fw-bold">Algorithm</h4>
                            <div class="ban__divider border-top border-2"></div>
                            <ul class="p-1">
                                <li class="m-1 small">백준 / 프로그래머스</li>
                                <li class="m-1 small">알고리즘에 대한 이해</li>
                                <li class="m-1 small">취업 코딩테스트 준비</li>
                            </ul>
                        </div>
                    </div>

                    <div class="col">
                        <div class="d-flex flex-column align-items-center ban rounded-5 border border-2" style="height: 320px;">
                            <img src="/view/img/game.png" alt="" class="study__card-img mb-2" style="width: 100%; height: 150px;">
                            <h4 class="fw-bold">Game</h4>
                            <div class="ban__divider border-top border-2"></div>
                            <ul class="p-1">
                                <li class="m-1 small">Pygame / Unity</li>
                                <li class="m-1 small">게임 장르 기획</li>
                                <li class="m-1 small">게임 개발 프로젝트 진행</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section id="faq">
            <div class="container pt-5 faq">
                <!--Section: FAQ-->
                <h3 class="text-start mb-3 pb-2 text-success fw-bold">FAQ</h3>
                <div class="row">
                    <div class="col-md-6 col-lg-4 mb-4">
                        <h6 class="mb-3 text-success"><i class="far fa-paper-plane text-success pe-2"></i> 가입 방법이 무엇인가요?
                        </h6>
                        <p class="mb-1">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, est?
                        </p>
                    </div>

                    <div class="col-md-6 col-lg-4 mb-4">
                        <h6 class="mb-3 text-success"><i class="fa-solid fa-computer text-success pe-2"></i>컴퓨터에 대한 지식이
                            하나도
                            없습니다.. 괜찮을까요?</h6>
                        <p class="mb-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, tempora..
                        </p>
                    </div>

                    <div class="col-md-6 col-lg-4 mb-4">
                        <h6 class="mb-3 text-success"><i class="fas fa-user text-success pe-2"></i> 스터디는 어떤 형식으로 진행이
                            되나요?
                        </h6>
                        <p class="mb-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, labore?
                        </p>
                    </div>
                </div>
                
            </div>
        </section>
    `;
    check_data = 1;
}
