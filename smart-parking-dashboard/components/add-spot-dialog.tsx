"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
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

interface AddSpotDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (label: string) => string | null
}

export function AddSpotDialog({ open, onOpenChange, onAdd }: AddSpotDialogProps) {
  const [label, setLabel] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setLabel("")
      setError(null)
    }
  }, [open])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = label.trim().toUpperCase()
    if (!trimmed) return
    const err = onAdd(trimmed)
    if (err) setError(err)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/10 sm:max-w-md">
        <DialogHeader>
          <div className="mb-1 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Plus className="size-5" aria-hidden />
          </div>
          <DialogTitle>Add Parking Spot</DialogTitle>
          <DialogDescription>
            Create a new spot and add it to the grid. Use a short code like{" "}
            <span className="font-mono text-foreground">E1</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-4 pt-1">
          <div className="grid gap-2">
            <Label htmlFor="spot-label">Spot Code</Label>
            <Input
              id="spot-label"
              autoFocus
              placeholder="e.g. E1"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value.toUpperCase())
                setError(null)
              }}
              className="font-mono uppercase tracking-wider"
            />
            {error && <p className="text-sm text-danger">{error}</p>}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!label.trim()}>
              Add Spot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
