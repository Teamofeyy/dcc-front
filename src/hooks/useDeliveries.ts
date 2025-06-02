import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DeliveryService } from '@/services/delivery.service'
import { getRoleFromLocalStorage } from '@/helpers/localstorage.helper'
import type { DeliveryUpdate, DeliveryCreate } from '@/types/delivery.types'

export function useDeliveries() {
  const role = getRoleFromLocalStorage()
  return useQuery({
    queryKey: ['deliveries', role],
    queryFn: async () => {
      if (role === 'user') {
        return DeliveryService.getMy()
      }
      return DeliveryService.getAll()
    },
  })
}

export function useUpdateDelivery() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: DeliveryUpdate }) => {
      return DeliveryService.update(data, id)
    },
    onSuccess: (_, { id }) => {
      // Инвалидируем deliveries и конкретную доставку
      queryClient.invalidateQueries({ queryKey: ['deliveries'] })
      queryClient.invalidateQueries({ queryKey: ['delivery', id] })
    },
  })
}

export function useCreateDelivery() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: DeliveryCreate) => {
      return DeliveryService.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] })
    },
  })
}

export function useDeleteDelivery() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      return DeliveryService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] })
    },
  })
}
