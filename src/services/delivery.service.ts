import { instanse } from '@/api/axios.api'
import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper'
import type {
  DeliveryCreate,
  DeliveryGet,
  DeliveryUpdate,
} from '@/types/delivery.types'

export const DeliveryService = {
  async create(data: DeliveryCreate): Promise<DeliveryGet> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.post<DeliveryGet>('/delivery/', data, {
      params: { token },
    })
    return res.data
  },

  async getAll(): Promise<DeliveryGet[]> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.get<DeliveryGet[]>('/delivery/', {
      params: { token },
    })
    return res.data
  },

  async getMy(): Promise<DeliveryGet[]> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.get<DeliveryGet[]>('/delivery/user/me', {
      params: { token },
    })
    return res.data
  },

  async getById(delivery_id: number): Promise<DeliveryGet> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.get<DeliveryGet>(`/delivery/${delivery_id}/`, {
      params: { token },
    })
    return res.data
  },

  async update(
    data: DeliveryUpdate,
    delivery_id: number
  ): Promise<DeliveryGet> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.put<DeliveryGet>(
      `/delivery/${delivery_id}/`,
      data,
      {
        params: { token },
      }
    )
    return res.data
  },

  async delete(delivery_id: number): Promise<void> {
    const token = getTokenFromLocalStorage()
    await instanse.delete(`/delivery/${delivery_id}/`, {
      params: { token },
    })
  },
}
