"use strict";

const main = document.getElementById("main_data")

let loaded_chat_num = 0;
let polling_num = 15;

async function get_my_id(){
  const my_res = await fetch("api/get/my_id");
  const my_data = await my_res.json();
  return my_data.id;
}

async function get_name(user_id) {
  try {
    const res = await fetch(`api/get/name/${user_id}`);
    const data = await res.json();
    return data.id;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function logout(){
  const main = document.getElementById("main_data");
  main.innerHTML += `
    <div id="logout" style="position: absolute;
      width: 100%;
      height: calc(100vh - 56px);
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      font-size: 30px;">
      로그인이 필요한 서비스입니다.
    </div>
    <div id="chat_data_wrapper" class="p-3 d-flex flex-column" style="width: 80%; height: calc(100vh - 56px - 86px); overflow: auto; position: relative;">        
      <div class="d-flex flex-row py-1" style="margin-top: 24px;">
        <div style="max-width: 80%;">
          <div class="text-break border p-3" style="border-radius: 20px; border-top-left-radius: 0px; width: fit-content; white-space: pre-wrap;">\t\t\t\t\t</div>
        </div>
      </div>
      <div class="d-flex justify-content-end py-1" style="margin-top: 24px;">
        <div style="max-width: 80%;" class="d-flex flex-column align-items-end">
          <div class="text-break d-flex justify-content-end border p-3 bg-dark bg-opacity-10" style="border-radius: 20px; border-top-right-radius: 0px; width: fit-content; white-space: pre-wrap;">&nbsp\t\t\t\t\t\t\t</div>
        </div>
      </div>
      <div class="d-flex flex-row py-1" style="margin-top: 24px;">
        <div style="max-width: 80%;">
          <div class="text-break border p-3" style="border-radius: 20px; border-top-left-radius: 0px; width: fit-content; white-space: pre-wrap;">\t\t\t</div>
        </div>
      </div>
      <div class="d-flex flex-row py-1" style="margin-top: 24px;">
        <div style="max-width: 80%;">
          <div class="text-break border p-3" style="border-radius: 20px; border-top-left-radius: 0px; width: fit-content; white-space: pre-wrap;">\t\t\t\t\t\t\t</div>
        </div>
      </div>
      <div class="d-flex justify-content-end py-1" style="margin-top: 24px;">
        <div style="max-width: 80%;" class="d-flex flex-column align-items-end">
          <div class="text-break d-flex justify-content-end border p-3 bg-dark bg-opacity-10" style="border-radius: 20px; border-top-right-radius: 0px; width: fit-content; white-space: pre-wrap;">&nbsp\t\t\t\t\t</div>
        </div>
      </div>
      <div class="d-flex justify-content-end py-1" style="margin-top: 24px;">
        <div style="max-width: 80%;" class="d-flex flex-column align-items-end">
          <div class="text-break d-flex justify-content-end border p-3 bg-dark bg-opacity-10" style="border-radius: 20px; border-top-right-radius: 0px; width: fit-content; white-space: pre-wrap;">&nbsp\t\t\t\t\t\t\t\t\t\t</div>
        </div>
      </div>
      <div class="d-flex justify-content-end py-1" style="margin-top: 24px;">
        <div style="max-width: 80%;" class="d-flex flex-column align-items-end">
          <div class="text-break d-flex justify-content-end border p-3 bg-dark bg-opacity-10" style="border-radius: 20px; border-top-right-radius: 0px; width: fit-content; white-space: pre-wrap;">&nbsp\t\t</div>
        </div>
      </div>
    </div>
    <div id="chat_input_wrapper" style="width: 80%; height: 86px;" class="input-group p-4 d-flex"><textarea class="form-control" id="chat_input" rows="1" style="resize: none;" maxlength="500" disabled></textarea><button id="chat_send_btn" class="btn btn-outline-secondary" disabled>&nbsp;전송&nbsp;</button></div>
    `;
}

function responsive(){
  let vh = 0;
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  main.innerHTML += `
  <style>
    @media (max-width: 1024px) {
      #main_data{
        height: calc(100vh - 46px) !important;
        height: calc(var(--vh, 1vh) * 100 - 46px) !important;
      }
      #logout{
        height: calc(100vh - 46px) !important;
        height: calc(var(--vh, 1vh) * 100 - 46px) !important;
        font-size: 20px !important;
      }
      #chat_data_wrapper {
        width: 100% !important;
        height: calc(var(--vh, 1vh) * 100 - 46px - 86px) !important;
      }
      #chat_input_wrapper {
        width: 100% !important;
      }
      #footer .container{
        display: none;
      }
      div i{
        display: none !important;
      }
    }
  </style>`
}

async function get_chat_data(){
  const res = await fetch("api/chat");
  const json = await res.json();
  const chat_data = await json.data;
  return chat_data;
}

function format_date(chat_date) {
  const now = new Date();
  const date = new Date(chat_date);

  const isToday = now.toDateString() === date.toDateString();
  const isYesterday = new Date(now - 86400000).toDateString() === date.toDateString();

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };

  if (isToday) {
    return `오늘 ${date.toLocaleTimeString('ko-KR', timeOptions)}`;
  } else if (isYesterday) {
    return `어제 ${date.toLocaleTimeString('ko-KR', timeOptions)}`;
  } else {
    const formattedDate = date.toLocaleDateString('ko-KR', dateOptions).replace(/\. /g, '.');
    return `${formattedDate} ${date.toLocaleTimeString('ko-KR', timeOptions)}`;
  }
}

function reset_scroll(){
  requestAnimationFrame(() => {
    let objDiv = document.getElementById("chat_data_wrapper");
    objDiv.scrollTop = objDiv.scrollHeight;
  });  
}

let insert_done_check = 0;
let canAppend = true;
function handleScroll(event) {
  const chat_data_wrapper = document.getElementById("chat_data_wrapper");
  const scrollHeight = chat_data_wrapper.scrollHeight;
  const clientHeight = chat_data_wrapper.clientHeight;
  const scrollPosition = chat_data_wrapper.scrollTop;
  if (canAppend && scrollPosition <= 500) {
    canAppend = false;
    if (insert_done_check === 0){
      insert_previous_chat(loaded_chat_num)
      .then(() => {
        setTimeout(() => {
          canAppend = true;
        }, 0);
      })
      .catch((error) => {
        console.error('Error appending previous chat:', error);
        canAppend = true;
      });
    }
  }
  const notification = document.getElementById('new_message_notification');
  if (notification && scrollPosition >= 0.95 * (scrollHeight - clientHeight)) {
    notification.remove();
  }
}

function scroll_check() {
  const chat_data_wrapper = document.getElementById("chat_data_wrapper");
  const scrollPosition = chat_data_wrapper.scrollTop;

  if (canAppend && scrollPosition <= 100) {
    canAppend = false;
    if (loaded_chat_num > 0 ){
      insert_previous_chat(loaded_chat_num)
      .then(() => {
        setTimeout(() => {
          canAppend = true;
          if(loaded_chat_num > 1){
            chat_data_wrapper.scrollTop = 900;
          }
        }, 0);
      })
      .catch((error) => {
        console.error('Error appending previous chat:', error);
        canAppend = true;
      });
    }
    if (insert_done_check === 0){
      insert_previous_chat(loaded_chat_num);
    }
  }
}

async function create_chat(chat_data, init_num, last_num){
  const fragment = document.createDocumentFragment();
  const my_id = await get_my_id();
  if(init_num >= 0){
    for(let i = init_num; i < last_num; i++){
      let chat_div;
      let chat_id = chat_data[i].id;
      let chat = chat_data[i].chat.replace(/\n/g, "<br>");
      let date = format_date(chat_data[i].date);
      if(chat_data[i].user_id === my_id){
        chat_div = `<div class="d-flex justify-content-end py-1" id="${chat_id}">
          <div style="max-width: 80%;" class="d-flex flex-column align-items-end">
            <div class="d-flex justify-content-end ps-1 pe-1" style="font-size: 12px; margin-top: 5px;">${date}</div>
            <div class="text-break d-flex justify-content-end border p-3 bg-dark bg-opacity-10" style="border-radius: 20px; border-top-right-radius: 0px; width: fit-content; white-space: pre-wrap;">${chat}</div>
          </div>
        </div>`;
      }else{
        const user_name = await get_name(chat_data[i].user_id);
        chat_div = `<div class="d-flex flex-row py-1" id=${chat_id}>
          <div style="max-width: 80%;">
            <div class="d-flex">
              <div class="fw-semibold">${user_name}</div>
              <div class="ps-1 pe-1" style="font-size: 12px; margin-top: 5px;">${date}</div>
            </div>
            <div class="text-break border p-3" style="border-radius: 20px; border-top-left-radius: 0px; width: fit-content; white-space: pre-wrap;">${chat}</div>
          </div>
        </div>`;
      }
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = chat_div;
      fragment.appendChild(tempContainer.firstChild);
    }
    return fragment;
  }
}

async function create_chat_data(){
  main.setAttribute("class", "d-flex flex-column align-items-center");
  const chat_data = await get_chat_data()
  if(!chat_data){
    logout();
  }else{
    const chat_data_wrapper = document.createElement("div")
    chat_data_wrapper.setAttribute("id", "chat_data_wrapper")
    chat_data_wrapper.setAttribute("class", "p-3 d-flex flex-column");
    chat_data_wrapper.setAttribute("style", "width: 80%; height: calc(100vh - 56px - 86px); overflow: auto; position: relative;");
    const fragment = await create_chat(chat_data, chat_data.length-polling_num < 0 ? 0 : chat_data.length-polling_num, chat_data.length);
    chat_data_wrapper.appendChild(fragment);
    main.appendChild (chat_data_wrapper);
    loaded_chat_num = chat_data.length-polling_num;
    create_chat_input();
    chat_data_wrapper.addEventListener('scroll', handleScroll);
    reset_scroll();
  }
}

async function create_chat_input(){
  const input_wrapper = document.createElement("div");
  input_wrapper.setAttribute("id", "chat_input_wrapper");
  input_wrapper.setAttribute("style", "width: 80%; height: 86px;");
  input_wrapper.setAttribute("class", "input-group p-4 d-flex")
  const chat_input = document.createElement("textarea")
  chat_input.setAttribute("class", "form-control")
  chat_input.setAttribute("id", "chat_input")
  chat_input.setAttribute("rows", "1")
  chat_input.setAttribute("style", "resize: none;")
  chat_input.setAttribute("maxlength", "500");
  const chat_send_btn = document.createElement("button")
  chat_send_btn.setAttribute("id", "chat_send_btn")
  chat_send_btn.setAttribute("class", "btn btn-outline-secondary")
  chat_send_btn.setAttribute("disabled", "")
  chat_send_btn.addEventListener("click", function() {
    chat_send();
  });
  chat_send_btn.innerHTML = "&nbsp전송&nbsp"
  const new_chat = document.createElement("div");
  new_chat.setAttribute("id", "new_chat");
  input_wrapper.appendChild(chat_input)
  input_wrapper.appendChild(chat_send_btn)
  main.appendChild(input_wrapper); 
  chat_input_resize();
  sendBtnCtrl();
  chat_input.focus();
  document
    .getElementById("chat_input")
    .addEventListener("keydown", function (event) {
    submit_textarea(event);
  });
}

function sendBtnCtrl() {
  document.getElementById("chat_input").addEventListener("input", function () {
    let textarea = document.getElementById("chat_input");
    let chat_send_btn = document.getElementById("chat_send_btn");
    if (textarea.value.trim() == "") {
      chat_send_btn.disabled = true;
    } else {
      chat_send_btn.disabled = false;
    }
  });
}

function submit_textarea(event) {
  let textarea = document.getElementById("chat_input");
  let key = event.key || event.keyCode;
  if (event.shiftKey && (key == "Enter" || key === 13)) {
  } else if (key == "Enter" || key === 13) {
    event.preventDefault();
    document.getElementById("chat_send_btn").click();
  }
}

function chat_input_resize(){
  document.getElementById("chat_input_wrapper").addEventListener("input", function () {
    let input_wrapper = document.getElementById("chat_input_wrapper");
    input_wrapper.style.height = "auto";

    let textarea = document.getElementById("chat_input");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.maxHeight = '324px';
    let textarea_height = extractNumberFromString(textarea.style.height);
    if(textarea_height > 324){
      textarea.style.overflow = "auto";
    }else{textarea.style.overflow = "hidden";}
  })
}

function extractNumberFromString(inputString) {
  let extractedNumber = inputString.match(/\d+/);
  if (extractedNumber) {
      return parseInt(extractedNumber[0]);
  } else {
      return null;
  }
}

async function load_previous_chat(id){
  const res = await fetch("api/chat/"+(id-polling_num+1));
  const json = await res.json();
  const chat_data = await json.data;
  return chat_data;
}

async function insert_previous_chat(id){
  const chat_data = await load_previous_chat(id);
  const chat_data_wrapper = document.getElementById("chat_data_wrapper");
  if(loaded_chat_num > 0){
    const fragment = await create_chat(chat_data, 0, chat_data.length-chat_data_wrapper.childElementCount);
    loaded_chat_num = id-polling_num;
    chat_data_wrapper.prepend(fragment);
  }else{
    const insert_done_div_wrapper = document.createElement("div");
    insert_done_div_wrapper.setAttribute("class", "d-flex justify-content-center w-100");
    const insert_done_div = document.createElement("div");
    insert_done_div.innerHTML = '이전 메시지가 없습니다.'
    insert_done_div.setAttribute("style",`
      max-width: 80%;
    `);
    insert_done_div_wrapper.append(insert_done_div)
    chat_data_wrapper.prepend(insert_done_div_wrapper);
    loaded_chat_num = id-polling_num;
    insert_done_check = 1;
  }
}

async function append_new_chat(send_who){
  const chat_data = await get_chat_data();
  const chat_data_wrapper = document.getElementById("chat_data_wrapper");
  let renderd_id = 0;
  if(chat_data_wrapper.children[chat_data_wrapper.childElementCount-1]){renderd_id = parseInt(chat_data_wrapper.children[chat_data_wrapper.childElementCount-1].id)}
  const fetched_id = parseInt(chat_data[chat_data.length-1].id)
  if (fetched_id !== renderd_id){
    const fragment = await create_chat(chat_data, renderd_id, fetched_id)
    chat_data_wrapper.appendChild(fragment);
    let objDiv = document.getElementById("chat_data_wrapper");
    const scrollPosition = objDiv.scrollTop / (objDiv.scrollHeight - objDiv.clientHeight);
    if (scrollPosition >= 0.7 || send_who==='me') {
      reset_scroll();
    }else {
      show_new_message_notification(chat_data[chat_data.length-1]);
    }
  }
  scroll_check();
}

function chat_send(){
  const chat_input = document.getElementById("chat_input");
  const chat_value = chat_input.value;
  const chat_send_btn = document.getElementById("chat_send_btn");
  fetch("api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat: chat_value,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (text) {
      if (text.req === "ok") {
        chat_input.value = '';
        chat_input.style.height = '37px';
        chat_send_btn.disabled = true;
        append_new_chat('me');
      }
    })
    .catch(function (error) {
      console.log(error)
    });
}

