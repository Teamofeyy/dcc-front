import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import TransportModal from '@/components/TransportModal'
import Transports from '@/components/Transports'
import { Button } from '@/components/ui/button'
import { useCreateTransport, useUpdateTransport } from '@/hooks/useTransport'
import type { TransportGet } from '@/services/transport.service'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast, Toaster } from 'sonner'

export default function Transport() {
  const createTransport = useCreateTransport()
  const updateTransport = useUpdateTransport()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransport, setSelectedTransport] =
    useState<TransportGet | null>(null)

  const openCreate = () => {
    setSelectedTransport(null)
    setIsModalOpen(true)
  }

  const openEdit = (transport: TransportGet) => {
    setSelectedTransport(transport)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedTransport(null)
  }

  const handleCreate = async (data: {
    capacity: number
    dimensions: string
  }) => {
    try {
      await createTransport.mutateAsync(data)
      toast.success('Транспорт создан')
      handleClose()
    } catch {
      toast.error('Ошибка при создании')
    }
  }

  const handleUpdate = async ({ id, data }: { id: number; data: any }) => {
    try {
      await updateTransport.mutateAsync({ id, data })
      toast.success('Изменения сохранены')
      handleClose()
    } catch {
      toast.error('Ошибка при сохранении')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header title="Управление доставками" />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Транспорт</h2>
              <p className="text-gray-600">Управление транспортом</p>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-[#2C2D5B] hover:bg-[#443e75] text-white"
                onClick={openCreate}
              >
                <Plus className="h-4 w-4 mr-2" />
                Новый транспорт
              </Button>
            </div>
          </div>
          <Transports onEdit={openEdit} />
        </main>
        <TransportModal
          isOpen={isModalOpen}
          onClose={handleClose}
          transportToEdit={selectedTransport ?? undefined}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
        <Toaster richColors position="top-right" />
      </div>
    </div>
  )
}
