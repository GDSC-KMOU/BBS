"use strict";

if (document.location.pathname === "/chat"){
    fetch('api/chat')
        .then(function (res) {
            return res.json();
        })
        .then(function (chatdata) {
            function resize() {
                document
                .getElementById("chat_input")
                .addEventListener("input", function () {
                    let textarea = document.getElementById("chat_input");
            
                    textarea.style.height = "0px";
                    let scrollHeight = textarea.scrollHeight;
                    let style = window.getComputedStyle(textarea);
                    let borderTop = parseInt(style.borderTop);
                    let borderBottom = parseInt(style.borderBottom);
            
                    let newHeight = Math.min(scrollHeight + borderTop + borderBottom, 134);
            
                    textarea.style.height = newHeight + "px";
            
                    let objDiv = document.getElementById("chat_data");
                    objDiv.scrollTop = objDiv.scrollHeight;
            
                    let chat_send_btn = document.getElementById("chat_send")
                    if(textarea.value==''){
                        chat_send_btn.disabled = true;
                    }else{
                        chat_send_btn.disabled = false;
                    }         
                    chat_div_resize()           
                })
            }
            function chat_div_resize(){
                let chat_div = document.getElementById("chat_data");     
                let objTarHeight= document.getElementById("input_data").offsetHeight;
                chat_div.style.height = 800 - objTarHeight + "px";
            }

            function chat_send() {
                document
                .getElementById("chat_send")
                .addEventListener("click", function () {
                    let content = document.getElementById("chat_input").value;
                    fetch("api/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chat: content
                        }),
                    }).then(function (res) {
                        return res.json();
                    }).then(function (text) {
                        if (text.req === "ok") {
                            document.location.pathname = "/chat";
                        }
                    }).catch(function (error){
                        alert("로그인이 필요합니다.")
                    });
                })
            }

            document.getElementById('main_data').innerHTML= `
                <div id="root" style="height:800px">
                    <div class="container p-3 border-end border-start overflow-auto d-flex flex-column" style="height: 698px" id="chat_data">
                    </div>
                </div>
                `;
            
            fetch('api/get/my_id')
                .then(function (res) {
                    return res.json();
                })
                .then(function (myiddata) {                  
                    let my_id = myiddata.id;

                    let ex_dateString = ``;
                    let chat_cnt = 0
                    if(chatdata.req !== "error"){
                        chat_cnt = chatdata.data.length
                    }
                    //for(let i = Math.max(0, chat_cnt - 20); i<chat_cnt; i++){
                    for(let i = 0; i<chat_cnt; i++){
                        let ampm = '오전'
                        let chat = chatdata.data[i].chat
                        let user_id = chatdata.data[i].user_id
                        let date = chatdata.data[i].date
                        const dateTime = new Date(date);
                        let year = dateTime.getFullYear();
                        let month = dateTime.getMonth() + 1;
                        let day = dateTime.getDate();
                        let hours = dateTime.getHours();
                        let minutes = dateTime.getMinutes();
                        if(hours>=12){
                            ampm = '오후';
                            if(hours!=12){
                                hours = hours-12;}}                                     
                            let dateString = `${year}${month}${day}`;
                            if(dateString!=ex_dateString){
                                document.getElementById('chat_data').innerHTML+= `
                                <div class="d-flex justify-content-center mt-2">
                                    <div class="rounded-pill bg-secondary bg-opacity-10 d-flex justify-content-center" style="width: 250px;" id="date${i}">
                                        ${year}년 ${month}월 ${day}일
                                    </div>
                                </div>
                                `;
                                ex_dateString = dateString;
                            }                        
                                                   
                        if(user_id==my_id){//내 채팅
                            document.getElementById('chat_data').innerHTML+= `
                            <div class="d-flex justify-content-end py-1">
                                <div style="max-width: 80%">
                                    <div class="ps-1 pb-1" style="font-size: 12px; margin-top: 5px;">`+ampm+` ${hours}:${minutes}</div>
                                    <div class="border p-3 text-break ms-auto bg-dark bg-opacity-10" style="border-radius: 20px; border-top-right-radius: 0px; width: fit-content;">${chat}</div>
                                </div>
                            </div>
                            `;
                        }else{//다른사람 채팅       
                            document.getElementById('chat_data').innerHTML+= `
                            <div class="d-flex flex-row py-1">
                                <div style="max-width: 80%">
                                    <div class="d-flex pb-1 justify-content-between">
                                        <div class="border border-white fw-semibold">${user_id}</div>
                                        <div class="ps-1 pe-1" style="font-size: 12px; margin-top: 5px;">`+ampm+` ${hours}:${minutes}</div>
                                    </div>
                                    <div class="border p-3 text-break" style="border-radius: 20px; border-top-left-radius: 0px; width: fit-content;">${chat}</div>
                                </div>
                            </div>
                            `;
                        }
                    }
                    create_chat_input()
                });
                function create_chat_input(){
                    document.getElementById('root').innerHTML+= `
                        <div class="container p-3 border-end border-start overflow-auto d-flex flex-column" id="input_data">
                        </div>
                    `;
                    document.getElementById('input_data').innerHTML+= `
                    <div class="w-100 d-flex justify-content-center" id="chat_input_div">
                        <div class=" input-group py-3" style="width: 95%;">
                            <textarea style="height: 0px; resize: none;" class="form-control" id="chat_input"></textarea>
                            <button class="btn btn-outline-secondary" type="button" id="chat_send" disabled>&nbsp;전송&nbsp;</button>
                        </div>
                    </div>
                    `;
                    let objDiv = document.getElementById("chat_data");
                    objDiv.scrollTop = objDiv.scrollHeight;

                    resize();
                    chat_send();
                }
            
        })
}