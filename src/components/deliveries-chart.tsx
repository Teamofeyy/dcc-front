'use client'

import { Button } from '@/components/ui/button'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export function DeliveriesChart() {
  // Data for the pie chart
  const data = [
    { name: 'Ontime', value: 78, color: '#F67366' },
    { name: 'In Progress', value: 12, color: '#FFF6DF' },
    { name: 'Delayed', value: 10, color: '#2C2D5B' },
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[200px] aspect-square relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl font-bold">78</span>
            <span className="text-lg text-gray-500">%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 mt-4 w-full">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm">{item.name}</span>
            </div>
            <span className="text-sm">{item.value}%</span>
          </div>
        ))}
      </div>

      <Button variant="outline" className="mt-4 w-full">
        Download Statistics
      </Button>
    </div>
  )
}
