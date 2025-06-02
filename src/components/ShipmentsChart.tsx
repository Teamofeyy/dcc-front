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
import { useShipmentsByWeekday } from '@/hooks/useShipmentsByWeekday'

export default function ShipmentsChart() {
  const { data, loading } = useShipmentsByWeekday()

  if (loading || data.length === 0) {
    return <div className="text-center">Загрузка данных...</div>
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis width={40} allowDecimals={false} />
          <Tooltip
            formatter={(value) => [`${value}`, 'Кол-во']}
            labelFormatter={(label) => `День: ${label}`}
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
