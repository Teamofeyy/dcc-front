import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { DeliveryCreate } from '@/types/delivery.types'

interface CreateDeliveryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (delivery: DeliveryCreate) => void
}

const DeliveryCreateSchema = z.object({
  weight: z.number({ required_error: 'Укажите вес' }).min(1, 'Минимум 1кг'),
  dimensions: z.string().min(1, 'Укажите габариты'),
  address_in: z.string().min(1, 'Укажите адрес отправки'),
  address_out: z.string().min(1, 'Укажите адрес получения'),
  datetime_in: z.string().min(1, 'Укажите дату отправки'),
  datetime_out: z.string().min(1, 'Укажите дату доставки'),
  transport_id: z
    .number({ required_error: 'Укажите ID транспорта' })
    .int()
    .min(1, 'ID транспорта должен быть больше 0'),
})

type DeliveryCreateForm = z.infer<typeof DeliveryCreateSchema>

export default function CreateDeliveryModal({
  isOpen,
  onClose,
  onSave,
}: CreateDeliveryModalProps) {
  const minDeliveryDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    d.setSeconds(0, 0)
    return d.toISOString().slice(0, 16)
  })()

  const form = useForm<DeliveryCreateForm>({
    resolver: zodResolver(DeliveryCreateSchema),
    defaultValues: {
      weight: 0,
      dimensions: '',
      address_in: '',
      address_out: '',
      datetime_in: '',
      datetime_out: '',
      transport_id: 0,
    },
    mode: 'onTouched',
  })

  const handleSubmit = (values: DeliveryCreateForm) => {
    onSave({ ...values })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle>Создать новую доставку</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Вес (кг)</Label>
                <Input
                  type="number"
                  step="0.1"
                  {...form.register('weight', { valueAsNumber: true })}
                  min={0.01}
                  className={
                    form.formState.errors.weight ? 'border-red-500' : ''
                  }
                />
                {form.formState.errors.weight && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.weight.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="dimensions">Габариты</Label>
                <Input
                  {...form.register('dimensions')}
                  className={
                    form.formState.errors.dimensions ? 'border-red-500' : ''
                  }
                />
                {form.formState.errors.dimensions && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.dimensions.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="address_in">Адрес отправки</Label>
                <Input
                  {...form.register('address_in')}
                  className={
                    form.formState.errors.address_in ? 'border-red-500' : ''
                  }
                />
                {form.formState.errors.address_in && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.address_in.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="address_out">Адрес получения</Label>
                <Input
                  {...form.register('address_out')}
                  className={
                    form.formState.errors.address_out ? 'border-red-500' : ''
                  }
                />
                {form.formState.errors.address_out && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.address_out.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="datetime_in">Дата отправки</Label>
                <Input
                  type="datetime-local"
                  {...form.register('datetime_in')}
                  className={
                    form.formState.errors.datetime_in ? 'border-red-500' : ''
                  }
                />
                {form.formState.errors.datetime_in && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.datetime_in.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="datetime_out">Дата доставки</Label>
                <Input
                  type="datetime-local"
                  min={minDeliveryDate}
                  {...form.register('datetime_out')}
                  className={
                    form.formState.errors.datetime_out ? 'border-red-500' : ''
                  }
                />
                {form.formState.errors.datetime_out && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.datetime_out.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="transport_id">ID транспорта</Label>
                <Input
                  type="number"
                  {...form.register('transport_id', { valueAsNumber: true })}
                  min={1}
                  className={
                    form.formState.errors.transport_id ? 'border-red-500' : ''
                  }
                />
                {form.formState.errors.transport_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.transport_id.message}
                  </p>
                )}
              </div>
            </div>
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
        </Form>
      </DialogContent>
    </Dialog>
  )
}
