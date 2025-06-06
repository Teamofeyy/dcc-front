import axios from 'axios'

export const instanse = axios.create({
  baseURL: '/api/',
})
