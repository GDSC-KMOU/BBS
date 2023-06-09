"use strict";

if(document.location.pathname === '/') {
    let check_data = 0;
    const do_loading = setInterval(() => {
        if(check_data === 1) {
            document.querySelector('.loading').remove();
            clearInterval(do_loading);
        }
    }, 1000);

    document.getElementById('main_data').innerHTML += `
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
                                style="height: 250px; width: 250px; left: -30; top: 100;">
                        </div>
                        <!-- 오른쪽 부분 -->
                        <div class="col-md-9 d-md-block intro">
                            <div class="intro my-3">
                                <h4 class="intro-title card-title mb-3 fw-bold">동아리 소개글</h4>
                                <p class="card-text fs-5">😀안녕하세요 저희는 이번에 정식 동아리로 승격된 한국해양대 프로그래밍 동아리
                                    "INCLUDER"
                                    입니다.😀 <br><br>

                                    저희 인클루더를 소개 드리자면 <br><br>

                                    ⚡ C언어, Python, Web, ML 등 동아리 스터디 그룹 운영 <br>
                                    ⚡ 스터디 자체 모임은 주 1회 , 동아리 정기 모임은 2주에 한번씩 운영하고 있습니다 <br>
                                    ⚡ 예섬관에 동아리방이 있습니다! <br>
                                    ⚡ 체계를 잡아가는 단계이니 만큼 여러분의 의견을 적극 수렴하여 반영 가능합니다! <br><br>

                                    저희 인클루더 에서 다음과 같은 분들을 찾습니다 👍<br><br>

                                    🚩 소속 학부,학년 무관하게 코딩,컴퓨터 관련 주제에 관심 있으신 분 (몰라도 됨) <br>
                                    🚩 코딩을 접해보고 싶으신 분<br>
                                    🚩 그냥 동아리 활동이 하고 싶으신 분<br> </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Active -->
        <section id="active">
            <div class="container p-5 mb-4 rounded-5 bg-light">
                <div class="active_title text-center">
                    <img src="/view/img/study.jpg" alt="" style="height: 250px;" class="active__logo">
                    <h2 class="fw-bold mb-5 mt-3">우리 동아리는 이런 활동을 해요!</h2>
                </div>
                <div class="d-flex flex-column">
                    <div class="row">
                        <p class="bg-white p-2 rounded-4 text-center align-items-center shadow-lg lh-lg"><b
                                class="h3 fw-bold">C언어</b><br>
                            1. c언어반 스터디는 c언어를 공부하고자 하는 분들을 위한 스터디 모임입니다. <br>
                            2. c언어는 컴퓨터 공학 분야에서 가장 기본이 되는 언어 중 하나로, 프로그래밍을 처음
                            시작하는 분들에게 매우 적합한 언어입니다. <br>
                            스터디 모임에서는 c언어의 기본 문법부터 시작하여, 변수, 함수, 포인터, 배열, 구조체 등의 개념을 다룹니다. <br>
                            3. 스터디 모임은 매주 한 번씩 정기적으로 진행되며, 참여자들끼리 서로 질문하고 답변하는 시간도 가지고 있습니다. <br>
                            4. c언어반 스터디는 c언어를 처음 배우는 분들뿐만 아니라, 이미 약간의 경험이 있으신 분들도 참여하실 수 있습니다. 함께 c언어를 공부하고 싶으신 분들은
                            언제든지 참여해 주시기 바랍니다. <br>
                        </p>
                    </div>
                    <div class="row">
                        <p class="bg-white p-2 rounded-4 text-center align-items-center shadow-lg lh-lg"><b
                                class="h3 fw-bold">파이썬</b> <br>
                            1. 파이썬반 스터디는 파이썬 언어를 공부하고자 하는 분들을 위한 스터디 모임입니다. <br>
                            2. 파이썬은 현재 가장 인기있는 프로그래밍 언어 중 하나로, <br> 데이터 분석, 인공지능, 웹프로그래밍 등 다양한 분야에서 활용되고 있습니다. <br>
                            3. 모임에서는 파이썬의 기본 문법부터 시작하여, 변수, 함수, 클래스, 모듈 등의 개념을 다룹니다.<br>
                            4. 스터디 모임은 매주 한 번씩 정기적으로 진행되며, 참여자들끼리 서로 질문하고 답변하는 시간도 가지고 있습니다. 또한, 모임 후에는 스터디 내용을 정리하여
                            공유하는 시간도 가지고 있습니다. <br>
                            5. 파이썬반 스터디는 파이썬을 처음 배우는 분들뿐만 아니라, 이미 약간의 경험이 있으신 분들도 참여하실 수 있습니다. 함께 파이썬을 공부하고 싶으신 분들은
                            언제든지 참여해 주시기 바랍니다.</p>
                    </div>

                    <div class="row">
                        <p class="bg-white p-2 rounded-4 text-center align-items-center shadow-lg lh-lg"><b
                                class="h3 fw-bold">프로젝트</b> <br>
                            1. 웹 프로젝트 스터디는 웹 개발에 관심이 있는 분들이 모여 함께 프로젝트를 기획하고 개발하는 스터디 모임입니다. <br>
                            2. HTML, CSS, JavaScript 등의 웹 프론트엔드 기술부터, <br>
                            Django, Node.js 등의 백엔드 기술까지 다양한 기술을 활용하여 웹 프로젝트를 구현해볼 수 있습니다. <br>
                            3. 스터디 모임에서는 프로젝트 기획부터 시작하여, 디자인, 개발, 배포까지의 전과정을 함께 공부합니다. <br>
                            프로젝트의 기획과 디자인은 스터디 모임 내에서 직접 수행하며, 개발과 배포는 모임 내에서 개인 또는 팀 단위로 수행합니다. <br>
                            4. 스터디 모임은 매주 한 번씩 정기적으로 진행되며, 각자 맡은 역할에 대해 서로 의견을 나누고 협업하는 시간도 가지고 있습니다. <br>
                            5. 웹 프로젝트 스터디는 웹 개발에 대한 지식이 없더라도 참여하실 수 있습니다. <br>
                            함께 웹 개발을 공부하고 싶으신 분들은 언제든지 참여해 주시기 바랍니다.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <!-- ban -->
        <section id="ban">
            <div class="container" id="featured-3">
                <div class="container px-4 mb-4" id="featured-3">
                    <h2 class="pb-2 mb-2 border-bottom fw-bold">진행 중인 분반</h2>
                    <div class="row">
                        <div class="col-lg-4 position-relative p-2 ban rounded-5 border-start border-2"
                            style="height: 400px;">
                            <img src="/view/img/lang_file.jpg" alt="" class="img-fluid rounded-5 my-2 shadow mb-4"
                                style="height: 180px; width: 180px;">
                            <h2 class="fw-normal">프로젝트반</h2>
                            <p>다양한 웹과 앱 프로젝트를 하면서 현업에 대한 <br>지식을 늘리는 반입니다.</p>
                            <p><a class="position-absolute bottom-2 btn btn-success" href="/project">더 알아보기 &raquo;</a>
                            </p>
                        </div>

                        <div class="col-lg-4 position-relative p-2 ban rounded-5 border-start border-2"
                            style="height: 400px;">
                            <img src="/view/img/c.jpg" alt="" class="img-fluid rounded-5 my-2 shadow mb-4"
                                style="height: 180px; width: 180px;">
                            <h2 class="fw-normal">C언어반</h2>
                            <p>컴퓨터 공학 분야에서 가장 기본이 되는 언어인 <br>C언어를 배우는 반입니다.</p>
                            <p><a class="position-absolute bottom-2 btn btn-success" href="/study">더 알아보기 &raquo;</a>
                            </p>
                        </div>


                        <div class="col-lg-4 position-relative p-2 ban rounded-5 border-start border-2"
                            style="height: 400px;">
                            <img src="/view/img/python.jpg" alt="" class="img-fluid rounded-5 my-2 shadow mb-4"
                                style="height: 180px; width: 180px;">
                            <h2 class="fw-normal">파이썬반</h2>
                            <p>현재 가장 인기있는 프로그래밍 언어 중 하나인 <br> 파이썬 기초를 배우는 반입니다.</p>
                            <p><a class="position-absolute bottom-2 btn btn-success" href="/study">더 알아보기 &raquo;</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section id="faq">
            <div class="container py-5 faq">
                <!--Section: FAQ-->
                <h3 class="text-center mb-4 pb-2 text-success fw-bold">FAQ</h3>
                <div class="row">
                    <div class="col-md-6 col-lg-4 mb-4">
                        <h6 class="mb-3 text-success"><i class="far fa-paper-plane text-success pe-2"></i> 가입 방법이 무엇인가요?
                        </h6>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, est?
                        </p>
                    </div>

                    <div class="col-md-6 col-lg-4 mb-4">
                        <h6 class="mb-3 text-success"><i class="fa-solid fa-computer text-success pe-2"></i>컴퓨터에 대한 지식이
                            하나도
                            없습니다.. 괜찮을까요?</h6>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, tempora..
                        </p>
                    </div>

                    <div class="col-md-6 col-lg-4 mb-4">
                        <h6 class="mb-3 text-success"><i class="fas fa-user text-success pe-2"></i> 스터디는 어떤 형식으로 진행이
                            되나요?
                        </h6>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, labore?
                        </p>
                    </div>
                </div>
                
            </div>
        </section>
    `;
    check_data = 1;
}