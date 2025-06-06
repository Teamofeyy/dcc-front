import { instanse } from '@/api/axios.api'
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper'

export interface UserCreate {
  user_id: number | null
  login: string
  name: string | null
  role_id: number | null
  password: string
}

export interface UserUpdate {
  login?: string | null
  name?: string | null
  role_id?: number | null
  password?: string | null
}

export interface UserGet {
  id: number
  login: string
  name: string | null
  role: {
    name: string
    role_id: number
  }
}

export const UserService = {
  async create(data: UserCreate): Promise<UserGet> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.post<UserGet>('/users/', data, {
      params: { token },
    })
    return res.data
  },

  async getAll(): Promise<UserGet[]> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.get<UserGet[]>('/users/', {
      params: { token },
    })
    return res.data
  },

  async getById(user_id: number): Promise<UserGet> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.get<UserGet>(`/users/${user_id}`, {
      params: { token },
    })
    return res.data
  },

  async update(user_id: number, data: UserUpdate): Promise<UserGet> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.put<UserGet>(`/users/${user_id}`, data, {
      params: { token },
    })
    return res.data
  },

  async delete(user_id: number): Promise<void> {
    const token = getTokenFromLocalStorage()
    await instanse.delete(`/users/${user_id}`, {
      params: { token },
    })
  },
}
