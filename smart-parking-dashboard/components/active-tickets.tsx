"use client"

import { LogOut, Inbox } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Ticket } from "@/lib/parking"
import { formatTime, formatDuration } from "@/lib/parking"

interface ActiveTicketsProps {
  tickets: Ticket[]
  onCheckout: (ticket: Ticket) => void
}

export function ActiveTickets({ tickets, onCheckout }: ActiveTicketsProps) {
  const sorted = [...tickets].sort((a, b) => b.entryTime - a.entryTime)

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Active Tickets</h2>
          <p className="text-sm text-muted-foreground">Vehicles currently parked</p>
        </div>
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          {tickets.length} active
        </Badge>
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-12 text-center">
          <Inbox className="size-8 text-muted-foreground" aria-hidden />
          <p className="text-sm text-muted-foreground">No vehicles parked right now.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Ticket ID</TableHead>
                <TableHead>License Plate</TableHead>
                <TableHead>Spot</TableHead>
                <TableHead>Entry Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((ticket) => (
                <TableRow key={ticket.id} className="border-white/5 transition-colors hover:bg-white/5">
                  <TableCell className="font-mono text-sm text-muted-foreground">{ticket.id}</TableCell>
                  <TableCell className="font-mono text-sm font-semibold tracking-wider">
                    {ticket.licensePlate}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-danger/30 bg-danger/10 font-mono text-danger">
                      {ticket.spotLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{formatTime(ticket.entryTime)}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {formatDuration(ticket.entryTime)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onCheckout(ticket)}
                      className="border-danger/30 bg-danger/5 text-danger hover:bg-danger/15 hover:text-danger"
                    >
                      <LogOut className="size-3.5" aria-hidden />
                      Checkout
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  )
}
