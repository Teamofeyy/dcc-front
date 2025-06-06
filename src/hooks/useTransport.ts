import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  TransportService,
  type TransportCreate,
  type TransportUpdate,
} from '@/services/transport.service'

export function useTransport() {
  return useQuery({
    queryKey: ['transports'],
    queryFn: async () => {
      return TransportService.getAll()
    },
  })
}

export function useUpdateTransport() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TransportUpdate }) => {
      return TransportService.update(id, data)
    },
    onSuccess: (_, { id }) => {
      // Инвалидируем deliveries и конкретную доставку
      queryClient.invalidateQueries({ queryKey: ['transports'] })
      queryClient.invalidateQueries({ queryKey: ['transport', id] })
    },
  })
}

export function useCreateTransport() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: TransportCreate) => {
      return TransportService.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transports'] })
    },
  })
}

export function useDeleteTransport() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      return TransportService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transports'] })
    },
  })
}
