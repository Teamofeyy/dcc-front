import React from 'react'

interface DeliveriesFilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  statusFilter: string | null
  setStatusFilter: (v: string | null) => void
  createdFrom: string | null
  setCreatedFrom: (v: string | null) => void
  createdTo: string | null
  setCreatedTo: (v: string | null) => void
  arrivalFrom: string | null
  setArrivalFrom: (v: string | null) => void
  arrivalTo: string | null
  setArrivalTo: (v: string | null) => void
}

const DeliveriesFilterSidebar: React.FC<DeliveriesFilterSidebarProps> = ({
  isOpen,
  onClose,
  statusFilter,
  setStatusFilter,
  createdFrom,
  setCreatedFrom,
  createdTo,
  setCreatedTo,
  arrivalFrom,
  setArrivalFrom,
  arrivalTo,
  setArrivalTo,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-2xl z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Фильтры</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </button>
      </div>
      <div className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Статус</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={statusFilter ?? ''}
            onChange={(e) => setStatusFilter(e.target.value || null)}
          >
            <option value="">Все</option>
            <option value="pending">Ожидает</option>
            <option value="in_transit">В пути</option>
            <option value="delivered">Доставлено</option>
            <option value="delayed">Задержка</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Дата создания (от)
          </label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={createdFrom ?? ''}
            onChange={(e) => setCreatedFrom(e.target.value || null)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Дата создания (до)
          </label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={createdTo ?? ''}
            onChange={(e) => setCreatedTo(e.target.value || null)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Дата прибытия (от)
          </label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={arrivalFrom ?? ''}
            onChange={(e) => setArrivalFrom(e.target.value || null)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Дата прибытия (до)
          </label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={arrivalTo ?? ''}
            onChange={(e) => setArrivalTo(e.target.value || null)}
          />
        </div>
        <div className="flex gap-2 mt-6">
          <button
            className="flex-1 bg-[#2C2D5B] text-white rounded px-4 py-2 hover:bg-[#443e75]"
            onClick={onClose}
            type="button"
          >
            Применить
          </button>
          <button
            className="flex-1 border rounded px-4 py-2"
            onClick={() => {
              setStatusFilter(null)
              setCreatedFrom(null)
              setCreatedTo(null)
              setArrivalFrom(null)
              setArrivalTo(null)
            }}
            type="button"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeliveriesFilterSidebar 