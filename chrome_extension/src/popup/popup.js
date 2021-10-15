// document.addEventListener("load", ...) 와 같음
window.onload = () => {
  const buttonForBackground = document.getElementById('fire-to-back')
  const buttonForContent = document.getElementById('fire-to-content')

  buttonForBackground.onclick = () => {
    const message = { from: 'popup', action: 'fetch', method: 'GET', pathname: 'greet' }
    chrome.runtime.sendMessage(message)
  }

  buttonForContent.onclick = () => {
    const message = { from: 'popup', data: '팝업이 보냄' }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
}