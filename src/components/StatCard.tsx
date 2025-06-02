import type { LucideIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

interface StatCardProps {
  title: string
  icon: LucideIcon
  value: string | number
  description: string
}

export default function StatCard({
  title,
  icon: Icon,
  value,
  description,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-indigo-900" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
