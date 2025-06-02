import type { DeliveryGet } from '@/types/delivery.types'

export function getUserDeliveryStats(deliveries: DeliveryGet[]) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  let totalThisMonth = 0
  let inTransit = 0
  let delivered = 0

  for (const delivery of deliveries) {
    const inDate = new Date(delivery.datetime_in)

    if (
      inDate.getMonth() === currentMonth &&
      inDate.getFullYear() === currentYear
    ) {
      totalThisMonth++
    }

    if (delivery.status === 'in_transit') {
      inTransit++
    }

    if (delivery.status === 'delivered') {
      delivered++
    }
  }

  return {
    totalThisMonth,
    inTransit,
    delivered,
  }
}

export function getManagerDeliveryStats(deliveries: DeliveryGet[]) {
  const total = deliveries.length
  const pending = deliveries.filter((d) => d.status === 'pending').length
  const inTransit = deliveries.filter((d) => d.status === 'in_transit').length

  return {
    totalThisMonth: total,
    inTransit,
    delivered: deliveries.filter((d) => d.status === 'delivered').length,
    pending,
  }
}
