import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useEffect } from 'react'
import { useDeleteDelivery } from '@/hooks/useDeliveries'
import { getRoleFromLocalStorage } from '@/helpers/localstorage.helper'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import Field from './Field'
import type { DeliveryGet } from '@/types/delivery.types'

interface EditDeliveryModalProps {
  delivery: DeliveryGet
  isOpen: boolean
  onClose: () => void
  onSave: (delivery: DeliveryGet) => void
}

const DeliveryEditSchema = z.object({
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
  status: z.string(),
})

type DeliveryEditForm = z.infer<typeof DeliveryEditSchema>

export default function EditDeliveryModal({
  delivery,
  isOpen,
  onClose,
  onSave,
}: EditDeliveryModalProps) {
  const deleteDelivery = useDeleteDelivery()
  const role = getRoleFromLocalStorage()

  // Если дата доставки в прошлом, статус становится delivered
  const isPastDelivery =
    !!delivery.datetime_out && new Date(delivery.datetime_out) < new Date()

  const form = useForm<DeliveryEditForm>({
    resolver: zodResolver(DeliveryEditSchema),
    defaultValues: {
      weight: delivery.weight,
      dimensions: delivery.dimensions,
      address_in: delivery.address_in,
      address_out: delivery.address_out,
      datetime_in: delivery.datetime_in,
      datetime_out: delivery.datetime_out,
      transport_id: delivery.transport_id,
      status: isPastDelivery ? 'delivered' : delivery.status,
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    form.reset({
      weight: delivery.weight,
      dimensions: delivery.dimensions,
      address_in: delivery.address_in,
      address_out: delivery.address_out,
      datetime_in: delivery.datetime_in,
      datetime_out: delivery.datetime_out,
      transport_id: delivery.transport_id,
      status:
        !!delivery.datetime_out && new Date(delivery.datetime_out) < new Date()
          ? 'delivered'
          : delivery.status,
    })
    // eslint-disable-next-line
  }, [delivery])

  const handleSubmit = (values: DeliveryEditForm) => {
    // Если дата доставки в прошлом, статус всегда delivered
    const status =
      !!values.datetime_out && new Date(values.datetime_out) < new Date()
        ? 'delivered'
        : values.status
    onSave({ ...delivery, ...values, status })
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
          <DialogTitle>Редактировать доставку #{delivery.id}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4 grid grid-cols-2 gap-4"
          >
            <Field
              label="Вес (кг)"
              name="weight"
              type="number"
              step="1"
              min={1}
              control={form.control}
            />
            <Field label="Габариты" name="dimensions" control={form.control} />
            <Field
              label="Адрес отправки"
              name="address_in"
              control={form.control}
            />
            <Field
              label="Адрес получения"
              name="address_out"
              control={form.control}
            />
            <Field
              label="Дата отправки"
              name="datetime_in"
              type="datetime-local"
              control={form.control}
            />
            <Field
              label="Дата доставки"
              name="datetime_out"
              type="datetime-local"
              control={form.control}
            />
            <Field
              label="ID транспорта"
              name="transport_id"
              type="number"
              min={1}
              control={form.control}
            />

            <div className="col-span-2">
              <Label htmlFor="status">Статус</Label>
              <Select
                value={form.watch('status')}
                onValueChange={(value) => form.setValue('status', value)}
                disabled={isPastDelivery}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-md">
                  <SelectItem value="pending">Ожидает</SelectItem>
                  <SelectItem value="in_transit">В пути</SelectItem>
                  <SelectItem value="delivered">Доставлено</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6 pt-4 border-t col-span-2">
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
        </Form>
      </DialogContent>
    </Dialog>
  )
}
