"use client"

import { LogOut, Clock, Receipt } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { ParkingSpot, Ticket } from "@/lib/parking"
import { HOURLY_RATE, calculateCost, formatCurrency, formatDuration, formatTime } from "@/lib/parking"

interface VehicleExitDialogProps {
  spot: ParkingSpot | null
  ticket: Ticket | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (spot: ParkingSpot, ticket: Ticket) => void
}

export function VehicleExitDialog({ spot, ticket, open, onOpenChange, onConfirm }: VehicleExitDialogProps) {
  const cost = ticket ? calculateCost(ticket.entryTime) : 0
  const duration = ticket ? formatDuration(ticket.entryTime) : "—"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/10 sm:max-w-md">
        <DialogHeader>
          <div className="mb-1 flex size-11 items-center justify-center rounded-xl bg-danger/10 text-danger">
            <LogOut className="size-5" aria-hidden />
          </div>
          <DialogTitle>Vehicle Exit</DialogTitle>
          <DialogDescription>
            Review the charges before checking out spot{" "}
            <span className="font-mono font-semibold text-danger">{spot?.label}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 pt-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-muted-foreground">License Plate</p>
              <p className="mt-1 font-mono text-sm font-semibold tracking-wider">{ticket?.licensePlate ?? "—"}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-muted-foreground">Ticket ID</p>
              <p className="mt-1 font-mono text-sm font-semibold">{ticket?.id ?? "—"}</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" aria-hidden /> Entry Time
            </span>
            <span className="font-mono text-sm">{ticket ? formatTime(ticket.entryTime) : "—"}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="font-mono text-sm">{duration}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-danger/25 bg-danger/10 p-4">
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Receipt className="size-4 text-danger" aria-hidden /> Total Cost
            </span>
            <span className="font-mono text-2xl font-semibold text-danger tabular-nums">
              {formatCurrency(cost)}
            </span>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Billed at {formatCurrency(HOURLY_RATE)}/hour, rounded up to the next hour.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!spot || !ticket}
            onClick={() => spot && ticket && onConfirm(spot, ticket)}
            className="bg-danger text-danger-foreground hover:bg-danger/90"
          >
            Confirm Exit &amp; Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
