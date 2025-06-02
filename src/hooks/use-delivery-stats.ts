import { useDeliveries } from './useDeliveries'

type ChartData = {
  name: string
  value: number
  color: string
}[]

export function useDeliveryStats() {
  const { data: deliveries = [], isLoading } = useDeliveries()

  const total = deliveries.length
  const delivered = deliveries.filter((d) => d.status === 'delivered').length
  const inProgress = deliveries.filter((d) => d.status === 'in_transit').length
  const delayed = deliveries.filter((d) => d.status === 'pending').length

  const percent = (count: number) => (total ? Math.round((count / total) * 100) : 0)

  const data: ChartData = [
    { name: 'Доставлено', value: percent(delivered), color: '#F67366' },
    { name: 'В пути', value: percent(inProgress), color: '#FFF6DF' },
    { name: 'Ожидают', value: percent(delayed), color: '#2C2D5B' },
  ]

  return { data, loading: isLoading }
}
