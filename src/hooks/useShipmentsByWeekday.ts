// hooks/useShipmentsByWeekday.ts
import { useDeliveries } from './useDeliveries'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

type ChartPoint = {
  day: string
  value: number
}

export function useShipmentsByWeekday() {
  const { data: deliveries = [], isLoading } = useDeliveries()

  const weekMap: Record<string, number> = {
    Пн: 0,
    Вт: 0,
    Ср: 0,
    Чт: 0,
    Пт: 0,
    Сб: 0,
    Вс: 0,
  }

  deliveries.forEach((d) => {
    const day = format(parseISO(d.datetime_in), 'EE', { locale: ru })
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1, 2)
    if (weekMap[capitalizedDay] !== undefined) {
      weekMap[capitalizedDay] += 1
    }
  })

  const data: ChartPoint[] = daysOfWeek.map((day) => ({
    day,
    value: weekMap[day] || 0,
  }))

  return { data, loading: isLoading }
}
