import axios from 'axios'
import CookieH from "../helpers/cookie.h";

export default class DataS {

  constructor() {
    this.client = axios.create({
      // baseURL:'http://172.16.145.181:3002',
      // baseURL: 'https://galioserver.myiuc.com',
      // baseURL: 'http://172.16.145.181:3002',
      baseURL: ' http://localhost:3002',
      headers: {
        'content-type': 'application/json',
      }
    })

    this.client.interceptors.response.use(res => {
      return res;
    }, error => {
      return Promise.reject(error.response);
    });
  }

  post = (url, data, config) => {
    let params = {...config}
    if (CookieH.getUser()?.TOKEN)
      params['Authorization'] = `Bearer ${CookieH.getUser()?.TOKEN}`
      
    return this.client.post(url, data, {
      headers: params
    })
  }

  patch = (url, data, config) => {
    let params = {...config}
    if (CookieH.getUser()?.TOKEN)
      params['Authorization'] = `Bearer ${CookieH.getUser()?.TOKEN}`

    return this.client.patch(url, data, {
      headers: params
    })
  }

  get = (url, config) => {
    let params = {...config}
    if (CookieH.getUser()?.TOKEN)
      params['Authorization'] = `Bearer ${CookieH.getUser()?.TOKEN}`

    return this.client.get(url, {
      headers: params
    })
  }
}
