import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, Package, Pencil } from 'lucide-react'
import { useState } from 'react'
import {
  statusColorMap,
  getStatusLabel,
  getTimeRemaining,
} from '@/helpers/delivery.helper'
import EditDeliveryModal from './EditDeliveryModal'
import { useDeliveries, useUpdateDelivery } from '@/hooks/useDeliveries'
import { getRoleFromLocalStorage } from '@/helpers/localstorage.helper'

type Delivery = {
  weight: number
  dimensions: string
  address_in: string
  address_out: string
  datetime_in: string
  datetime_out: string
  transport_id: number
  id: number
  user_delivery_id: number
  status: string
}

type Props = {
  variant?: 'compact' | 'detailed'
  statusFilter?: string | null
  createdFrom?: string | null
  createdTo?: string | null
  arrivalFrom?: string | null
  arrivalTo?: string | null
}

export default function ProductsInStock({
  variant = 'compact',
  statusFilter,
  createdFrom,
  createdTo,
  arrivalFrom,
  arrivalTo,
}: Props) {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  )
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { data: deliveries = [], isLoading } = useDeliveries()
  const updateDelivery = useUpdateDelivery()
  const role = getRoleFromLocalStorage()

  const handleEdit = (delivery: Delivery) => {
    setSelectedDelivery(delivery)
    setIsEditModalOpen(true)
  }

  let filteredDeliveries = deliveries
  if (statusFilter)
    filteredDeliveries = filteredDeliveries.filter(
      (d) => d.status === statusFilter
    )
  if (createdFrom)
    filteredDeliveries = filteredDeliveries.filter(
      (d) => d.datetime_in >= createdFrom
    )
  if (createdTo)
    filteredDeliveries = filteredDeliveries.filter(
      (d) => d.datetime_in <= createdTo + 'T23:59'
    )
  if (arrivalFrom)
    filteredDeliveries = filteredDeliveries.filter(
      (d) => d.datetime_out >= arrivalFrom
    )
  if (arrivalTo)
    filteredDeliveries = filteredDeliveries.filter(
      (d) => d.datetime_out <= arrivalTo + 'T23:59'
    )

  const deliveriesToShow =
    variant === 'compact' ? filteredDeliveries.slice(0, 5) : filteredDeliveries

  if (isLoading) return <div className="px-6 py-4">Загрузка...</div>

  return (
    <div className="space-y-4">
      {deliveriesToShow.map((delivery) => {
        const shortFrom = delivery.address_in.split(',')[0]
        const shortTo = delivery.address_out.split(',')[0]

        return (
          <div
            key={delivery.id}
            className="flex items-center justify-between px-6 py-3 "
          >
            <div className="flex justify-between gap-4 rounded-lg border p-4 shadow-sm w-full">
              <div className="flex gap-4 items-start">
                <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-indigo-50 flex items-center justify-center">
                  <Package className="h-6 w-6 text-[#312E81]" />
                </div>
                <div>
                  <div className="font-semibold text-base">
                    Доставка #{delivery.id}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {shortFrom} → {shortTo}
                  </div>
                  <div className="text-xs text-gray-400">
                    {delivery.weight} кг • {delivery.dimensions}
                  </div>

                  {variant === 'detailed' && (
                    <div className="mt-2 text-sm text-gray-500 space-y-1">
                      <div>
                        <span className="font-medium text-gray-600">
                          Дата доставки:
                        </span>{' '}
                        {new Date(delivery.datetime_out).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">
                          Полный маршрут:
                        </span>
                        <br />
                        {delivery.address_in} → {delivery.address_out}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end justify-between min-w-[110px]">
                <Badge className={statusColorMap[delivery.status]}>
                  {getStatusLabel(delivery.status)}
                </Badge>

                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  {getTimeRemaining(delivery.datetime_out)}
                </div>

                {role !== 'user' && (
                  <button
                    onClick={() => handleEdit(delivery)}
                    className="text-gray-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <Pencil className="h-4 w-4" /> Редактировать
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {selectedDelivery && (
        <EditDeliveryModal
          delivery={selectedDelivery}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedDelivery(null)
          }}
          onSave={async (updatedDelivery) => {
            try {
              await updateDelivery.mutateAsync({
                id: updatedDelivery.id,
                data: updatedDelivery,
              })
              // Query будет автоматически обновлён через invalidateQueries
            } catch (error) {
              console.error('Ошибка при обновлении:', error)
              alert('Не удалось сохранить изменения.')
            } finally {
              setIsEditModalOpen(false)
              setSelectedDelivery(null)
            }
          }}
        />
      )}
    </div>
  )
}
