"use client"

import { Car } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ParkingSpot } from "@/lib/parking"

interface ParkingGridProps {
  spots: ParkingSpot[]
  onSelect: (spot: ParkingSpot) => void
}

export function ParkingGrid({ spots, onSelect }: ParkingGridProps) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Parking Grid</h2>
          <p className="text-sm text-muted-foreground">Tap a spot to check a vehicle in or out</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-2.5 rounded-full bg-success" aria-hidden />
            Available
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-2.5 rounded-full bg-danger" aria-hidden />
            Occupied
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {spots.map((spot) => {
          const available = spot.status === "available"
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => onSelect(spot)}
              aria-label={`Spot ${spot.label}, ${spot.status}`}
              className={cn(
                "group relative flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border text-center transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                available
                  ? "border-success/30 bg-success/5 hover:border-success/60 hover:bg-success/10 hover:shadow-success/20"
                  : "border-danger/30 bg-danger/5 hover:border-danger/60 hover:bg-danger/10 hover:shadow-danger/20",
              )}
            >
              <Car
                className={cn(
                  "size-5 transition-transform duration-300 group-hover:scale-110",
                  available ? "text-success/80" : "text-danger/80",
                )}
                aria-hidden
              />
              <span className="font-mono text-sm font-semibold text-foreground">{spot.label}</span>
              <span
                className={cn(
                  "absolute right-1.5 top-1.5 size-1.5 rounded-full",
                  available ? "bg-success" : "bg-danger animate-pulse",
                )}
                aria-hidden
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}
