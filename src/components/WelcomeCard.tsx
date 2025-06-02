import { Package, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface WelcomeCardProps {
  onCreateDelivery?: () => void
}

export default function WelcomeCard({ onCreateDelivery }: WelcomeCardProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Добро пожаловать в DCC
              </h1>
              <p className="text-muted-foreground">
                Создайте вашу первую доставку быстро и просто
              </p>
            </div>
            <Button size="lg" className="mt-4" onClick={onCreateDelivery}>
              <Plus className="mr-2 h-4 w-4" />
              Создать доставку
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
