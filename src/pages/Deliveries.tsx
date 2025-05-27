import ProductsInStock from '@/components/ProductsInStock'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Filter, Menu, Plus } from 'lucide-react'

export default function Deliveries() {
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
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
              {/* <Link to="/deliveries/create"> */}
              <Button className="bg-[#2C2D5B] hover:bg-[#443e75] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Новая доставка
              </Button>
              {/* </Link> */}
            </div>
          </div>

          <ProductsInStock variant="detailed" />
        </main>
      </div>
    </div>
  )
}
