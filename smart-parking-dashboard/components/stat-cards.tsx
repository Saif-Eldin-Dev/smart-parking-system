import { Car, CircleCheck, CircleSlash } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardsProps {
  total: number
  available: number
  occupied: number
}

interface StatConfig {
  key: string
  label: string
  value: number
  icon: typeof Car
  accent: string
  ring: string
  dot: string
  hint: string
}

export function StatCards({ total, available, occupied }: StatCardsProps) {
  const occupancy = total > 0 ? Math.round((occupied / total) * 100) : 0

  const stats: StatConfig[] = [
    {
      key: "total",
      label: "Total Spots",
      value: total,
      icon: Car,
      accent: "text-primary",
      ring: "bg-primary/10 text-primary",
      dot: "bg-primary",
      hint: `${occupancy}% occupancy`,
    },
    {
      key: "available",
      label: "Available Spots",
      value: available,
      icon: CircleCheck,
      accent: "text-success",
      ring: "bg-success/10 text-success",
      dot: "bg-success",
      hint: "Ready for entry",
    },
    {
      key: "occupied",
      label: "Occupied Spots",
      value: occupied,
      icon: CircleSlash,
      accent: "text-danger",
      ring: "bg-danger/10 text-danger",
      dot: "bg-danger",
      hint: "Currently in use",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.key}
            className="glass group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", stat.dot)} aria-hidden />
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  stat.ring,
                )}
              >
                <Icon className="size-5" aria-hidden />
              </div>
            </div>
            <p className={cn("mt-4 font-mono text-4xl font-semibold tabular-nums", stat.accent)}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
          </div>
        )
      })}
    </div>
  )
}
