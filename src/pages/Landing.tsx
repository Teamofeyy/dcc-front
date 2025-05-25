import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Truck, Package, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-semibold">
            D<span className="text-[#FF6B6B]">CC</span>
          </span>
        </div>
        <Button className="bg-[#2D3250] hover:bg-[#1e2139] text-white">
          <Link to={'/auth'}>Войти</Link>
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Быстрое и удобное{' '}
            <span className="text-[#FF6B6B]">Бронирование </span> Транспорта.
          </h1>
          <p className="text-gray-600 max-w-lg">
            Создайте заказ на перевозку груза всего за пару кликов. Понятный
            Понятный интерфейс, интеграция с календарем и гибкий выбор транспорта.
          </p>
        </div>
        <div className="md:w-1/2 relative">
          <img
            src="/hero-illustration.png"
            alt="Logistics illustration"
            width={600}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-12">
            <h2 className="text-3xl font-bold">Наши возможности</h2>
            <div className="h-1 w-36 bg-[#FF6B6B] mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="size-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Truck className="size-10 text-[#FF6B6B]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Планирование перевозок
                  </h3>
                  <p className="text-gray-600">
                    Выберите дату, укажите тип груза, его параметры и выберите подходящий транспорт — всё это в интуитивно понятной форме.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Card 2 */}
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="size-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Globe className="size-10 text-[#FF6B6B]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Удобный выбор маршрута</h3>
                  <p className="text-gray-600">
                    Забудьте о сложных логистических схемах — выбирайте маршрут из заранее подготовленных направлений.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Service Card 3 */}
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="size-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Package className="size-10 text-[#FF6B6B]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Всё под контролем
                  </h3>
                  <p className="text-gray-600">
                    Управляйте своими заказами и профилем в одном месте.
                    Просмотр статуса заказов и  контроль заказовв пару кликов
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-[#2D3250] hover:bg-[#1e2139] text-white px-8 py-6">
              <Link to={'/auth'}>Присоединиться</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
