import DeliveryFormFields from './DeliveryFormFields'

export type { CreateDeliveryModalProps } 

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { DeliveryCreate } from '@/types/delivery.types'

interface CreateDeliveryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (delivery: DeliveryCreate) => void
}

export default function CreateDeliveryModal({
  isOpen,
  onClose,
  onSave,
}: CreateDeliveryModalProps) {
  const [formData, setFormData] = useState<DeliveryCreate>({
    weight: 0,
    dimensions: '',
    address_in: '',
    address_out: '',
    datetime_in: '',
    datetime_out: '',
    transport_id: 0,
  })

  const handleInputChange = <K extends keyof DeliveryCreate>(
    field: K,
    value: DeliveryCreate[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  // Минимальная дата доставки — завтра
  const minDeliveryDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    d.setSeconds(0, 0)
    return d.toISOString().slice(0, 16)
  })()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle>Создать новую доставку</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <DeliveryFormFields formData={formData} onChange={handleInputChange} minDeliveryDate={minDeliveryDate} />
          <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button
              type="submit"
              className="bg-[#2C2D5B] text-white hover:bg-[#443e75]"
            >
              Создать
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 