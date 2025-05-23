import { instanse } from '@/api/axios.api'
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper'

interface IRole {
  id: number
  name: string
}

export const RolesService = {
  async create(name: string): Promise<IRole> {
    const token = getTokenFromLocalStorage()
    const response = await instanse.post('/roles', name, {
      params: { token },
    })
    return response.data
  },

  async getAll(): Promise<IRole[]> {
    const token = getTokenFromLocalStorage()
    const response = await instanse.get(`/roles`, {
      params: { token },
    })
    return response.data
  },

  async getRoleById(role_id: number): Promise<IRole[]> {
    const token = getTokenFromLocalStorage()
    const response = await instanse.get(`/roles/${role_id}`, {
      params: { token },
    })
    return response.data
  },

  async updateRoleById(role_id: number, name: string): Promise<IRole[]> {
    const token = getTokenFromLocalStorage()
    const response = await instanse.put(`/roles/${role_id}`, name, {
      params: { token },
    })
    return response.data
  },

  async deleteRoleById(role_id: number): Promise<IRole[]> {
    const token = getTokenFromLocalStorage()
    const response = await instanse.delete(`/roles/${role_id}`, {
      params: { token },
    })
    return response.data
  },
}
