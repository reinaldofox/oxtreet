// let API_URL = "https://api.oxtreetbh.shop"
let API_URL = "http://localhost:3001"

class API {

  requestFactory = (method, body, token) => {
    baseUrl = "http://localhost:3001"
    return {
      method,
      mode: 'cors',
      header: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
        // 'charset': 'UTF-8',
        'authentication': token ? 'Bearer ' + token : null,
      },
      body: body ? JSON.stringify(body) : null
    }
  }

  /**
   * Executa requisições Fetch
   * @param {string} method Méthodos HTTP
   * @param {string} url URL ou url com parâmetros querystring
   * @param {object} body Exceto para requisições GET
   * @param {string} token Para acessar rotas protegidas
   * @returns 
   */
  fetchRequest = async (method, url, body, token) => {
    const endpoint = url?.startsWith('http') ? url : API_URL + url
    return await fetch(endpoint, {
      method,
      mode: 'cors',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
        // 'charset': 'UTF-8',
        'authorization': token ? token : null,
      },
      body: body ? JSON.stringify(body) : null,
    })
      .then(res => {
        if (res.status == 401) {
          localStorage.removeItem('userSession')
          // window.location.href('/')
          return res.json({ errors: ["Não autorizado!"] })
        }
        return res.json()
      })
      .catch(error => {
        throw ({
          errors: ['Ocorreu um erro ao conectar ao servidor'], stack: error
        })
      })
  }
}
export default new API()