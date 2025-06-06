import { Truck, Edit, Ruler, Weight } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { useTransport } from '@/hooks/useTransport'
import { getRoleFromLocalStorage } from '@/helpers/localstorage.helper'
import type { TransportGet } from '@/services/transport.service'

interface TransportsProps {
  onEdit: (transport: TransportGet) => void
}

export default function Transports({ onEdit }: TransportsProps) {
  const { data: transports = [], isLoading } = useTransport()
  const role = getRoleFromLocalStorage()

  if (isLoading) return <div className="px-6 py-4">Загрузка...</div>

  return (
    <div className="space-y-4">
      {transports.map((transport: TransportGet) => (
        <div
          key={transport.id}
          className="flex items-center justify-between px-6 py-3"
        >
          <Card className="overflow-hidden w-full">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-indigo-50 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <div>
                      <p className="text-sm text-gray-600">Номер</p>
                      <h3 className="font-semibold text-lg">{transport.id}</h3>
                    </div>
                  </div>
                </div>

                {role !== 'user' && (
                  <div className="flex gap-2">
                    <Button onClick={() => onEdit(transport)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Редактировать
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Размер */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-indigo-50 flex items-center justify-center">
                    <Ruler className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Размер</p>
                    <p className="font-medium">{transport.dimensions}</p>
                  </div>
                </div>

                {/* Вместимость */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-indigo-50 flex items-center justify-center">
                    <Weight className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Вместимость</p>
                    <p className="font-medium">{transport.capacity} кг</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
