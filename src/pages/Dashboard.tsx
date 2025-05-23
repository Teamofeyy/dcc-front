'use client'

import { useState } from 'react'
import {
  ChevronDown,
  PieChart,
  DollarSign,
  Package,
  Warehouse,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sidebar } from '@/components/sidebar'
import { ShipmentsChart } from '@/components/shipments-chart'
import { DeliveriesChart } from '@/components/deliveries-chart'
import { StoreLocations } from '@/components/store-locations'
import { ProductsInStock } from '@/components/products-in-stock'

export default function DashboardPage() {
  const [weekFilter, setWeekFilter] = useState('This Week')
  const [locationFilter, setLocationFilter] = useState('In Europe')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-xl font-medium">Dashboard</h1>
          </div>
        </header>
        <main className="p-6">
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

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card className="col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly Shipments Chart
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-8 gap-1">
                      {weekFilter}
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setWeekFilter('This Week')}
                    >
                      This Week
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setWeekFilter('Last Week')}
                    >
                      Last Week
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setWeekFilter('Last Month')}
                    >
                      Last Month
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="px-2">
                <ShipmentsChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Deliveries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveriesChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Store Locations
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-8 gap-1">
                      {locationFilter}
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setLocationFilter('In Europe')}
                    >
                      In Europe
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setLocationFilter('In Africa')}
                    >
                      In Africa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setLocationFilter('In Asia')}
                    >
                      In Asia
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-0">
                <StoreLocations />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Products In Stock
                </CardTitle>
                <Button variant="outline" className="h-8">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="px-0">
                <ProductsInStock />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
