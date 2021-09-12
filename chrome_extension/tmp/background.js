// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.
chrome.runtime.onInstalled.addListener(async () => {

    // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
    // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
    // runtime.

    // let url = chrome.runtime.getURL("index3.html");

    // console.log(document.body);
    // $.ajax({
    //     url: 'http://localhost:8000',
    //     type: 'get',
    //     data: { "키": "값" },
    //     dataType: 'text',
    //     success: function (data) {
    //         alert("데이터전송 성공");
    //     },
    //     error: function (error) {
    //         alert("에러");
    //     }
    // });

    

    //let tab = await chrome.tabs.create({ url });


    //console.log(`Created tab ${tab.id}`);
});

let ajax = function (options, callback) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open(options.type, options.url, options.async || true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            return callback(xhr.responseText);
        }
    };
    return xhr.send();
};