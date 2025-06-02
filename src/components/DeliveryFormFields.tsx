import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { DeliveryCreate } from '@/types/delivery.types'

interface DeliveryFormFieldsProps {
  formData: DeliveryCreate
  onChange: <K extends keyof DeliveryCreate>(field: K, value: DeliveryCreate[K]) => void
  disabled?: boolean
  minDeliveryDate?: string
}

export default function DeliveryFormFields({ formData, onChange, disabled, minDeliveryDate }: DeliveryFormFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="weight">Вес (кг)</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.weight}
          onChange={(e) => onChange('weight', parseFloat(e.target.value))}
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="dimensions">Габариты</Label>
        <Input
          value={formData.dimensions}
          onChange={(e) => onChange('dimensions', e.target.value)}
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="address_in">Адрес отправки</Label>
        <Input
          value={formData.address_in}
          onChange={(e) => onChange('address_in', e.target.value)}
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="address_out">Адрес получения</Label>
        <Input
          value={formData.address_out}
          onChange={(e) => onChange('address_out', e.target.value)}
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="datetime_in">Дата отправки</Label>
        <Input
          type="datetime-local"
          value={formData.datetime_in}
          onChange={(e) => onChange('datetime_in', e.target.value)}
          required
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="datetime_out">Дата доставки</Label>
        <Input
          type="datetime-local"
          value={formData.datetime_out}
          onChange={(e) => onChange('datetime_out', e.target.value)}
          required
          disabled={disabled}
          min={minDeliveryDate}
        />
      </div>
      <div>
        <Label htmlFor="transport_id">ID транспорта</Label>
        <Input
          type="number"
          value={formData.transport_id}
          onChange={(e) => onChange('transport_id', parseInt(e.target.value))}
          required
          disabled={disabled}
        />
      </div>
    </div>
  )
} 