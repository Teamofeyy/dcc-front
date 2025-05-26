'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Warehouse, Truck } from 'lucide-react'

export default function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Активные доставки
          </CardTitle>
          <Package className="h-4 w-4 text-indigo-900" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+12% с прошлой недели</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Доступный транспорт
          </CardTitle>
          <Truck className="h-4 w-4 text-indigo-900" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">Из 12 единиц</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Общий вес груза
          </CardTitle>
          <Package className="h-4 w-4 text-indigo-900" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,240</div>
          <p className="text-xs text-muted-foreground">кг в обработке</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Активные пользователи
          </CardTitle>
          <Warehouse className="h-4 w-4 text-indigo-900" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">156</div>
          <p className="text-xs text-muted-foreground">+8 новых за неделю</p>
        </CardContent>
      </Card>
    </div>
  )
}
