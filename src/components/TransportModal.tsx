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
import type {
  TransportCreate,
  TransportUpdate,
  TransportGet,
} from '@/services/transport.service'

const TransportSchema = z.object({
  capacity: z
    .number({ required_error: 'Укажите вместимость' })
    .min(1, 'Минимум 1 м³'),
  dimensions: z.string().min(1, 'Укажите габариты'),
})

type TransportFormValues = z.infer<typeof TransportSchema>

interface TransportModalProps {
  isOpen: boolean
  onClose: () => void

  transportToEdit?: TransportGet

  onCreate: (data: TransportCreate) => void

  onUpdate: (payload: { id: number; data: TransportUpdate }) => void
}

export default function TransportModal({
  isOpen,
  onClose,
  transportToEdit,
  onCreate,
  onUpdate,
}: TransportModalProps) {
  const isEditMode = Boolean(transportToEdit)

  const form = useForm<TransportFormValues>({
    resolver: zodResolver(TransportSchema),
    defaultValues: {
      capacity: transportToEdit?.capacity ?? 0,
      dimensions: transportToEdit?.dimensions ?? '',
    },
    mode: 'onTouched',
  })

  const handleSubmit = (values: TransportFormValues) => {
    if (isEditMode && transportToEdit) {
      onUpdate({ id: transportToEdit.id, data: values })
    } else {
      onCreate(values)
    }
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Редактировать транспорт' : 'Создать транспорт'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            <div>
              <Label htmlFor="capacity">Вместимость (м³)</Label>
              <Input
                type="number"
                step="1"
                {...form.register('capacity', { valueAsNumber: true })}
                min={1}
                className={
                  form.formState.errors.capacity ? 'border-red-500' : ''
                }
              />
              {form.formState.errors.capacity && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.capacity.message}
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

            <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button
                type="submit"
                className="bg-[#2C2D5B] text-white hover:bg-[#443e75]"
              >
                {isEditMode ? 'Сохранить' : 'Создать'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
