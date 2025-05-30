import axios from 'axios'

export const instanse = axios.create({
  baseURL: 'http://46.253.143.204:9667/',
})
