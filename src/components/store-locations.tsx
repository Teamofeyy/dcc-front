import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function StoreLocations() {
  return (
    <div className="relative w-full h-[300px] bg-gray-200">
      {/* This would typically be a real map component */}
      <div className="absolute inset-0 bg-gray-200">
        <img
          src="/placeholder.svg?height=300&width=600"
          alt="Map"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Location markers */}
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg w-40">
            <div className="text-sm font-medium">Pisa, Italy</div>
            <Button variant="link" className="text-xs text-blue-600 p-0 h-auto">
              View Details
            </Button>
          </div>
          <div className="bg-red-500 text-white p-2 rounded-full">
            <MapPin className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="absolute top-2/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg w-40">
            <div className="text-sm font-medium">Pisa, Italy</div>
            <Button variant="link" className="text-xs text-blue-600 p-0 h-auto">
              View Details
            </Button>
          </div>
          <div className="bg-red-500 text-white p-2 rounded-full">
            <MapPin className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
