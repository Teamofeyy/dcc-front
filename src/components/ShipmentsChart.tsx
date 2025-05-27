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
    { day: 'Пн', value: 17 },
    { day: 'Вт', value: 14 },
    { day: 'Ср', value: 18 },
    { day: 'Чт', value: 3 },
    { day: 'Пт', value: 7 },
    { day: 'Сб', value: 16 },
    { day: 'Вс', value: 20 },
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
          <XAxis dataKey="day" />
          <YAxis
            width={40}
            tickFormatter={(value) => {
              if (value === 0) return '0'
              return value
            }}
          />
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
