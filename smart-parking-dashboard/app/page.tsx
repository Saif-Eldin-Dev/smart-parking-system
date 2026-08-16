"use client"

import { useMemo, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatCards } from "@/components/stat-cards"
import { ParkingGrid } from "@/components/parking-grid"
import { ActiveTickets } from "@/components/active-tickets"
import { VehicleEntryDialog } from "@/components/vehicle-entry-dialog"
import { VehicleExitDialog } from "@/components/vehicle-exit-dialog"
import { AddSpotDialog } from "@/components/add-spot-dialog"
import {
  initialSpots,
  initialTickets,
  nextTicketId,
  type ParkingSpot,
  type Ticket,
} from "@/lib/parking"

export default function Page() {
  const [spots, setSpots] = useState<ParkingSpot[]>(() => initialSpots())
  const [tickets, setTickets] = useState<Ticket[]>(() => initialTickets(spots))

  const [entrySpot, setEntrySpot] = useState<ParkingSpot | null>(null)
  const [exitSpot, setExitSpot] = useState<ParkingSpot | null>(null)
  const [addOpen, setAddOpen] = useState(false)

  const stats = useMemo(() => {
    const total = spots.length
    const occupied = spots.filter((s) => s.status === "occupied").length
    return { total, occupied, available: total - occupied }
  }, [spots])

  const exitTicket = useMemo(
    () => (exitSpot ? tickets.find((t) => t.spotLabel === exitSpot.label) ?? null : null),
    [exitSpot, tickets],
  )

  function handleSelectSpot(spot: ParkingSpot) {
    if (spot.status === "available") setEntrySpot(spot)
    else setExitSpot(spot)
  }

  function handleEntry(spot: ParkingSpot, licensePlate: string) {
    setSpots((prev) => prev.map((s) => (s.id === spot.id ? { ...s, status: "occupied" } : s)))
    setTickets((prev) => [
      ...prev,
      { id: nextTicketId(), licensePlate, spotLabel: spot.label, entryTime: Date.now() },
    ])
    setEntrySpot(null)
  }

  function checkout(spotLabel: string) {
    setSpots((prev) => prev.map((s) => (s.label === spotLabel ? { ...s, status: "available" } : s)))
    setTickets((prev) => prev.filter((t) => t.spotLabel !== spotLabel))
  }

  function handleExit(spot: ParkingSpot) {
    checkout(spot.label)
    setExitSpot(null)
  }

  function handleTicketCheckout(ticket: Ticket) {
    checkout(ticket.spotLabel)
  }

  function handleAddSpot(label: string): string | null {
    if (spots.some((s) => s.label === label)) return `Spot ${label} already exists.`
    setSpots((prev) => [...prev, { id: label, label, status: "available" }])
    setAddOpen(false)
    return null
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8">
        <DashboardHeader onAddSpot={() => setAddOpen(true)} />

        <StatCards total={stats.total} available={stats.available} occupied={stats.occupied} />

        <ParkingGrid spots={spots} onSelect={handleSelectSpot} />

        <ActiveTickets tickets={tickets} onCheckout={handleTicketCheckout} />
      </div>

      <VehicleEntryDialog
        spot={entrySpot}
        open={entrySpot !== null}
        onOpenChange={(o) => !o && setEntrySpot(null)}
        onConfirm={handleEntry}
      />

      <VehicleExitDialog
        spot={exitSpot}
        ticket={exitTicket}
        open={exitSpot !== null}
        onOpenChange={(o) => !o && setExitSpot(null)}
        onConfirm={(spot) => handleExit(spot)}
      />

      <AddSpotDialog open={addOpen} onOpenChange={setAddOpen} onAdd={handleAddSpot} />
    </div>
  )
}
