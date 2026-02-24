"use client"

import { useState, useEffect } from "react"

export function PromoTimer() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 30, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        }
        return { minutes: 30, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-accent text-accent-foreground rounded-lg px-2.5 py-1.5 flex items-center justify-center gap-2 flex-1 min-w-0">
      <span className="text-[10px] font-medium whitespace-nowrap">Promocao acaba em</span>
      <div className="flex items-center gap-0.5 font-mono font-bold text-xs">
        <span className="bg-card text-foreground px-1.5 py-0.5 rounded text-[11px]">00</span>
        <span className="animate-pulse text-[10px]">:</span>
        <span className="bg-card text-foreground px-1.5 py-0.5 rounded text-[11px]">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="animate-pulse text-[10px]">:</span>
        <span className={`bg-card text-foreground px-1.5 py-0.5 rounded text-[11px] transition-all duration-150 ${timeLeft.seconds <= 10 ? "text-accent scale-110" : ""}`}>
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}