async function show_new_message_notification(new_chat) {
  const notification = document.getElementById('new_message_notification');
  const user_name = await get_name(new_chat.user_id);
  const chat_data_wrapper = document.getElementById("chat_data_wrapper");
  if (!notification && (chat_data_wrapper.scrollHeight > chat_data_wrapper.clientHeight + 100)) {
    const chat_input_wrapper = document.getElementById("chat_input_wrapper");
    const main = document.getElementById("main_data");
    const notificationDiv = document.createElement('div');
    notificationDiv.setAttribute('id', 'new_message_notification');
    notificationDiv.setAttribute('style', `
      max-width: 80%; 
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer; 
      position: absolute; 
      bottom: ${chat_input_wrapper.offsetHeight + 20}px; 
      padding: 10px; 
      color: white;
      border: 1px solid #f5c6cb; 
      border-radius: 5px;
      z-index: 1000;`);
    notificationDiv.setAttribute('class', 'bg-dark bg-opacity-50');
    notificationDiv.addEventListener("click", function() {
      reset_scroll();
    });
    notificationDiv.innerHTML = `${user_name} : ${new_chat.chat}`;
    main.appendChild(notificationDiv);
  }else{
    notification.innerHTML = `${user_name} : ${new_chat.chat}`;
  }
}

if (document.location.pathname === "/chat") {
  main.style.height = "calc(100vh - 56px)";
  create_chat_data();
  responsive();
  setInterval(async () => {
    append_new_chat();
  }, 1000);
}