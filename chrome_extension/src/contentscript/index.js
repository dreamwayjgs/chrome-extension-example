import { someFunctions } from "./someModules";

// manifest 에서 all_frames: true 일 경우 아래 코드들은 <frame> <iframe> 수 만큼 로드된다.
// FrameId 로 확인할 게 아니면 조심!
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // TODO: content script 에 리퀘스트가 온 것 핸들링
  console.log('콘텐트 스크립트가 받은 요청', message)
  sendMessageToBackground({ action: 'fetch', method: 'GET', pathname: 'greet' }).then(result => {
    console.log("백그라운드에서 온 응답", result)
  })
  // popup 에 sendResponse 를 보내려면 여기에 return true
});

function sendMessageToBackground(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError)
      resolve(response)
    })
  })
}

function runExternalFunctions(params) {
  // 외부 함수 임포트 해서 부르기... manifest 에는 하나만 지정. 호출 순서 꼬일 수 있음.
  someFunctions(params)
}