import { instanse } from '@/api/axios.api'
import {
  setTokenToLocalStorage,
  getTokenFromLocalStorage,
} from '@/helpers/localstorage.helper'
import type { IUserData } from '@/types/types'

export const AuthService = {
  async registration(data: IUserData) {
    const response = await instanse.post('/auth/register', data)
    return response.data
  },
  async login(data: IUserData) {
    const response = await instanse.post('/auth/login', data)
    const token = response.data.access_token
    setTokenToLocalStorage('token', token)
    return response.data
  },
  async getMe() {
    const token = getTokenFromLocalStorage()
    const response = await instanse.get('/users/user/me', {
      params: token,
    })
    return response.data
  },
}
