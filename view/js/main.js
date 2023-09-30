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
        <header class="mb-5 top-h" id="top">
        <div class="dong-img">
        <div class="wrapper">
            <div class="container px-5 align-items-center
            wrapper-inner">
                <div class="inner-item">
                            <h1 class="display-5 fw-bolder text-white mb-2">인클루더 & <span class="GDSC">GDSC(KMOU)</span></h1>
                            <p class="lead fw-normal text-white-50 mb-4">2023년 9월부터에 한국해양대학교 정식 동아리 인클루더와 <br> 
                            Google Developer Student Club[Korea Maritime & Ocean University]<br>
                            가 통합하여 운영되고 있습니다</p>
                            
                            <a class="btn btn-lg px-4 me-sm-3 btn-main text-white" href="#active">스터디 알아보기</a>
                            
                </div>
            </div>
            </div>
            </div>
        </header>

        <!-- intro -->
        <section class="mb-5" id="intro">
            <div class=" d-flex justify-content-center align-items-center pb-2 mb-5 overlay">
                <div class="container container-xl">
                    <div class="row align-items-top">
                        <!-- 왼쪽 부분 -->
                        <div class="col-md-3 welcome d-flex flex-column mb-4">
                            <h1 class="welcome-title fw-bold">INCLUDER</h1>
                            <h3 class="welcome-title fw-bold">&</h3>
                            <h1 class= "welcome-title fw-bold">
                            <p class="m-0"><span class="GDSC2">GDSC</span></h1>
                            <h3 class="welcome-title fw-bold">를 소개합니다</h3>
                        </div>
                        <!-- 오른쪽 부분 -->
                        <div class="col-md-9 d-md-block rounded-5">
                            <div class="intro me-3">
                                <h3>안녕하세요!</h3>
                                <div class="d-flex flex-column intro__body">
                                <p class="fs-5">저희 통합 동아리를 소개 드리자면 2022년에 설립되어서 2023년에 정식 승격된 한국해양대 정식 프로그래밍 동아리 인클루더와 Google Developers가 후원하는 한국해양대학교 학생을 위한 대학생 기반 커뮤니티 그룹인 Google Developer Student Clubs[Korea Maritime & Ocean University]가 통합 운영중인 동아리입니다.</p>
                                <p class="fs-5">
                                저희 통합 동아리는 일방적으로 가르침을 받는 것이 아니라 스스로 성장하고 지식을 함께 공유하는 것과 다양한 기술을 접해 폭 넓은 시야을 얻는 것, 마지막으로 구성원간에 긍정적인 자극을 주고 받는 것에 초점에 맞춰 운영되고 있습니다.
                                </p>
                                <p class="fs-5">
                                관심 있는 분야가 비슷한 분들끼리 모여 스터디와 프로젝트를 진행하고 있고 비정기적으로 본인이 자신있는 분야나 관심있는 기술에 대해 발표하는 기술 세션 발표도 있습니다.
                                또한 정규 스터디가 아닌 누구나 개설 가능한 소모임 스터디도 만드실 수 있습니다. <span class="somo ps-1">ex)네트워크 스터디, 미라클 모닝 모임, 맛집 모임, 게임 모임</span>
                                </p>
                                <p class="fs-5">
                                저희 통합 동아리를 간단하게 3가지로 요약하면 아래와 같습니다.
                                </p>
                                <div class="d-flex gap-5 mb-4">
                                    <div class="fs-5 fw-bold border rounded-5 p-3 intro__right">
                                    다양한 스터디 운영
                                    </div>
                                    <div class="fs-5 fw-bold border rounded-5 p-3 intro__right">
                                    주1회 스터디 모임
                                    </div>
                                    <div class="fs-5 fw-bold border rounded-5 p-3 intro__right">
                                    소모임 스터디 운영
                                    </div>
                                </div>
                                <p class="fs-5 fw-bold">저희 통합 동아리에서는 다음과 같은 분들을 찾습니다!</p>
                                <span class="fs-5"><em>🚩 소속 학부,학년 무관하게 코딩,컴퓨터 관련 주제에 관심 있으신 분</em></span>
                                <span class="fs-5"><em>🚩 코딩을 접해보고 싶으신 분</em></span>
                                <span class="fs-5"><em>🚩 프로그래밍에 대한 관심과 열정이 있으신 분</em></span> 
                                <span class="fs-5"><em>🚩 함께 여러 가지 프로젝트를 경험해 보고 싶으신 분</em></span> 
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Active -->
        <section class="mb-5" id="active">
            <div class="container container-xl ban-container">
                <div class="active_title text-start">
                <p class="fw-bold mb-2 h1 pt-3 pb-0 ban__list">
                진행중인</p>
                <p class="fw-bold mb-2 h1 pt-0 pb-3 ban__list">
                스터디 목록</p>
                </div>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-3 p-2">
                    <div class="col" >
                        <div class="d-flex flex-column ban rounded-3 bg-light shadow" style="">
                            <img src="/view/img/newbi.png" alt="" class="study__card-img mb-1" style="width: 100%; height: 200px;">
                            <h4 class="fw-bold mb-1 ps-3">PB</h4>
                            <p class="ps-4 mb-1">[프로그래밍기초반]</p>
                            <p class="small ps-4 mb-2">코딩 기초 문법 | 자료구조 | CS지식</p>
                        </div>
                    </div>
                    <div class="col" >
                        <div class="d-flex flex-column ban rounded-3 shadow bg-light" style="">
                            <img src="/view/img/website.jpg" alt="" class="study__card-img mb-1" style="width: 100%; height: 200px;">
                            <h4 class="fw-bold mb-1 ps-3">FE</h4>
                            <p class="ps-4 mb-1">[프론트엔드반]</p>
                            <p class="small ps-4 mb-2">UI 기획 및 설계 | 웹프로젝트</p>
                        </div>
                    </div>
                    <div class="col" >
                        <div class="d-flex flex-column ban rounded-3 shadow bg-light" style="">
                            <img src="/view/img/backend.png" alt="" class="study__card-img mb-1" style="width: 100%; height: 200px;">
                            <h4 class="fw-bold mb-1 ps-3">BE</h4>
                            <p class="ps-4 mb-1">[백엔드반]</p>
                            <p class="small ps-4 mb-2">API 설계 및 구현 | 웹프로젝트</p>
                        </div>
                    </div>
                    <div class="col" >
                        <div class="d-flex flex-column ban rounded-3 shadow bg-light" style="">
                            <img src="/view/img/ai.png" alt="" class="study__card-img mb-1" style="width: 100%; height: 200px;">
                            <h4 class="fw-bold mb-1 ps-3">ML</h4>
                            <p class="ps-4 mb-1">[머신러닝반]</p>
                            <p class="small ps-4 mb-2">자연어, 이미지 처리 | AI 프로젝트</p>
                        </div>
                    </div>

                    <div class="col" >
                        <div class="d-flex flex-column ban rounded-3 shadow bg-light" style="">
                            <img src="/view/img/Algori.png" alt="" class="study__card-img mb-1" style="width: 100%; height: 200px;">
                            <h4 class="fw-bold mb-1 ps-3">Algorithm</h4>
                            <p class="ps-4 mb-1">[알고리즘반]</p>
                            <p class="small ps-4 mb-2">백준 | 프로그래머스 | 취업 코테 준비</p>
                        </div>
                    </div>

                    <div class="col" >
                        <div class="d-flex flex-column ban rounded-3 shadow bg-light" style="">
                            <img src="/view/img/game.png" alt="" class="study__card-img mb-1" style="width: 100%; height: 200px;">
                            <h4 class="fw-bold mb-1 ps-3">Game</h4>
                            <p class="ps-4 mb-1">[게임반]</p>
                            <p class="small ps-4 mb-2">Pygame | Unity | 게임 프로젝트</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section id="faq">
            <div class="container pt-5 faq">
                <!--Section: FAQ-->
                <h3 class="text-start mb-3 pb-2 fw-bold faq-title">FAQ</h3>
                <div class="row">
                    <div class="col-md-6 col-lg-4 mb-4">
                        <h6 class="mb-3 faq-text"><i class="far fa-paper-plane pe-2 faq-text"></i> 가입 방법이 무엇인가요?
                        </h6>
                        <p class="mb-1 text-muted faq-content">
                            매 학기 초마다 에브리 타임을 통해 공지를 전달할 예정입니다.<br>
                            그때 지원해주 시면 간단한 인터뷰를 거친 후 가입하실 수 있습니다.
                        </p>
                    </div>

                    <div class="col-md-6 col-lg-4 mb-4">
                        <h6 class="mb-3 faq-text"><i class="fa-solid fa-computer  pe-2 faq-text"></i>컴퓨터에 대한 지식이
                            하나도
                            없습니다.. 괜찮을까요?</h6>
                        <p class="mb-1 text-muted faq-content">
                            성장을 초첨으로 맞추었기 때문에 지식이 전무해도 괜찮습니다.<br>
                            하지만 프로그래밍에 대한 열정과 적극적 활동은 필수입니다.
                        </p>
                    </div>

                    <div class="col-md-6 col-lg-4 mb-4">
                        <h6 class="mb-3 faq-text"><i class="fas fa-user faq-text pe-2"></i>  스터디는 어떤 형식으로 진행이
                            되나요?
                        </h6>
                        <p class="mb-1 text-muted faq-content">
                            모든 멤버는 하나 이상의 스터디에 속해야 합니다.<br>
                            매주 1회 이상 스터디 진행합니다.(스터디별 상이)
                        </p>
                    </div>
                </div>
                
            </div>
        </section>
    `;
    check_data = 1;
}
