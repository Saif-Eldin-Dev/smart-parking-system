"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { LogIn } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ParkingSpot } from "@/lib/parking"
import { HOURLY_RATE, formatCurrency } from "@/lib/parking"

interface VehicleEntryDialogProps {
  spot: ParkingSpot | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (spot: ParkingSpot, licensePlate: string) => void
}

export function VehicleEntryDialog({ spot, open, onOpenChange, onConfirm }: VehicleEntryDialogProps) {
  const [plate, setPlate] = useState("")

  useEffect(() => {
    if (open) setPlate("")
  }, [open])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!spot) return
    const trimmed = plate.trim().toUpperCase()
    if (!trimmed) return
    onConfirm(spot, trimmed)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/10 sm:max-w-md">
        <DialogHeader>
          <div className="mb-1 flex size-11 items-center justify-center rounded-xl bg-success/10 text-success">
            <LogIn className="size-5" aria-hidden />
          </div>
          <DialogTitle>Vehicle Entry</DialogTitle>
          <DialogDescription>
            Assign a vehicle to spot{" "}
            <span className="font-mono font-semibold text-success">{spot?.label}</span>. Billed at{" "}
            {formatCurrency(HOURLY_RATE)}/hour.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-4 pt-1">
          <div className="grid gap-2">
            <Label htmlFor="license-plate">License Plate</Label>
            <Input
              id="license-plate"
              autoFocus
              placeholder="e.g. KA05M8231"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              className="font-mono uppercase tracking-wider"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!plate.trim()}
              className="bg-success text-success-foreground hover:bg-success/90"
            >
              Confirm Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
