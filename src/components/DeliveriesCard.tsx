import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DeliveriesChart from '@/components/DeliveriesChart'

export default function DeliveriesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Доставки</CardTitle>
      </CardHeader>
      <CardContent>
        <DeliveriesChart />
      </CardContent>
    </Card>
  )
}
