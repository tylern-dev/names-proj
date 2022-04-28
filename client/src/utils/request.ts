import axios, { AxiosRequestHeaders, Method } from 'axios'
import Cookie from 'js-cookie'

interface Request<T> {
  url: string
  method?: Method
  headers?: AxiosRequestHeaders
  data?: T
}

function request<T>({ url, method = 'GET', headers, data }: Request<T>) {
  const csrfToken = Cookie.get('csrf-token')
  axios.defaults.headers.post['X-CSRF-Token'] = csrfToken as string

  return axios({
    url,
    method,
    data,
    headers: {
      credentials: 'same-origin',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}

export default request
