import axios from 'axios'

export const instanse = axios.create({
  baseURL: 'https:/dvt-grup.ru/api',
})
