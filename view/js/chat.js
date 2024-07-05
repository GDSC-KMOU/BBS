"use strict";

function extractNumberFromString(inputString) {
  let extractedNumber = inputString.match(/\d+/);
  if (extractedNumber) {
      return parseInt(extractedNumber[0]);
  } else {
      return null;
  }
}

function resize() {
  document.getElementById("chat_input").addEventListener("input", function () {
    let input = document.getElementById("chat_input"); 
    let inputWrapper = document.getElementById("input_data")
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
    inputWrapper.style.height = "auto";
    input.style.maxHeight = '324px'
    let inputHeight = extractNumberFromString(input.style.height);
    if(inputHeight > 324){
      input.style.overflow = "auto";
    }else{input.style.overflow = "hidden";}
  })
}

function sendBtnCtrl() {
  document.getElementById("chat_input").addEventListener("input", function () {
    let textarea = document.getElementById("chat_input");
    let chat_send_btn = document.getElementById("chat_send");
    if (textarea.value.trim() == "") {
      chat_send_btn.disabled = true;
    } else {
      chat_send_btn.disabled = false;
    }
  });
}

function chat_send() {
  document.getElementById("chat_send").addEventListener("click", function () {
    let content = document.getElementById("chat_input").value;
    fetch("api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat: content,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (text) {
        if (text.req === "ok") {
          //document.location.pathname = "/chat";
          getChatData();
        }
      })
      .catch(function (error) {
        alert("로그인이 필요합니다.");
      });
  });
}

function logout() {
  const target = document.getElementById("chat_data");
  target.style.color = "gray";
  target.style.textAlign = "center";
  target.innerHTML = `<div class="row" style="height: calc(100vh - 56px)" ><h1 class="align-self-center">로그인이 필요합니다.</h1></div>`;
}

function submitTextarea(event) {
  let textarea = document.getElementById("chat_input");
  let value = textarea.value;
  let key = event.key || event.keyCode;
  if (event.shiftKey && (key == "Enter" || key === 13)) {
  } else if (key == "Enter" || key === 13) {
    event.preventDefault();
    document.getElementById("chat_send").click();
  }
}



let lastChatId = 0;
let check_num;

if (document.location.pathname === "/chat") {
  getChatData();
  setInterval(async () => {
    let renderedLastChat = document.getElementById("chat_data").lastElementChild.firstElementChild.lastElementChild
    renderedLastChat = extractNumberFromString(renderedLastChat.id)
    lastChatId = parseInt(lastChatId)
    if ( lastChatId !== renderedLastChat ){
      getChatData();
      lastChatId = renderedLastChat
    }
  }, 1000);
}

function responsive() {
  const chatdata = document.getElementById("chat_data");
  const chatinput = document.getElementById("input_data");
  const root = document.getElementById("root");

  if (chatdata && chatinput) {
    if (window.innerWidth <= 1024) {
      root.style.height = "calc(100vh - 46px)";
      chatdata.style.width = "100%";
      chatdata.style.height = "calc(100vh - 46px - 86px)";
      chatinput.style.width = "100%";
    } else {
      root.style.height = "calc(100vh - 56px)"
      chatdata.style.width = "80%";
      chatdata.style.height = "calc(100vh - 56px - 86px)";
      chatinput.style.height = "86px";
      chatinput.style.width = "80%";
    }
  }
}
window.addEventListener("resize", responsive);

function updateFooterDisplay() {
  const footer = document.getElementById("footer");
  if (window.innerWidth < 1024) {
    footer.style.display = "none";
  } else {
    footer.style.display = "block";
  }
}
updateFooterDisplay();
window.addEventListener("resize", updateFooterDisplay);

