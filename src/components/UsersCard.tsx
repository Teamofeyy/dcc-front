// components/Users.tsx
import UserModal from './UserModal'
import { useUsers, useCreateUser, useUpdateUser } from '@/hooks/useUser'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit } from 'lucide-react'
import { useState } from 'react'
import type { UserCreate, UserGet, UserUpdate } from '@/services/users.service'
import { toast, Toaster } from 'sonner'

export default function UsersCard() {
  const { data: users = [], isLoading } = useUsers()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserGet | null>(null)

  const openCreate = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const openEdit = (user: UserGet) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const handleCreate = async (data: UserCreate) => {
    try {
      await createUser.mutateAsync(data)
      toast.success('Пользователь создан')
      handleClose()
    } catch {
      toast.error('Ошибка при создании')
    }
  }

  const handleUpdate = async ({
    id,
    data,
  }: {
    id: number
    data: UserUpdate
  }) => {
    try {
      await updateUser.mutateAsync({ id, data })
      toast.success('Изменения сохранены')
      handleClose()
    } catch {
      toast.error('Ошибка при сохранении')
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Пользователи</h2>
        <Button className="bg-[#312E81] text-white" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Новый пользователь
        </Button>
      </div>

      {isLoading ? (
        <p>Загрузка…</p>
      ) : (
        <div className="space-y-4">
          {users.map((user: UserGet) => (
            <Card key={user.id} className="overflow-hidden">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">ID: {user.id}</p>
                  <p className="font-semibold text-lg">{user.login}</p>
                  <p className="text-gray-500">{user.name ?? '—'}</p>
                  <p className="text-gray-500">Роль: {user.role.name}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(user)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Редактировать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={handleClose}
        userToEdit={selectedUser ?? undefined}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <Toaster richColors position="top-right" />
    </div>
  )
}
