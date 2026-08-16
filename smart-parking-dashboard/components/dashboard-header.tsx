"use client"

import { Plus, SquareParking } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  onAddSpot: () => void
}

export function DashboardHeader({ onAddSpot }: DashboardHeaderProps) {
  return (
    <header className="glass sticky top-4 z-30 rounded-2xl px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <SquareParking className="size-6" aria-hidden />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight tracking-tight text-balance sm:text-xl">
              Smart Parking System
            </h1>
            <p className="text-xs text-muted-foreground">Real-time occupancy management</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            Live
          </span>
          <Button onClick={onAddSpot} className="gap-1.5">
            <Plus className="size-4" aria-hidden />
            <span className="hidden sm:inline">Add Parking Spot</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
