'use client'

import {
  getManagerDeliveryStats,
  getUserDeliveryStats,
} from '@/lib/delivery-stats'
import StatCard from '@/components/StatCard'
import { getCardsByRole } from '@/lib/cards.config'
import { useDeliveries } from '@/hooks/useDeliveries'

export interface StatsSectionProps {
  role: 'user' | 'manager' | 'admin' | 'superadmin'
}

export default function StatsSection({ role }: StatsSectionProps) {
  const { data: deliveries = [], isLoading } = useDeliveries()
  const cards = getCardsByRole(role)

  const stats =
    role === 'user'
      ? getUserDeliveryStats(deliveries)
      : getManagerDeliveryStats(deliveries)

  // Приводим stats к типу Record<string, number> для доступа по ключу
  const statsRecord = stats as Record<string, number>

  if (isLoading) return <div>Загрузка...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          icon={card.icon}
          value={statsRecord[card.key] ?? 0}
          description={card.description}
        />
      ))}
    </div>
  )
}
