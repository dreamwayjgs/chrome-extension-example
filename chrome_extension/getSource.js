let targetUrl = "https://127.0.0.1:8000/infos?sourceText=";

function get_source(document_body) {
    // console.log("immediate function test22");
    return document_body.innerText;
}

chrome.extension.sendMessage({
    action: "getSource",
    source: get_source(document.body)
});

function dragText() {
    // console.log("mouse move");

    let text;

    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    else if (document.selection) {
        text = document.selection.createRange().text;
    }
    return text;
}

document.onmouseup = function () {
    if (dragText()) {
        getLOCs(dragText());
        console.log("working");
    }
}

function displayText(draggedText) {
    // let newDIV = document.createElement("div");
    // let newP = document.createElement("a");
    // let closeButton = document.createElement("span");

    let match = document.getElementsByClassName('MapViewTextView');
    // console.log(match);
    if (match.length > 0) {
        // match.innerHTML = draggedText + "&key=showmap";

        match.innerHTML = "지도 표출";
        match.href = encodeURI(draggedText + "&key=showmap");
    }
    else {
        let newDIV = document.createElement("div");
        let newP = document.createElement("a");
        let closeButton = document.createElement("span");
        closeButton.innerHTML = "X";
        closeButton.addEventListener('click', function () {
            // 동적으로 하려면 JQuery????? 되는것 같다(우연)
            newDIV.remove();
            return;
            // 안보이게
            // this.parentElement.style.display = "none";
        });
        // closeButton.style.cursor = "pointer";
        // newP.innerHTML = draggedText + "&key=showmap";
        newP.innerHTML = "지도 표출";

        // newP.setAttribute("href", encodeURI(draggedText + "&key=showmap"));
        newP.setAttribute("href", encodeURI('https://map.kakao.com/link/search/' + draggedText));

        newP.style.zIndex = "1";
        // newP.href = draggedText + "&key=showmap";
        // newP.onclick = window.open(draggedText);

        newDIV.appendChild(closeButton);
        newDIV.appendChild(newP);

        newDIV.setAttribute("class", "MapViewTextView");
        newDIV.style.padding = "1rem";
        newDIV.style.position = "fixed";
        // newDIV.style.position = "relative";
        newDIV.style.zIndex = "1";
        newDIV.style.right = "0";
        newDIV.style.top = "150px";
        newDIV.style.textAlign = "right";
        newDIV.style.background = "#FFFFFF";
        newDIV.style.border = "2px solid #CEECF5";
        newDIV.style.borderRadius = "1em 0 1em 1em";

        document.body.appendChild(newDIV);
    }

    // closeButton.innerHTML = "X";
    // closeButton.addEventListener('click', function () {
    //     this.parentElement.style.display = "none";
    // });
    // // closeButton.style.cursor = "pointer";
    // newP.innerHTML = draggedText + "&key=showmap";
    // newP.setAttribute("href", encodeURI(draggedText + "&key=showmap"));
    // newP.style.zIndex = "1";
    // // newP.href = draggedText + "&key=showmap";
    // // newP.onclick = window.open(draggedText);

    // newDIV.appendChild(closeButton);
    // newDIV.appendChild(newP);

    // newDIV.setAttribute("class", "MapViewTextView");
    // newDIV.style.padding = "1rem";
    // newDIV.style.position = "fixed";
    // // newDIV.style.position = "relative";
    // newDIV.style.zIndex = "1";
    // newDIV.style.right = "0";
    // newDIV.style.top = "150px";
    // newDIV.style.textAlign = "right";
    // newDIV.style.background = "#FFFFFF";
    // newDIV.style.border = "2px solid #CEECF5";
    // newDIV.style.borderRadius = "1em 0 1em 1em";

    // document.body.appendChild(newDIV);
}

function getLOCs(text) {
    console.log(targetUrl + text);
    let url = targetUrl + text; // + '&key=showmap';

    //displayText(url);
    displayText(text);


    // fetch한거 한번밖에 못읽음 (so, 넘겨줘야 then으로)
    // fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // })
    //     .then((response) => {
    //         // console.log(response.clone().text());
    //         // console.log(response.clone().json());
    //         // console.log(response.json());
    //         // return response.text();
    //         // return response.json();
    //         // response.json();
    //         // console.log("response : ", response.text());
    //         // console.log(url);
    //         // displayText(url);
    //         displayText(url.substring(0, url.length - 12));
    //         // return response.text();
    //     })
    //     // .then((data) => {
    //     //     // displayText(data);
    //     //     // console.log(data);
    //     //     var parser = new DOMParser();
    //     //     var doc = parser.parseFromString(data, 'text/html');
    //     // })
    //     .catch((error) => console.log(error));
}

// function getLOCs(text) {
//     console.log(targetUrl + text);
//     let url = targetUrl + text;
//     fetch(url, { mode: 'cors' })
//         .then((response) => response.json())
//         .then((data) => (function () {
//             console.log(data);
//             // let draggedTextText = data.message.result.draggedTextText;
//             // displayText(draggedTextText);
//         })())
//         .catch((error) => console.log(error))
// }