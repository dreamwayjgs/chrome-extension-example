// function sayHello() {
//     document.body.innerText = "Hello, World!";
// }
// // 페이지가 완전히 로딩된 후 함수 실행
// window.onload = sayHello;

chrome.extension.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        document.body.innerText = request.source;
    }
});

function onWindowLoad() {
    chrome.tabs.executeScript(null, {
        file: "getSource.js"
    }, function () {
        if (chrome.extension.lastError) {
            //document.body.innerText = 'There was error injecting script:\n' + chrome.extesion.lastError.message;
        }
    });
}

window.onload = onWindowLoad;