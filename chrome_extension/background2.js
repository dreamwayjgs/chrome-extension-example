console.log("background running");

let targetUrl = "https://127.0.0.1:8000/infos/";

function __onWindowLoad() {
    chrome.extension.onMessage.addListener(function (request, sender) {
        if (request.action == "getSource") {
            // document.body.innerText = request.source;
            fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({
                //     sourceText: request.source,
                //     key: "highlight",
                //     userId: 1,
                // }),
                body: JSON.stringify({
                    sourceText: request.source,
                    key: "highlight",
                    userId: 1,
                }),
            })
                .then((response) => {
                    // console.log(response.clone().text());
                    // console.log(response.clone().json());

                    console.log(response.json());
                    // return response.text();
                    // return response.json();
                    // response.json();
                    // console.log("response : ", response.text());
                    // console.log(url);
                    // displayText(url);
                    // displayText(url.substring(0, url.length - 12));
                    // return response.text();
                })
                // .then((data) => {
                //     // displayText(data);
                //     // console.log(data);
                //     var parser = new DOMParser();
                //     var doc = parser.parseFromString(data, 'text/html');
                // })
                .catch((error) => console.log(error));
        }
    });

    function onWindowLoad() {
        // console.log("2");
        chrome.tabs.executeScript(null, {
            file: "getSource.js"
        }, function () {
            if (chrome.extension.lastError) {
                // document.body.innerText = 'Error : \n' + chrome.extension.lastError.message;
                // console.log(chrome.extension.lastError.message);
                // console.log("14");
            }
        });
        // console.log("13");
    }

    window.onload = onWindowLoad;
}

__onWindowLoad();