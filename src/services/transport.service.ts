import { instanse } from '@/api/axios.api'

import { getTokenFromLocalStorage } from '@/helpers/localstorage.helper'

export interface TransportCreate {
  capacity: number
  dimensions: string
}

export interface TransportUpdate {
  capacity?: number | null
  dimensions?: string | null
}

export interface TransportGet {
  capacity: number
  dimensions: string
  id: number
}

export const TransportService = {
  async create(data: TransportCreate): Promise<TransportGet> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.post<TransportGet>('/transport', data, {
      params: { token },
    })
    return res.data
  },

  async getAll(): Promise<TransportGet[]> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.get<TransportGet[]>('/transport', {
      params: { token },
    })
    return res.data
  },

  async getById(transport_id: number): Promise<TransportGet> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.get<TransportGet>(`/transport/${transport_id}`, {
      params: { token },
    })
    return res.data
  },

  async update(
    transport_id: number,
    data: TransportUpdate
  ): Promise<TransportGet> {
    const token = getTokenFromLocalStorage()
    const res = await instanse.put<TransportGet>(
      `/transport/${transport_id}`,
      data,
      {
        params: { token },
      }
    )
    return res.data
  },

  async delete(transport_id: number): Promise<void> {
    const token = getTokenFromLocalStorage()
    await instanse.post(`/transport/${transport_id}`, {
      params: { token },
    })
  },
}
