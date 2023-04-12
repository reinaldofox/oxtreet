const API_URL = "http://localhost:3001"
const FETCH_HEADERS = {
  'Accept': 'text/plain',
  'Content-Type': 'text/plain',
  'charset': 'UTF-8'
}

class Fetcher {
  request = async (endpoint, method, body, params = '') => {
    // console.log(API_URL + endpoint + params)
    return fetch(API_URL + endpoint + params, {
      method,
      mode: 'cors',
      headers: FETCH_HEADERS,
      body: body ? JSON.stringify(body) : null,
    })
      .then(res => res.json())
      .catch(error => { throw error })
  }
}
export default new Fetcher()