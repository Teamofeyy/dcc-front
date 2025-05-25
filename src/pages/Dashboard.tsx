'use client'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/Sidebar'
import DashboardStats from '@/components/DashboardStats'
import WeeklyShipmentsChart from '@/components/WeeklyShipment'
import DeliveriesCard from '@/components/DeliveriesCard'
import ActiveDeliveries from '@/components/ActiveDeliveries'
import { Menu } from 'lucide-react'

export default function DashboardPage() {
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
          <DashboardStats />
          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <WeeklyShipmentsChart />
            <DeliveriesCard />
          </div>
          <div className="mt-6">
            <ActiveDeliveries />
          </div>
        </main>
      </div>
    </div>
  )
}
