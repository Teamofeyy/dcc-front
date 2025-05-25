'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, DollarSign, Package, Warehouse } from 'lucide-react'

export default function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Request For Quotation
          </CardTitle>
          <PieChart className="h-4 w-4 text-indigo-900" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Today&apos;s Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-indigo-900" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₦ 7,000</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Shipments
          </CardTitle>
          <Package className="h-4 w-4 text-indigo-900" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">50</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Warehouse
          </CardTitle>
          <Warehouse className="h-4 w-4 text-indigo-900" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">100</div>
        </CardContent>
      </Card>
    </div>
  )
}
