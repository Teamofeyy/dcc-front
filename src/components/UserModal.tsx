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
import type { UserCreate, UserUpdate, UserGet } from '@/services/users.service'
import { Trash2 } from 'lucide-react'

const UserSchema = z.object({
  login: z.string().min(1, 'Укажите логин'),
  name: z.string().nullable(),
  role_id: z.number().nullable(),
  password: z.string().min(6, 'Минимум 6 символов'),
})

type UserFormValues = z.infer<typeof UserSchema>

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  userToEdit?: UserGet
  onCreate: (data: UserCreate) => void
  onUpdate: (payload: { id: number; data: UserUpdate }) => void
}

export default function UserModal({
  isOpen,
  onClose,
  userToEdit,
  onCreate,
  onUpdate,
}: UserModalProps) {
  const isEditMode = Boolean(userToEdit)

  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      login: userToEdit?.login ?? '',
      name: userToEdit?.name ?? null,
      role_id: userToEdit?.role.role_id ?? null,
      password: '',
    },
    mode: 'onTouched',
  })

  const handleSubmit = (values: UserFormValues) => {
    if (isEditMode && userToEdit) {
      onUpdate({ id: userToEdit.id, data: values })
    } else {
      onCreate({
        user_id: isEditMode ? userToEdit!.id : null,
        login: values.login,
        name: values.name,
        role_id: values.role_id,
        password: values.password,
      })
    }
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Редактировать пользователя' : 'Создать пользователя'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-4"
          >
            <div>
              <Label htmlFor="login">Логин</Label>
              <Input
                {...form.register('login')}
                className={form.formState.errors.login ? 'border-red-500' : ''}
              />
              {form.formState.errors.login && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.login.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="name">Имя (опционально)</Label>
              <Input
                {...form.register('name')}
                className={form.formState.errors.name ? 'border-red-500' : ''}
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="role_id">Role ID</Label>
              <Input
                type="number"
                step="1"
                {...form.register('role_id', { valueAsNumber: true })}
                className={
                  form.formState.errors.role_id ? 'border-red-500' : ''
                }
              />
              {form.formState.errors.role_id && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.role_id.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">
                {isEditMode ? 'Новый пароль' : 'Пароль'}
              </Label>
              <Input
                type="password"
                {...form.register('password')}
                className={
                  form.formState.errors.password ? 'border-red-500' : ''
                }
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-4 mt-6 pt-4 border-t">
              {isEditMode && userToEdit && (
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Удалить
                </Button>
              )}
              <div className="flex gap-4 ml-auto">
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
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
