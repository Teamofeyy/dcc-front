import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ProductsInStock from '@/components/ProductsInStock'

export default function ActiveDeliveries() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
        <Button variant="outline" className="h-8">
          View All
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <ProductsInStock />
      </CardContent>
    </Card>
  )
}
