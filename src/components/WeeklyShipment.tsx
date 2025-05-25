'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ShipmentsChart from '@/components/ShipmentsChart'

export default function WeeklyShipmentsChart() {
  const [weekFilter, setWeekFilter] = useState('This Week')
  return (
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
            <DropdownMenuItem onClick={() => setWeekFilter('This Week')}>
              This Week
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setWeekFilter('Last Week')}>
              Last Week
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setWeekFilter('Last Month')}>
              Last Month
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="px-2">
        <ShipmentsChart />
      </CardContent>
    </Card>
  )
}
