'use client'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/Sidebar'
import StatsSection from '@/components/StatsSection'
import WeeklyShipmentsChart from '@/components/WeeklyShipment'
import DeliveriesCard from '@/components/DeliveriesCard'
import ActiveDeliveries from '@/components/ActiveDeliveries'
import { Menu } from 'lucide-react'
import { getRoleFromLocalStorage } from '@/helpers/localstorage.helper'
import { useEffect, useState } from 'react'
import { useDeliveries, useCreateDelivery } from '@/hooks/useDeliveries'
import WelcomeCard from '@/components/WelcomeCard'
import CreateDeliveryModal from '@/components/CreateDeliveryModal'
import type { DeliveryCreate } from '@/types/delivery.types'

export default function DashboardPage() {
  const [role, setRole] = useState<'user' | 'manager' | 'admin' | 'superadmin'>(
    'user'
  )

  const { data: deliveries = [], isLoading } = useDeliveries()
  const createDelivery = useCreateDelivery()

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  useEffect(() => {
    const storedRole = getRoleFromLocalStorage()
    if (
      storedRole === 'user' ||
      storedRole === 'manager' ||
      storedRole === 'admin' ||
      storedRole === 'superadmin'
    ) {
      setRole(storedRole)
    }
  }, [])
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
            <h1 className="text-xl font-medium">Дэшборд</h1>
          </div>
        </header>
        <main className="p-6">
          {role === 'user' && !isLoading && deliveries.length === 0 ? (
            <WelcomeCard onCreateDelivery={() => setIsCreateOpen(true)} />
          ) : (
            <>
              <StatsSection role={role} />
              <div className="grid gap-6 mt-6 md:grid-cols-2">
                <WeeklyShipmentsChart />
                <DeliveriesCard />
              </div>
              <div className="mt-6">
                <ActiveDeliveries />
              </div>
            </>
          )}
        </main>
        <CreateDeliveryModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSave={(data: DeliveryCreate) => {
            createDelivery.mutate(data, {
              onSuccess: () => setIsCreateOpen(false),
            })
          }}
        />
      </div>
    </div>
  )
}
