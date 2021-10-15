console.log("background running");

const API_URL = 'http://localhost:59000'

/**
 * 테스트 서버는 http://localhost:59000/greet 으로 요청할 시 {status: 'Hello', greet: 'Hi!'} 를 반환한다
 * 여기서 사용되는 console.log 는 확장 프로그램의 뷰 검사: 백그라운드 페이지 에서 확인
 */


// action === 'fetch', method === 'GET' 의 메시지를 받으면 data 를 파라미터로 하는 GET 리퀘스트를 보냄
/**
 * data = {
 *   key: value (string)
 * }
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, method, data, pathname } = message
  if (action === 'fetch' && method === 'GET') {
    const url = new URL(API_URL)
    url.pathname = pathname ? pathname : '' // URL 구조: {protocol}://{host}:{port}/{pathname}?{searchParams}
    if (data && typeof (data) === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }
    console.log(url.toString())
    fetch(url.toString())
      .catch(reason => {
        console.log("통신 실패", reason)
      })
      .then(res => res.json())
      .catch(reason => {
        console.log("결과가 있는데 json 이 아님", reason)
      })
      .then(result => {
        console.log("GET result", result)
        sendResponse(result)
      })
    return true // fetch 가 비동기로 수행되므로 메시지 발신자에게 sendResponse 를 기다려달라고 요청하는 의미
  }
})


// action === 'fetch', method === 'POST' 의 메시지를 받으면 data 를 body로 하는 POST 리퀘스트를 보냄
/**
 * data is serializable object (Can be argument of JSON.stringify)
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, method, data } = message
  if (action === 'fetch' && method === 'POST') {
    const url = new URL(API_URL)
    url.pathname = pathname ? pathname : ''
    fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(result => {
      console.log("POST Result", result)
      sendResponse(result)
    })
    return true
  }
})