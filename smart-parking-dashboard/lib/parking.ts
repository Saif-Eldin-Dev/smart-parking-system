export type SpotStatus = "available" | "occupied"

export interface ParkingSpot {
  id: string
  label: string
  status: SpotStatus
}

export interface Ticket {
  id: string
  licensePlate: string
  spotLabel: string
  entryTime: number
}

export const HOURLY_RATE = 4.5

/** Cost is billed per started hour, minimum one hour. */
export function calculateCost(entryTime: number, now: number = Date.now()): number {
  const ms = Math.max(0, now - entryTime)
  const hours = Math.max(1, Math.ceil(ms / (1000 * 60 * 60)))
  return hours * HOURLY_RATE
}

export function formatDuration(entryTime: number, now: number = Date.now()): string {
  const ms = Math.max(0, now - entryTime)
  const totalMinutes = Math.floor(ms / (1000 * 60))
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h === 0) return `${m}m`
  return `${h}h ${m}m`
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

function makeSpots(): ParkingSpot[] {
  const rows = ["A", "B", "C", "D"]
  const perRow = 8
  const spots: ParkingSpot[] = []
  for (const row of rows) {
    for (let i = 1; i <= perRow; i++) {
      spots.push({ id: `${row}${i}`, label: `${row}${i}`, status: "available" })
    }
  }
  return spots
}

/** Deterministic-ish seed data so the initial render is populated. */
export function initialSpots(): ParkingSpot[] {
  const spots = makeSpots()
  const occupiedIndexes = [1, 3, 6, 9, 12, 14, 18, 21, 25, 28, 30]
  occupiedIndexes.forEach((idx) => {
    if (spots[idx]) spots[idx].status = "occupied"
  })
  return spots
}

const SAMPLE_PLATES = ["KA05M8231", "MH12AB4409", "DL8CAF9021", "TN09BQ7745", "GJ01XY3388"]

export function initialTickets(spots: ParkingSpot[]): Ticket[] {
  const occupied = spots.filter((s) => s.status === "occupied")
  const now = Date.now()
  return occupied.map((spot, i) => ({
    id: `TKT-${String(1042 + i).padStart(4, "0")}`,
    licensePlate: SAMPLE_PLATES[i % SAMPLE_PLATES.length],
    spotLabel: spot.label,
    entryTime: now - (i + 1) * 37 * 60 * 1000,
  }))
}

let ticketCounter = 1100
export function nextTicketId(): string {
  ticketCounter += 1
  return `TKT-${ticketCounter}`
}
