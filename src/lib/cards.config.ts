import type { StatsSectionProps } from '@/components/StatsSection'
import { Calendar, Truck, CheckCircle, type LucideIcon } from 'lucide-react'

interface StatCardConfig {
  key: string
  title: string
  icon: LucideIcon
  description: string
}

export function getCardsByRole(
  role: StatsSectionProps['role']
): StatCardConfig[] {
  switch (role) {
    case 'user':
      return [
        {
          key: 'totalThisMonth',
          title: 'Мои отправления',
          icon: Calendar,
          description: 'За текущий месяц',
        },
        {
          key: 'inTransit',
          title: 'В пути',
          icon: Truck,
          description: 'Текущие активные доставки',
        },
        {
          key: 'delivered',
          title: 'Доставлено',
          icon: CheckCircle,
          description: 'Успешно завершённые',
        },
      ]
    case 'manager':
      return [
        {
          key: 'totalThisMonth',
          title: 'Всего заявок',
          icon: Calendar,
          description: 'Все доставки на платформе',
        },
        {
          key: 'pending',
          title: 'Ожидают подтверждения',
          icon: CheckCircle,
          description: 'Заявки в ожидании',
        },
        {
          key: 'inTransit',
          title: 'В пути',
          icon: Truck,
          description: 'Переданные водителю',
        },
        {
          key: 'delivered',
          title: 'Завершённые',
          icon: CheckCircle,
          description: 'Успешно доставленные',
        },
      ]
    case 'admin':
    case 'superadmin':
      return [
        {
          key: 'totalUsers',
          title: 'Пользователей всего',
          icon: Calendar,
          description: 'Зарегистрировано на платформе',
        },
        {
          key: 'activeManagers',
          title: 'Активных менеджеров',
          icon: Truck,
          description: 'Сейчас обрабатывают заявки',
        },
        {
          key: 'systemHealth',
          title: 'Состояние системы',
          icon: CheckCircle,
          description: 'Всё работает стабильно',
        },
      ]
    default:
      return []
  }
}
