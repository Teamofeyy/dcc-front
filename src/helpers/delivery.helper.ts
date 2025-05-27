export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Ожидает'
    case 'in_transit':
      return 'В пути'
    case 'delivered':
      return 'Завершена'
    default:
      return status
  }
}

export const statusColorMap: Record<string, string> = {
  pending: 'bg-[#FFE2B3] text-[#2C2D5B]',
  in_transit: 'bg-[#F89B75] text-[#FFFFFF]',
  delivered: 'bg-[#CBE2B0] text-[#2C2D5B]',
}

export const getTimeRemaining = (datetimeOut: string): string => {
  const now = new Date()
  const outTime = new Date(datetimeOut)
  const diffMs = outTime.getTime() - now.getTime()

  if (diffMs <= 0) return 'Завершена'

  const diffMinutes = Math.floor(diffMs / 1000 / 60)
  const days = Math.floor(diffMinutes / (60 * 24))
  const hours = Math.floor((diffMinutes % (60 * 24)) / 60)
  const minutes = diffMinutes % 60

  if (days > 0) {
    return `${days}д ${hours}ч`
  } else if (hours > 0) {
    return `${hours}ч ${minutes}м`
  } else if (minutes > 0) {
    return `${minutes}м`
  } else {
    return 'Меньше минуты'
  }
}
