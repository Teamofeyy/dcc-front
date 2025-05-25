'use client'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function ShipmentsChart() {
  const data = [
    { location: 'Abuja', value: 20000 },
    { location: 'Lagos', value: 40000 },
    { location: 'Lagos', value: 30000 },
    { location: 'Accra', value: 15000 },
    { location: 'Bali', value: 30000 },
    { location: 'Greece', value: 45000 },
    { location: 'Milan', value: 25000 },
    { location: 'USA', value: 20000 },
  ]

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="location" />
          <YAxis
            width={40}
            tickFormatter={(value) => {
              if (value === 0) return '0'
              return `${value / 1000}K`
            }}
          />
          <Tooltip
            formatter={(value) => [`₦${value}`, 'Value']}
            labelFormatter={(label) => `Location: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312E81"
            fill="#312E81"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
