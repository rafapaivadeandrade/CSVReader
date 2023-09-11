import axios from 'axios'

const local = 'http://localhost:3000/api'
const production = ''
let api_url = production

if (document.location.href.indexOf('localhost') > -1) {
  api_url = local
} else if (document.location.href.indexOf('127.0.0.1') > -1) {
  api_url = production
}

const api = axios.create({
  baseURL: api_url,
})

export default api
