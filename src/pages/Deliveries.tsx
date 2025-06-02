import ProductsInStock from '@/components/ProductsInStock'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Filter, Menu, Plus } from 'lucide-react'
import { useState } from 'react'
import CreateDeliveryModal from '@/components/CreateDeliveryModal'
import { useCreateDelivery } from '@/hooks/useDeliveries'
import type { DeliveryCreate } from '@/types/delivery.types'
import DeliveriesFilterSidebar from '@/components/DeliveriesFilterSidebar'

export default function Deliveries() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [createdFrom, setCreatedFrom] = useState<string | null>(null)
  const [createdTo, setCreatedTo] = useState<string | null>(null)
  const [arrivalFrom, setArrivalFrom] = useState<string | null>(null)
  const [arrivalTo, setArrivalTo] = useState<string | null>(null)
  const createDelivery = useCreateDelivery()

  const handleOpen = () => setIsCreateOpen(true)
  const handleClose = () => setIsCreateOpen(false)

  const handleCreate = (data: DeliveryCreate) => {
    createDelivery.mutate(data, {
      onSuccess: handleClose,
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Свернуть меню</span>
            </Button>
            <h1 className="text-xl font-medium">Управление доставками</h1>
          </div>
        </header>
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Активные доставки</h2>
              <p className="text-gray-600">
                Управляйте всеми доставками в системе
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
              <Button
                className="bg-[#2C2D5B] hover:bg-[#443e75] text-white"
                onClick={handleOpen}
              >
                <Plus className="h-4 w-4 mr-2" />
                Новая доставка
              </Button>
            </div>
          </div>
          <ProductsInStock
            variant="detailed"
            statusFilter={statusFilter}
            createdFrom={createdFrom}
            createdTo={createdTo}
            arrivalFrom={arrivalFrom}
            arrivalTo={arrivalTo}
          />
        </main>
        <CreateDeliveryModal
          isOpen={isCreateOpen}
          onClose={handleClose}
          onSave={handleCreate}
        />
        <DeliveriesFilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          createdFrom={createdFrom}
          setCreatedFrom={setCreatedFrom}
          createdTo={createdTo}
          setCreatedTo={setCreatedTo}
          arrivalFrom={arrivalFrom}
          setArrivalFrom={setArrivalFrom}
          arrivalTo={arrivalTo}
          setArrivalTo={setArrivalTo}
        />
      </div>
    </div>
  )
}
