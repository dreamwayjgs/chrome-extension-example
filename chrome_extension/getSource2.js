function get_source(document_body) {
    // console.log("immediate function test22");
    return document_body.innerText;
}

chrome.extension.sendMessage({
    action: "getSource2",
    source: get_source(document.body)
});