async function getName(user_id) {
  try {
    const res = await fetch(`api/get/name/${user_id}`);
    const data = await res.json();
    return data.id;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function getLastId(data) {
  return data[data.length - 1].id;
}

async function getChatData() {
  const res = await fetch("api/chat");
  const chatdata = await res.json();
  document.getElementById("main_data").innerHTML = `
            <div id="root" style="display: flex; jutify-content: center; flex-direction: column; align-items: center; height: calc(100vh - 56px);">
                <div class="p-3 border-end border-start overflow-auto d-flex flex-column" style="width: 100%;" id="chat_data">
                </div>
            </div>
            `;
  const myRes = await fetch("api/get/my_id");
  const myiddata = await myRes.json();
  let my_id = myiddata.id;

  let ex_dateString = ``;
  let chat_cnt = 0;
  if (chatdata.req !== "error") {
    chat_cnt = chatdata.data.length;
  }
  for (let i = 0; i < chat_cnt; i++) {
    let ampm = "오전";
    let chat = chatdata.data[i].chat.replace(/\n/g, "<br>");;
    let user_id = chatdata.data[i].user_id;
    let user_name = "";
    let chatId = chatdata.data[i].id;
    let date = chatdata.data[i].date;
    const dateTime = new Date(date);
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();
    let hours = dateTime.getHours();
    let minutes = String(dateTime.getMinutes()).padStart(2, "0");
    
    if (hours >= 12) {
      ampm = "오후";
      if (hours != 12) {
        hours = hours - 12;
      }
    }
    let dateString = `${year}${month}${day}`;
    if (dateString != ex_dateString) {
      document.getElementById("chat_data").innerHTML += `
                            <div class="d-flex justify-content-center mt-2">
                                <div class="rounded-pill bg-secondary bg-opacity-10 d-flex justify-content-center" style="width: 250px;" id="date${i}">
                                    ${year}년 ${month}월 ${day}일
                                </div>
                            </div>
                            `;
      ex_dateString = dateString;
    }

    if (user_id == my_id) {
      //내 채팅
      document.getElementById("chat_data").innerHTML +=`
                        <div class="d-flex justify-content-end py-1">
                            <div style="max-width: 80%">
                                <div class="ps-1 pb-1" style="font-size: 12px; margin-top: 5px;">` +
        ampm +
        ` ${hours}:${minutes}</div>
                                <div id=chat_${chatId} class="border p-3 text-break ms-auto bg-dark bg-opacity-10" style="border-radius: 20px; border-top-right-radius: 0px; width: fit-content;">${chat}</div>
                            </div>
                        </div>
                        `;
    } else {
      //다른사람 채팅
      user_name = await getName(user_id);
      document.getElementById("chat_data").innerHTML +=`
                        <div class="d-flex flex-row py-1">
                            <div style="max-width: 80%">
                                <div class="d-flex pb-1 justify-content-between">
                                    <div class="border border-white fw-semibold">${user_name}</div>
                                    <div class="ps-1 pe-1" style="font-size: 12px; margin-top: 5px;">` + ampm + ` ${hours}:${minutes}</div>
                                </div>
                                <div id=chat_${chatId} class="border p-3 text-break" style="border-radius: 20px; border-top-left-radius: 0px; width: fit-content;">${chat}</div>
                            </div>
                        </div>
                        `;
    }
  }
  create_chat_input();

  function create_chat_input() {
    document.getElementById("root").innerHTML += `
                    <div class="input-group p-4 border-end border-start d-flex" style="width: 80%; height: 86px"; id="input_data">
                    </div>
                `;
    document.getElementById("input_data").innerHTML += `    
                        <textarea rows="1" style="height: 38px; resize: none;" class="form-control" id="chat_input" maxlength="300"></textarea>
                        <button class="btn btn-outline-secondary" type="button" id="chat_send" disabled>&nbsp;전송&nbsp;</button>
                `;
    requestAnimationFrame(() => {
      let objDiv = document.getElementById("chat_data");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
    if (chatdata.req == "error") {
      document.getElementById("chat_input").setAttribute("disabled", true);
      logout();
    } else {
      const target = document.getElementById("chat_input");
      target.removeAttribute("disabled");
      target.focus();
      document
        .getElementById("chat_input")
        .addEventListener("keydown", function (event) {
          submitTextarea(event);
        });
    }

    resize();
    chat_send();
    responsive();
    sendBtnCtrl();
    lastChatId = getLastId(chatdata.data)
  }
  check_num = chatdata.data.length;
}
