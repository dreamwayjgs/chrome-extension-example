// function sayHello() {
//     document.body.innerText = "Hello, World!";
// }
// // 페이지가 완전히 로딩된 후 함수 실행
// window.onload = sayHello;

let targetUrl = "https://127.0.0.1:8000/infos?sourceText=";

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource2") {
        document.body.innerText = request.source;
    }
});

function onWindowLoad2() {
    chrome.tabs.executeScript(null, {
        file: "getSource2.js"
    }, function () {
        if (chrome.runtime.lastError) {
            //document.body.innerText = 'There was error injecting script:\n' + chrome.extesion.lastError.message;
        }
    });
}

window.onload = onWindowLoad2;