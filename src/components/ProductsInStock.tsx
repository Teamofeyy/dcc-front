export default function ProductsInStock() {
  const products = [
    {
      id: 1,
      name: 'Red velvet frostings',
      branch: 'Abuja Branch',
      price: '₦ 7,000',
      quantity: 5,
      image: '/placeholder.svg?height=60&width=60',
    },
    {
      id: 2,
      name: 'Red velvet frostings',
      branch: 'Abuja Branch',
      price: '₦ 7,000',
      quantity: 5,
      image: '/placeholder.svg?height=60&width=60',
    },
    {
      id: 3,
      name: 'Red velvet frostings',
      branch: 'Abuja Branch',
      price: '₦ 7,000',
      quantity: 5,
      image: '/placeholder.svg?height=60&width=60',
    },
    {
      id: 4,
      name: 'Red velvet frostings',
      branch: 'Abuja Branch',
      price: '₦ 7,000',
      quantity: 5,
      image: '/placeholder.svg?height=60&width=60',
    },
    {
      id: 5,
      name: 'Red velvet frostings',
      branch: 'Abuja Branch',
      price: '₦ 7,000',
      quantity: 5,
      image: '/placeholder.svg?height=60&width=60',
    },
  ]

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between px-6 py-2"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-blue-900">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                width={60}
                height={60}
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500">{product.branch}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium">{product.price}</div>
              <div className="text-sm text-gray-500">x {product.quantity}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
