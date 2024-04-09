"use strict";

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

        let chat_send_btn = document.getElementById("chat_send")
        if(textarea.value.trim()==''){
            chat_send_btn.disabled = true;
        }else{
            chat_send_btn.disabled = false;
        }         
        chat_div_resize()           
    })
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
                //document.location.pathname = "/chat";
                getChatData()
            }
        }).catch(function (error){
            alert("로그인이 필요합니다.")
        });
    })
}

function chat_div_resize(){
    let chat_div = document.getElementById("chat_data");     
    let objTarHeight= document.getElementById("input_data").offsetHeight;
    chat_div.style.height = 800 - objTarHeight + "px";
}

function logout(){
    const target = document.getElementById("chat_data")
    target.style.color = "gray";
    target.style.textAlign = "center";
    target.innerHTML = `<h1 style="margin-top: 325px;">로그인이 필요합니다.</h1>`; 
}

function submitTextarea(event) {
    let key = event.key || event.keyCode;
    if (event.shiftKey && (key == 'Enter' || key === 13)){
            

    }else if(key == 'Enter' || key === 13){
            
            event.preventDefault();
            document.getElementById("chat_send").click();
    }    
}

// function getName(user_id){
//     return fetch(`api/get/name/${user_id}`)
//     .then((res)=>{
//         return res.json()
//     })
//     .then((json)=>{
//         let name = json.id;
//         return name;
//     })
// }

function getChatData(){
    fetch('api/chat')
    .then(function (res) {
        return res.json();
    })
    .then(function (chatdata) {
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
                    let minutes = String(dateTime.getMinutes()).padStart(2, '0');
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
                if(chatdata.req == "error"){
                    document.getElementById('chat_input').setAttribute('disabled',true);
                    logout();
                }else{
                    const target = document.getElementById('chat_input')
                    target.removeAttribute("disabled"); 
                    target.focus();
                    document
                        .getElementById("chat_input")
                        .addEventListener("keydown", function (event) {
                            submitTextarea(event);
                        })
                }

                resize();
                chat_send();
            }
        check_num = chatdata.data.length
    })
    console.log("getChatData() 실행")
}

function getChatLeng(){
    return fetch('api/chat')
    .then(function (res) {
        return res.json();
    })
    .then(function (chatdata) {
        return chatdata.data.length
    })
}

let chatleng; // polling 체크
let check_num;
if (document.location.pathname === "/chat"){
    getChatData()
    setInterval(async()=>{        
        chatleng = await getChatLeng()
        if (chatleng != check_num){
            getChatData()
        }
    }, 1000);
}
