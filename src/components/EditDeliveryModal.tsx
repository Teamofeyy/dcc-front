import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useDeleteDelivery } from '@/hooks/useDeliveries'
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

interface EditDeliveryModalProps {
  delivery: Delivery
  isOpen: boolean
  onClose: () => void
  onSave: (delivery: Delivery) => void
}

export default function EditDeliveryModal({
  delivery,
  isOpen,
  onClose,
  onSave,
}: EditDeliveryModalProps) {
  const [formData, setFormData] = useState<Delivery>(delivery)
  const deleteDelivery = useDeleteDelivery()
  const role = getRoleFromLocalStorage()

  useEffect(() => {
    const updated = { ...delivery }
    // Если дата доставки в прошлом, статус становится delivered
    if (updated.datetime_out && new Date(updated.datetime_out) < new Date()) {
      updated.status = 'delivered'
    }
    setFormData(updated)
  }, [delivery])

  const handleInputChange = <K extends keyof Delivery>(
    field: K,
    value: Delivery[K]
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value }
      // Если изменили дату доставки и она в прошлом, статус delivered
      if (
        field === 'datetime_out' &&
        typeof value === 'string' &&
        value &&
        new Date(value) < new Date()
      ) {
        next.status = 'delivered'
      }
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleDelete = async () => {
    if (window.confirm('Удалить эту доставку?')) {
      await deleteDelivery.mutateAsync(delivery.id)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle>Редактировать доставку #{formData.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Вес (кг)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) =>
                  handleInputChange('weight', parseFloat(e.target.value))
                }
              />
            </div>
            <div>
              <Label htmlFor="dimensions">Габариты</Label>
              <Input
                value={formData.dimensions}
                onChange={(e) =>
                  handleInputChange('dimensions', e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="address_in">Адрес отправки</Label>
              <Input
                value={formData.address_in}
                onChange={(e) =>
                  handleInputChange('address_in', e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="address_out">Адрес получения</Label>
              <Input
                value={formData.address_out}
                onChange={(e) =>
                  handleInputChange('address_out', e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="datetime_in">Дата отправки</Label>
              <Input
                type="datetime-local"
                value={formData.datetime_in}
                onChange={(e) =>
                  handleInputChange('datetime_in', e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="datetime_out">Дата доставки</Label>
              <Input
                type="datetime-local"
                value={formData.datetime_out}
                onChange={(e) =>
                  handleInputChange('datetime_out', e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="transport_id">ID транспорта</Label>
              <Input
                type="number"
                value={formData.transport_id}
                onChange={(e) =>
                  handleInputChange('transport_id', parseInt(e.target.value))
                }
              />
            </div>
            <div>
              <Label htmlFor="user_delivery_id">ID пользователя</Label>
              <Input
                type="number"
                value={formData.user_delivery_id}
                onChange={(e) =>
                  handleInputChange(
                    'user_delivery_id',
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-md">
                  <SelectItem value="pending">Ожидает</SelectItem>
                  <SelectItem value="in_transit">В пути</SelectItem>
                  <SelectItem value="delivered">Доставлено</SelectItem>
                  <SelectItem value="delayed">Задержка</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            {(role === 'superadmin' ||
              role === 'admin' ||
              role === 'manager') && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteDelivery.status === 'pending'}
                >
                  {deleteDelivery.status === 'pending'
                    ? 'Удаление...'
                    : 'Удалить'}
                </Button>
              )}
            <Button
              type="submit"
              className="bg-[#2C2D5B] text-white hover:bg-[#443e75]"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
