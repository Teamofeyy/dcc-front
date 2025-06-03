import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import DeliveryItems from '@/components/DeliveryItems'

export default function ActiveDeliveries() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Активные доставки</CardTitle>
        <Link to={'/deliveries'}>
          <Button variant="outline" className="h-8 cursor-pointer">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-0">
        <DeliveryItems variant="compact" />
      </CardContent>
    </Card>
  )
}
