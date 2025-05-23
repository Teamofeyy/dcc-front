export interface DeliveryCreate {
  weight: number
  dimensions: string
  address_in: string
  address_out: string
  datetime_in: string
  datetime_out: string
  transport_id: number
}

export interface DeliveryGet extends DeliveryCreate {
  id: number
  user_delivery_id: number
  status: string
}

export interface DeliveryUpdate {
  weight?: number | null
  dimensions?: string | null
  address_in?: string | null
  address_out?: string | null
  datetime_in?: string | null
  datetime_out?: string | null
  transport_id?: number | null
  status?: string | null
}
